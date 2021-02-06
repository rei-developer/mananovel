<template>
  <div class='e-bottom-scene-board'>
    <Dialog ref='dialog'/>
    <div class='scene-board-box'>
      <header :style='{marginLeft: `-${innerScrollLeft}px`}'>
        <novel-editor-bottom-scene-board-header
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
          v-for='(item, index) in dataSource'
          :key='index'
        />
      </div>
    </div>
    <footer>
      <b-button
        squared
        size='sm'
        variant='primary'
        @click='item.function'
        v-for='(item, index) in bottomMenu'
        :key='index'
      >
        {{ item.label }}
      </b-button>
    </footer>
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-hover: #5F5476;
@font-color: #EDE3EB;

.e-bottom-scene-board {
  background-color: #333;
  border: 1px solid @primary;
  border-right: 0;
  .scene-board-box {
    border-bottom: 1px solid @primary;
    > header,
    > .inner {
      width: calc(100vw - 401px);
      background-color: #333;
    }
    > .inner {height: 120px}
  }
  > footer {
    padding: .5rem;
    > button:not(:last-child) {margin-right: .25rem}
  }
}
</style>

<script>
import _ from 'lodash'
import Dialog from '@/components/common/dialog'
import NovelEditorBottomSceneBoardHeader from '@/components/novel/editor/bottom/scene-board/header'
import NovelEditorBottomSceneBoardInner from '@/components/novel/editor/bottom/scene-board/inner'

const eventBusPrefix = 'sb'

export default {
  name: 'NovelEditorBottomSceneBoard',
  components: {
    Dialog,
    NovelEditorBottomSceneBoardHeader,
    NovelEditorBottomSceneBoardInner
  },
  data() {
    return {
      pageId: 0,
      viewId: 0,
      rowCount: 1,
      columnCount: 30,
      innerScrollLeft: 0,
      dataSource: [],
      bottomMenu: [
        {label: '목록 추가', function: () => this.beforeAddRow()},
        {label: '활성화', function: () => this.visible()},
        {label: '삭제', function: () => this.visible(false)},
        {label: '모두 해제', function: () => this.release()},
        {label: '모두 삭제', function: () => this.beforeClear()}
      ],
      isReverse: false,
      isHiddenAll: false
    }
  },
  async created() {
    await this.$nextTick()
    document.querySelector('.scene-board-box > .inner').addEventListener('scroll', this.handleInnerScroll)
    const p = `${eventBusPrefix}.`
    this.$eventBus.$on(`${p}view`, id => this.view(id))
    this.$eventBus.$on(`${p}openSidebar`, (rowId, columnId) => this.openSidebar(rowId, columnId))
    this.$eventBus.$on(`${p}name`, (id, name) => this.name(id, name))
    this.$eventBus.$on(`${p}reverse`, () => this.reverse())
    this.$eventBus.$on(`${p}playSound`, name => this.playSound(name))
    this.$eventBus.$on(`${p}hide`, (id, flag) => this.hide(id, flag))
    this.$eventBus.$on(`${p}hideAll`, flag => this.hideAll(flag))
    this.$eventBus.$on(`${p}remove`, id => this.remove(id))
    this.$eventBus.$on(`${p}beforeRemoveAll`, () => this.beforeRemoveAll())
    this.$eventBus.$on(`${p}removeAll`, () => this.removeAll())
    this.$eventBus.$on(`${p}clear`, () => this.clear())
    this.$eventBus.$on(`${p}update`, (rowId, data) => this.update(rowId, data))
  },
  mounted() {
    this.changePage(1)
  },
  beforeDestroy() {
    const p = `${eventBusPrefix}.`
    this.$eventBus.$off(`${p}view`)
    this.$eventBus.$off(`${p}openSidebar`)
    this.$eventBus.$off(`${p}name`)
    this.$eventBus.$off(`${p}reverse`)
    this.$eventBus.$off(`${p}playSound`)
    this.$eventBus.$off(`${p}hide`)
    this.$eventBus.$off(`${p}hideAll`)
    this.$eventBus.$off(`${p}remove`)
    this.$eventBus.$off(`${p}beforeRemoveAll`)
    this.$eventBus.$off(`${p}removeAll`)
    this.$eventBus.$off(`${p}clear`)
    this.$eventBus.$off(`${p}update`)
  },
  async destroyed() {
    await this.$nextTick()
    document.querySelector('.scene-board-box > .inner').removeEventListener('scroll', this.handleInnerScroll)
  },
  methods: {
    update(rowId, data) {
      console.log('우케타마와리마시따')
      console.log(
        data
      )
    },
    getHideCount() {
      let count = 0
      this.dataSource
        .map((_, index) => {
          count += this.$refs.sceneBoard[index].isHidden ? 1 : 0
          this.isHiddenAll = this.dataSource.length === count
        })
    },
    async beforeAddRow() {
      if (this.rowCount >= 15) {
        this.playSound('error.mp3')
        return this.$toast.error('15개까지만 생성할 수 있어요.')
      }
      const id = this.dataSource.length > 0
        ? _.maxBy(this.dataSource, 'id').id
        : this.dataSource.length
      this.addRow(id + 1)
      await this.$nextTick()
      this.rowCount = this.dataSource.length
      this.getHideCount()
      if (this.viewId > 0)
        this.view(this.viewId)
      this.playSound('done.mp3')
    },
    addRow(rowId = 1, type = 'script') {
      let columns = []
      for (let id = 1; id <= this.columnCount; id++)
        columns.push({id})
      const name = type.toUpperCase()
      this.dataSource.push({
        id: rowId,
        type,
        name,
        columns,
        isHidden: false
      })
    },
    savePage(id) {

    },
    changePage(id) {
      // TODO : 만약 현재 보고 있는 페이지가 있다면 일단 임시 저장
      this.savePage(id)
      // TODO : 데이터를 불러와서, 있으면 loadData 없으면 addRow
      this.addRow()
    },
    view(id) {
      this.viewId = id
      this.dataSource
        .map((_, index) => this.$refs.sceneBoard[index].view(id))
    },
    openSidebar(rowId, columnId) {
      const findIndex = this.dataSource
        .findIndex(item => item.id === rowId)
      if (findIndex < 0)
        return
      const type = this.dataSource[findIndex].type
      const columns = this.dataSource[findIndex].columns
      const data = columns
        .filter(item => item.id === columnId)
      if (data.length > 0)
        this.$eventBus.$emit('se.openSidebar', rowId, type, data[0])
    },
    name(id, name) {
      const findIndex = this.dataSource
        .findIndex(item => item.id === id)
      if (findIndex < 0)
        return
      this.dataSource[findIndex].name = name
    },
    visible(flag = true) {
      this.dataSource
        .map((_, index) => this.$refs.sceneBoard[index].visible(flag))
      this.playSound('done.mp3')
    },
    release() {
      this.dataSource
        .map((_, index) => this.$refs.sceneBoard[index].release())
      this.playSound('done.mp3')
    },
    reverse() {
      this.isReverse = !this.isReverse
      this.dataSource = this.dataSource.reverse()
    },
    playSound(name) {
      const sound = new Audio(`/sound/${name}`)
      sound.play()
    },
    hide(id, flag) {
      const findIndex = this.dataSource
        .findIndex(item => item.id === id)
      if (findIndex < 0)
        return
      this.dataSource[findIndex].isHidden = flag
      this.getHideCount()
    },
    hideAll(flag) {
      if (this.rowCount < 1) {
        this.playSound('error.mp3')
        return this.$toast.error('목록이 존재하지 않아요.')
      }
      this.dataSource
        .map((_, index) => this.$refs.sceneBoard[index].hide(flag))
    },
    remove(id) {
      this.dataSource = this.dataSource
        .filter(item => item.id !== id)
      this.rowCount = this.dataSource.length
      this.playSound('done.mp3')
    },
    beforeRemoveAll() {
      if (this.rowCount < 1) {
        this.playSound('error.mp3')
        return this.$toast.error('목록이 존재하지 않아요.')
      }
      this.$refs.dialog.show({
        icon: 'exclamation-triangle',
        message: '정말로 모두 삭제하게?',
        doEvent: 'sb.removeAll'
      })
      this.playSound('warning.mp3')
    },
    removeAll() {
      this.dataSource = []
      this.viewId = 0
      this.rowCount = 0
      this.isHiddenAll = false
      this.playSound('done.mp3')
    },
    beforeClear() {
      this.$refs.dialog.show({
        icon: 'exclamation-triangle',
        message: '정말로 모두 삭제하게?',
        doEvent: 'sb.clear'
      })
      this.playSound('warning.mp3')
    },
    clear() {
      this.dataSource
        .map((_, index) => this.$refs.sceneBoard[index].clear())
      this.playSound('done.mp3')
    },
    handleInnerScroll(event) {
      this.innerScrollLeft = event.target.scrollLeft
    }
  }
}
</script>
