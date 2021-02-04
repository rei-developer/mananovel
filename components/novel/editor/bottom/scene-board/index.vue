<template>
  <div>
    <Dialog ref='dialog'/>
    <client-only>
      <div class='scene-board-box'>
        <novel-editor-bottom-scene-board-header
          ref='scene-board-header'
          :columnCount='columnCount'
          :isAllHide='isAllHide'
          class='scene-board'
        />
        <novel-editor-bottom-scene-board-inner
          ref='scene-board'
          class='scene-board'
          :id='item.id'
          :name='item.name'
          :columnData='item.columnData'
          v-for='(item, index) in sceneBoardList'
          :key='index'
        />
      </div>
    </client-only>
    <b-button @click='beforeAddRow'>추가</b-button>
    <b-button @click='visible(true)'>활성화</b-button>
    <b-button @click='visible(false)'>삭제</b-button>
    <b-button @click='release'>모두 해제</b-button>
    <b-button @click='beforeClear'>모두 삭제</b-button>
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-hover: #5F5476;
@font-color: #EDE3EB;

.scene-board-box {
  border: 1px solid @primary;
}

.scene-board {
  &:not(:last-child) {
    border-bottom: 1px dashed @primary;
    background-color: #333;
  }
  &:first-child {
    border-bottom: 1px solid @primary;
  }
}
</style>

<script>
import _ from 'lodash'
import Dialog from '@/components/common/dialog'
import NovelEditorBottomSceneBoardHeader from '@/components/novel/editor/bottom/scene-board/header'
import NovelEditorBottomSceneBoardInner from '@/components/novel/editor/bottom/scene-board/inner'
import {CDN_HOST} from '~/data/config.json'
// import {CDN_HOST} from '@/data/config.json'

export default {
  name: 'NovelEditorBottomSceneBoardIndex',
  components: {
    Dialog,
    NovelEditorBottomSceneBoardHeader,
    NovelEditorBottomSceneBoardInner
  },
  data() {
    return {
      viewId: 1,
      rowCount: 5,
      columnCount: 30,
      sceneBoardList: [],
      isAllHide: false
    }
  },
  created() {
    this.$eventBus.$on('playSound', name => this.playSound(name))
    this.$eventBus.$on('view', id => this.view(id))
    this.$eventBus.$on('remove', id => this.remove(id))
    this.$eventBus.$on('hide', () => this.getHideCount())
    this.$eventBus.$on('allHide', flag => this.allHide(flag))
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
    this.$eventBus.$off('hide')
    this.$eventBus.$off('allHide')
    this.$eventBus.$off('clear')
  },
  methods: {
    getHideCount() {
      let count = 0
      this.sceneBoardList
        .map((_, index) => {
          count += this.$refs['scene-board'][index].isHide ? 1 : 0
          this.isAllHide = this.sceneBoardList.length === count
        })
    },
    async beforeAddRow() {
      if (this.rowCount >= 15) {
        this.playSound('error.mp3')
        return this.$toast.error('15개까지만 생성할 수 있습니다.')
      }
      const id = this.sceneBoardList.length > 0
        ? _.maxBy(this.sceneBoardList, 'id').id
        : this.sceneBoardList.length
      this.addRow(id + 1)
      await this.$nextTick()
      this.rowCount = this.sceneBoardList.length
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
        columnData
      })
    },
    playSound(name) {
      const sound = new Audio(`/sound/${name}`)
      sound.play()
    },
    view(id) {
      this.viewId = id
      this.sceneBoardList
        .map((_, index) => this.$refs['scene-board'][index].view(id))
    },
    remove(id) {
      this.sceneBoardList = this.sceneBoardList
        .filter(item => item.id !== id)
      this.rowCount = this.sceneBoardList.length
      this.playSound('done.mp3')
    },
    allHide(flag) {
      this.sceneBoardList
        .map((_, index) => this.$refs['scene-board'][index].hide(flag))
    },
    visible(flag) {
      this.sceneBoardList
        .map((_, index) => this.$refs['scene-board'][index].visible(flag))
      this.playSound('done.mp3')
    },
    release() {
      this.sceneBoardList
        .map((_, index) => this.$refs['scene-board'][index].release())
      this.playSound('done.mp3')
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
        .map((_, index) => this.$refs['scene-board'][index].clear())
      this.playSound('done.mp3')
    }
  }
}
</script>
