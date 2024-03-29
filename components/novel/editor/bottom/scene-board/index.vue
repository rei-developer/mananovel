<template>
  <div class='e-bottom-scene-board'>
    <Dialog ref='dialog'/>
    <div class='scene-board-box'>
      <header :style='{marginLeft: `-${innerScrollLeft}px`}'>
        <novel-editor-bottom-scene-board-header
          ref='sceneBoardHeader'
          :columnCount='columnCount'
          :isHiddenAll='isHiddenAll'
          :isReverse='isReverse'
        />
      </header>
      <div class='inner custom-scroll-box'>
        <novel-editor-bottom-scene-board-inner
          ref='sceneBoard'
          :id='item.id'
          :type='item.type'
          :pureName='item.name'
          :pureColumns='item.columns'
          :isPureHidden='item.isHidden'
          :isRequired='item.isRequired'
          v-for='(item, index) in dataSource'
          :key='index'
        />
      </div>
    </div>
    <footer>
      <div class='e-button-group'>
        <e-select
          size='lg'
          v-model='selectedAddRow'
          @change='onChangeAddRow'
        >
          <option :value='null'>새 액션 선택</option>
          <option
            :value='item.value'
            v-for='(item, index) in addRowOptionList'
            :key='index'
          >
            {{ item.label }}
          </option>
        </e-select>
        <e-button
          size='lg'
          :beep='item.beep'
          @click='item.function'
          v-for='(item, index) in bottomMenuList'
          :key='index'
        >
          {{ item.label }}
        </e-button>
      </div>
    </footer>
  </div>
</template>

<style lang='less' scoped>
.e-bottom-scene-board {
  background-color: #333;
  border: 1px solid var(--primary);
  border-right: 0;
  .scene-board-box {
    border-bottom: 1px solid var(--primary);
    > header,
    > .inner {
      width: calc(100vw - 401px);
      background-color: #333;
    }
    > .inner {height: 120px}
  }
  > footer {
    padding: .5rem;
    > .e-button-group > select {margin-right: 5px}
  }
}
</style>

<script>
import _ from 'lodash'
import Dialog from '@/components/common/dialog'
import NovelEditorBottomSceneBoardHeader from '@/components/novel/editor/bottom/scene-board/header'
import NovelEditorBottomSceneBoardInner from '@/components/novel/editor/bottom/scene-board/inner'
import ESelect from '@/components/novel/editor/common/select'
import EButton from '@/components/novel/editor/common/button'
import NovelEditorConsole from '@/mixins/novel/editor/console'
import indexedDB from '@/util/indexed-db'

const EVENT_BUS_PREFIX = 'sb'

let db

export default {
  name: 'NovelEditorBottomSceneBoard',
  components: {
    Dialog,
    NovelEditorBottomSceneBoardHeader,
    NovelEditorBottomSceneBoardInner,
    ESelect,
    EButton
  },
  mixins: [NovelEditorConsole],
  data() {
    return {
      pageId: 1,
      viewId: 0,
      rowCount: 1,
      columnCount: 100,
      innerScrollLeft: 0,
      dataSource: [],
      addRowOptionList: [
        {label: '백그라운드 (BCG)', value: 'bcg', max: 1},
        {label: '스탠딩 (SCG)', value: 'scg', max: 4},
        {label: '배경음악 (BGM)', value: 'bgm', max: 1},
        {label: '보조 배경음악 (BGS)', value: 'bgs', max: 1},
        {label: '효과음 (SE)', value: 'se', max: 4},
        {label: '보이스 (VOICE)', value: 'voice', max: 4},
        {label: '자바스크립트 (JS)', value: 'js', max: 1},
        {label: '파티클 (PARTICLE)', value: 'particle', max: 1}
      ],
      bottomMenuList: [
        {label: '추가', beep: true, function: () => this.beforeAddRow()},
        {label: '저장', beep: true, function: () => this.savePage()},
        {label: '활성화', beep: true, function: () => this.visible()},
        {label: '비활성화', beep: true, function: () => this.visible(false)},
        {label: '모두 비활성화', beep: false, function: () => this.beforeClear()},
        {label: '드래그 해제', beep: true, function: () => this.release()},
        {label: '감추기', beep: true, function: () => this.commit('toggleHiddenSceneBoard')}
      ],
      selectedAddRow: null,
      isReverse: false,
      isHiddenAll: false
    }
  },
  watch: {
    '$store.state.novel.editor.gameId': function () {
      this.init()
    }
  },
  async created() {
    await this.$nextTick()
    document.querySelector('.scene-board-box > .inner').addEventListener('scroll', this.handleInnerScroll)
    const p = `${EVENT_BUS_PREFIX}.`
    const onEventBusList = [
      ['view', id => this.view(id)],
      ['openSidebar', (rowId, columnId) => this.openSidebar(rowId, columnId)],
      ['name', (id, name) => this.name(id, name)],
      ['reverse', () => this.reverse()],
      ['playSound', name => this.playSound(name)],
      ['hide', (id, flag) => this.hide(id, flag)],
      ['hideAll', flag => this.hideAll(flag)],
      ['remove', id => this.remove(id)],
      ['beforeRemoveAll', () => this.beforeRemoveAll()],
      ['removeAll', () => this.removeAll()],
      ['clear', () => this.clear()],
      ['update', (rowId, columnId, data, isApplyAllDraggedColumns, isApplyAllVisibleColumns) => this.update(rowId, columnId, data, isApplyAllDraggedColumns, isApplyAllVisibleColumns)]
    ]
    onEventBusList.map(item => this.$eventBus.$on(`${p}${item[0]}`, item[1]))
  },
  beforeDestroy() {
    const p = `${EVENT_BUS_PREFIX}.`
    const offEventBusList = ['view', 'openSidebar', 'name', 'reverse', 'playSound', 'hide', 'hideAll', 'remove', 'beforeRemoveAll', 'removeAll', 'clear', 'update']
    offEventBusList.map(item => this.$eventBus.$off(`${p}${item}`))
  },
  async destroyed() {
    await this.$nextTick()
    document.querySelector('.scene-board-box > .inner').removeEventListener('scroll', this.handleInnerScroll)
  },
  methods: {
    test() {
      alert('Aa')
    },
    async init() {
      const doInit = await indexedDB.init('PAGE')
      if (doInit.status === 'FAIL') {
        alert(doInit.message)
        return window.close()
      }
      db = doInit.result
      console.log(doInit.result)
      const doLoadPage = await this.loadPage()
      doLoadPage.status === 'DONE'
        ? this.dataSource = doLoadPage.result.data
        : this.addRow(true)
      this.commit('setLoading', false)
    },
    getHideCount() {
      let count = 0
      this.dataSource
        .map((_, index) => {
          count += this.$refs.sceneBoard[index].isHidden ? 1 : 0
          this.isHiddenAll = this.dataSource.length === count
        })
    },
    getState(key) {
      return this.$store.state['novel']['editor'][key]
    },
    commit(key, value) {
      this.$store.commit(`novel/editor/${key}`, value)
    },
    async beforeAddRow() {
      if (this.rowCount >= 15)
        return this.throwConsole('error', '액션은 최대 15개까지 생성할 수 있어.')
      if (!this.selectedAddRow)
        return this.throwConsole('error', '새 액션을 선택하지 않았잖아.')
      const findItem = this.addRowOptionList
        .find(item => item.value === this.selectedAddRow)
      if (!findItem)
        return
      const count = this.dataSource
        .filter(item => item.type === this.selectedAddRow)?.length
      if (!!findItem.max && count >= findItem?.max)
        return this.throwConsole('error', `${findItem?.label} 액션은 ${findItem?.max}개 이상 생성할 수 없어.`)
      const id = this.dataSource.length > 0
        ? _.maxBy(this.dataSource, 'id').id
        : this.dataSource.length
      this.addRow(id + 1, this.selectedAddRow)
      await this.$nextTick()
      this.rowCount = this.dataSource.length
      this.getHideCount()
      if (this.viewId > 0)
        this.view(this.viewId)
    },
    addRow(rowId = 1, type = 'script', isRequired = false) {
      let columns = []
      for (let id = 1; id <= this.columnCount; id++)
        columns.push({id})
      const name = `새 ${type.toUpperCase()}`
      this.dataSource.push({
        id: rowId,
        type,
        name,
        columns,
        isHidden: false,
        isRequired
      })
      if (!this.getState('isLoading'))
        this.commit('setUnsaved', true)
      this.$forceUpdate()
      this.savePage()
      this.$eventBus.$emit('cs.console', 'success', `${rowId}번째 액션을 추가했습니다.`)
    },
    async loadPage(id = this.pageId, isNowPageSave = false) {
      if (isNowPageSave)
        await this.savePage(this.pageId)
      return await indexedDB.load(db, 'PAGE', id)
    },
    async savePage(id = this.pageId) {
      const doLoadPage = await this.loadPage(id)
      if (doLoadPage.status === 'DONE')
        await this.deletePage(doLoadPage.result.id)
      const dataSource = this.dataSource
        .map(item => {
          item.columns
            .map(i => {
              if (i.isViewed)
                delete i.isViewed
              if (i.isOpened)
                delete i.isOpened
              return i
            })
          return item
        })
      const insertId = await indexedDB.save(db, 'PAGE', id, dataSource)
      if (!insertId)
        return this.$eventBus.$emit('cs.console', 'error', `${id}번째 페이지 저장 실패`)
    },
    async deletePage(id = this.pageId) {
      return await indexedDB.delete(db, 'PAGE', id)
    },
    view(id) {
      this.viewId = id
      this.dataSource
        .map((_, index) => this.$refs.sceneBoard[index].view(id))
      this.$refs.sceneBoardHeader.view(id)
      this.$eventBus.$emit('cp.setData', id, this.dataSource)
    },
    openSidebar(rowId, columnId) {
      const item = this.dataSource
        .find(item => item.id === rowId)
      if (!item)
        return
      const type = item.type
      const columns = item.columns
      const data = columns
        .filter(item => item.id === columnId)
      if (data.length < 1)
        return
      this.dataSource.map((item, index) => {
        this.$refs.sceneBoard[index].release()
        if (item.id === rowId)
          this.$refs.sceneBoard[index].open(columnId)
      })
      this.$eventBus.$emit('se.openSidebar', rowId, type, data[0])
    },
    name(id, name) {
      const item = this.dataSource
        .find(item => item.id === id)
      if (!item)
        return
      item.name = name
      this.commit('setUnsaved', true)
      this.$eventBus.$emit('cs.console', 'success', `${id}번째 액션의 이름을 ${name}(으)로 수정했습니다.`)
    },
    visible(flag = true) {
      this.dataSource
        .map((_, index) => this.$refs.sceneBoard[index].visible(flag))
      this.commit('setUnsaved', true)
      this.$eventBus.$emit('cs.console', 'success', `드래그한 씬들을 ${flag ? '' : '비'}활성화했습니다.`)
    },
    release() {
      this.dataSource
        .map((_, index) => this.$refs.sceneBoard[index].release())
      this.commit('setUnsaved', true)
      this.$eventBus.$emit('cs.console', 'success', '드래그를 모두 해제했습니다.')
    },
    reverse() {
      this.isReverse = !this.isReverse
      this.dataSource = this.dataSource.reverse()
      this.commit('setUnsaved', true)
      this.$eventBus.$emit('cs.console', 'success', `액션을 ${this.isReverse ? '내림' : '오름'}차순으로 변경했습니다.`)
    },
    playSound(name) {
      const sound = new Audio(`/sound/${name}`)
      sound.play()
    },
    hide(id, flag) {
      const item = this.dataSource
        .find(item => item.id === id)
      if (!item)
        return
      item.isHidden = flag
      this.commit('setUnsaved', true)
      this.getHideCount()
      this.$eventBus.$emit('cp.setData', this.viewId, this.dataSource)
      this.$eventBus.$emit('cs.console', 'success', `${id}번째 액션을 ${flag ? '보이게 했' : '가렸'}습니다.`)
    },
    hideAll(flag) {
      if (this.rowCount < 1) {
        this.playSound('error.mp3')
        return this.$toast.error('목록이 존재하지 않아.')
      }
      this.dataSource
        .map((_, index) => this.$refs.sceneBoard[index].hide(flag))
      this.commit('setUnsaved', true)
      this.$eventBus.$emit('cs.console', 'success', `모든 액션을 ${flag ? '보이게 했' : '가렸'}습니다.`)
    },
    remove(id) {
      const item = this.dataSource
        .find(item => item.id === id)
      if (!item)
        return
      if (item.isRequired) {
        const findIndex = this.dataSource
          .findIndex(item => item.id === id)
        let columns = []
        for (let id = 1; id <= this.columnCount; id++)
          columns.push({id})
        item.columns = columns
        this.$refs.sceneBoard[findIndex].clear()
      } else {
        this.dataSource = this.dataSource
          .filter(item => item.id !== id)
        this.rowCount = this.dataSource.length
      }
      this.commit('setUnsaved', true)
      this.$eventBus.$emit('cs.console', 'success', `${id}번째 액션을 삭제했습니다.`)
    },
    beforeRemoveAll() {
      if (this.rowCount < 1) {
        this.playSound('error.mp3')
        return this.$toast.error('목록이 존재하지 않아.')
      }
      this.$refs.dialog.show({
        icon: 'exclamation-triangle',
        message: '정말로 모든 액션을 삭제할거니?',
        doEvent: 'sb.removeAll'
      })
      this.playSound('warning.mp3')
    },
    removeAll() {
      this.viewId = 0
      this.dataSource = this.dataSource
        .filter(item => item.isRequired)
      if (this.dataSource.length > 0) {
        this.dataSource.map((item, index) => {
          if (item.isRequired) {
            let columns = []
            for (let id = 1; id <= this.columnCount; id++)
              columns.push({id})
            item.columns = columns
            this.$refs.sceneBoard[index].clear()
          }
        })
      }
      this.rowCount = this.dataSource.length
      this.isHiddenAll = false
      this.commit('setUnsaved', true)
      this.$eventBus.$emit('cs.console', 'success', '모든 액션을 삭제했습니다.')
    },
    beforeClear() {
      this.$refs.dialog.show({
        icon: 'exclamation-triangle',
        message: '정말로 모든 씬을 비활성화할거니?',
        doEvent: 'sb.clear'
      })
      this.playSound('warning.mp3')
    },
    clear() {
      this.dataSource
        .map((_, index) => this.$refs.sceneBoard[index].clear())
      this.commit('setUnsaved', true)
      this.$eventBus.$emit('cs.console', 'success', '모든 액션을 비활성화했습니다.')
    },
    update(rowId, columnId, data, isApplyAllDraggedColumns, isApplyAllVisibleColumns) {
      const pureData = JSON.parse(JSON.stringify(data))
      const item = this.dataSource
        .find(item => item.id === rowId)
      if (!item)
        return
      if (isApplyAllDraggedColumns || isApplyAllVisibleColumns) {
        delete pureData.id
        delete pureData.isViewed
        delete pureData.isOpened
        delete pureData.isStart
        delete pureData.isEnd
        item.columns = item.columns.map(column => {
          if (
            column.id === columnId ||
            (isApplyAllDraggedColumns && column.isDragged) ||
            (isApplyAllVisibleColumns && column.isVisible)
          ) {
            const isStart = column.isStart || column.isDraggedStart
            const isEnd = column.isEnd || column.isDraggedEnd
            column = {
              id: column.id,
              ...pureData
            }
            if (column.id === columnId) {
              column.isViewed = 1
              column.isOpened = 1
            }
            if (isStart)
              column.isStart = isStart
            if (isEnd)
              column.isEnd = isEnd
          }
          return column
        })
      } else {
        const findIndex = item.columns
          .findIndex(item => item.id === columnId)
        if (findIndex < 0)
          return
        item.columns[findIndex] = data
      }
      this.commit('setUnsaved', true)
      this.$eventBus.$emit('cp.setData', columnId, this.dataSource)
    },
    onChangeAddRow(event) {
      this.selectedAddRow = event.target.value
    },
    handleInnerScroll(event) {
      this.innerScrollLeft = event.target.scrollLeft
    }
  }
}
</script>
