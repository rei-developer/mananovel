<template>
  <div class='e-bottom-scene-board'>
    <Dialog ref='dialog'/>
    <div class='scene-board-box'>
      <header :style='{marginLeft: `-${sceneBoardInnerBoxScrollLeft}px`}'>
        <novel-editor-bottom-scene-board-header
          :columnCount='columnCount'
          :isAllHide='isAllHide'
          :isReverse='isReverse'
        />
      </header>
      <div class='inner custom-scroll-box'>
        <novel-editor-bottom-scene-board-inner
          ref='sceneBoard'
          :id='item.id'
          :pureName='item.name'
          :pureColumnData='item.columnData'
          :isPureHide='item.isHide'
          v-for='(item, index) in sceneBoardList'
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

export default {
  name: 'NovelEditorBottomSceneBoard',
  components: {
    Dialog,
    NovelEditorBottomSceneBoardHeader,
    NovelEditorBottomSceneBoardInner
  },
  data() {
    return {
      viewId: 1,
      rowCount: 5,
      columnCount: 50,
      sceneBoardInnerBoxScrollLeft: 0,
      sceneBoardList: [],
      bottomMenu: [
        {label: '추가', function: () => this.beforeAddRow()},
        {label: '활성화', function: () => this.visible(true)},
        {label: '삭제', function: () => this.visible(false)},
        {label: '모두 해제', function: () => this.release()},
        {label: '모두 삭제', function: () => this.beforeClear()}
      ],
      isAllHide: false,
      isReverse: false
    }
  },
  async created() {
    await this.$nextTick()
    document
      .querySelector('.scene-board-box > .inner')
      .addEventListener('scroll', this.handleSceneBoardInnerBoxScroll)
    this.$eventBus.$on('playSound', name => this.playSound(name))
    this.$eventBus.$on('view', id => this.view(id))
    this.$eventBus.$on('remove', id => this.remove(id))
    this.$eventBus.$on('name', (id, name) => this.name(id, name))
    this.$eventBus.$on('beforeAllRemove', () => this.beforeAllRemove())
    this.$eventBus.$on('allRemove', () => this.allRemove())
    this.$eventBus.$on('hide', (id, flag) => this.hide(id, flag))
    this.$eventBus.$on('allHide', flag => this.allHide(flag))
    this.$eventBus.$on('reverse', () => this.reverse())
    this.$eventBus.$on('clear', () => this.clear())
  },
  mounted() {
    for (let i = 1; i <= this.rowCount; i++)
      this.addRow(i)
  },
  beforeDestroy() {
    this.$eventBus.$off('playSound')
    this.$eventBus.$off('view')
    this.$eventBus.$off('remove')
    this.$eventBus.$off('beforeAllRemove')
    this.$eventBus.$off('allRemove')
    this.$eventBus.$off('hide')
    this.$eventBus.$off('allHide')
    this.$eventBus.$off('reverse')
    this.$eventBus.$off('clear')
  },
  async destroyed() {
    await this.$nextTick()
    document
      .querySelector('.scene-board-box > .inner')
      .removeEventListener('scroll', this.handleSceneBoardInnerBoxScroll)
  },
  methods: {
    handleSceneBoardInnerBoxScroll(event) {
      this.sceneBoardInnerBoxScrollLeft = event.target.scrollLeft
    },
    hide(id, flag) {
      const findIndex = this.sceneBoardList
        .findIndex(item => item.id === id)
      if (findIndex < 0)
        return
      this.sceneBoardList[findIndex].isHide = flag
      this.getHideCount()
    },
    getHideCount() {
      let count = 0
      this.sceneBoardList
        .map((_, index) => {
          count += this.$refs.sceneBoard[index].isHide ? 1 : 0
          this.isAllHide = this.sceneBoardList.length === count
        })
    },
    async beforeAddRow() {
      if (this.rowCount >= 15) {
        this.playSound('error.mp3')
        return this.$toast.error('15개까지만 생성할 수 있어요.')
      }
      const id = this.sceneBoardList.length > 0
        ? _.maxBy(this.sceneBoardList, 'id').id
        : this.sceneBoardList.length
      this.addRow(id + 1)
      await this.$nextTick()
      this.rowCount = this.sceneBoardList.length
      this.getHideCount()
      this.view(this.viewId)
      this.playSound('done.mp3')
    },
    addRow(rowId) {
      let columnData = []
      for (let i = 1; i <= this.columnCount; i++)
        columnData.push({
          id: i,
          isView: i === 1,
          isStartLine: false,
          isEndLine: false,
          isDragged: false,
          isDraggedStartLine: false,
          isDraggedEndLine: false,
          isVisible: false
        })
      this.sceneBoardList.push({
        id: rowId,
        name: `item${rowId}`,
        columnData,
        isHide: false
      })
    },
    playSound(name) {
      const sound = new Audio(`/sound/${name}`)
      sound.play()
    },
    view(id) {
      this.viewId = id
      this.sceneBoardList
        .map((_, index) => this.$refs.sceneBoard[index].view(id))
    },
    remove(id) {
      this.sceneBoardList = this.sceneBoardList
        .filter(item => item.id !== id)
      this.rowCount = this.sceneBoardList.length
      this.playSound('done.mp3')
    },
    name(id, name) {
      const findIndex = this.sceneBoardList
        .findIndex(item => item.id === id)
      if (findIndex < 0)
        return
      this.sceneBoardList[findIndex].name = name
    },
    beforeAllRemove() {
      if (this.rowCount < 1) {
        this.playSound('error.mp3')
        return this.$toast.error('목록이 존재하지 않아요.')
      }
      this.$refs.dialog.show({
        icon: 'exclamation-triangle',
        message: '정말로 모두 삭제하게?',
        doEvent: 'allRemove'
      })
      this.playSound('warning.mp3')
    },
    allRemove() {
      this.sceneBoardList = []
      this.viewId = 1
      this.rowCount = 0
      this.isAllHide = false
      this.playSound('done.mp3')
    },
    allHide(flag) {
      if (this.rowCount < 1) {
        this.playSound('error.mp3')
        return this.$toast.error('목록이 존재하지 않아요.')
      }
      this.sceneBoardList
        .map((_, index) => this.$refs.sceneBoard[index].hide(flag))
    },
    visible(flag = true) {
      this.sceneBoardList
        .map((_, index) => this.$refs.sceneBoard[index].visible(flag))
      this.playSound('done.mp3')
    },
    release() {
      this.sceneBoardList
        .map((_, index) => this.$refs.sceneBoard[index].release())
      this.playSound('done.mp3')
    },
    reverse() {
      this.isReverse = !this.isReverse
      this.sceneBoardList = this.sceneBoardList.reverse()
    },
    beforeClear() {
      this.$refs.dialog.show({
        icon: 'exclamation-triangle',
        message: '정말로 모두 삭제하게?',
        doEvent: 'clear'
      })
      this.playSound('warning.mp3')
    },
    clear() {
      this.sceneBoardList
        .map((_, index) => this.$refs.sceneBoard[index].clear())
      this.playSound('done.mp3')
    }
  }
}
</script>
