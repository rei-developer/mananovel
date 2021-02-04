<template>
  <div class='bottom-box'>
    <div class='list'>{{ name }}</div>
    <div
      class='sub-event'
      @click='remove'
    >
      <font-awesome-icon icon='trash-alt'/>
    </div>
    <div
      class='sub-event'
      @click='hide(null, true)'
    >
      <font-awesome-icon :icon='isHide ? "eye-slash" : "eye"'/>
    </div>
    <ul>
      <li
        :class='[getBlockClassList(item.id)]'
        :data-id='item.id'
        @click='elementDrag'
        @mousedown='dragMouseDown'
        @dblclick='doubleClick($event, item.id)'
        @contextmenu.self='contextmenu($event, item.id)'
        v-for='item in columnData'
        :key='item.id'
      />
    </ul>
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-hover: #5F5476;
@view: #B2CCFF;
@view-overlay: #B5B2FF;
@font-color: #EDE3EB;

.bottom-box {
  display: flex;
  color: #fff;
  font-size: 12px;
  background: #333;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  > .list,
  > .sub-event {
    width: 21px;
    height: 21px;
    border-right: 1px solid @primary;
  }
  > .list {
    width: 100px;
    line-height: 21px;
    padding: 0 3px;
    border-right: 1px dashed @primary;
  }
  > .sub-event {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -1px;
    border-right: 1px solid @primary;
  }
  > ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    cursor: cell;
    > li {
      width: 21px;
      height: 21px;
      border-right: 1px dashed @primary;
      background-clip: content-box;
      &.visible {
        background-color: @primary;
        background-image: url('~assets/middle-point.png');
      }
      &.dragged {
        background-color: #6B66FF;
        &:before {
          content: '';
          background-color: #333;
          margin: 3px 0;
          width: 21px;
          height: 15px;
          position: absolute;
        }
        &.dragged-started:before {
          width: 18px;
          margin: 3px 0 0 3px;
        }
        &.dragged-ended:before {
          width: 17px;
          margin: 3px 3px 0 0;
        }
        &.dragged-started.dragged-ended:before {
          width: 14px;
          margin: 3px 3px;
        }
      }
      &.visible.dragged:before {
        background-color: @primary;
        z-index: -1;
      }
      &.view:not(.dragged),
      &.view.dragged:before {background-color: @view}
      &.view.visible,
      &.view.visible:before {background-color: @view-overlay}
      &.hide {
        background-color: #666;
        cursor: not-allowed;
      }
      &.started {background-image: url('~assets/start-point.png')}
      &.ended,
      &.visible.ended {background-image: url('~assets/end-point.png')}
      &.started.ended {background-image: url('~assets/one-point.png')}
    }
  }
}
</style>

<script>
export default {
  name: 'NovelEditorBottomSceneBoardInner',
  props: {
    id: {
      type: Number,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    columnData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isHide: false
    }
  },
  methods: {
    getBlockClassList(id) {
      let classList = []
      const findIndex = this.columnData
        .findIndex(item => item.id === id)
      if (findIndex >= 0) {
        const block = this.columnData[findIndex]
        if (block.isView)
          classList.push('view')
        if (!this.isHide) {
          if (block.isStartLine)
            classList.push('started')
          if (block.isEndLine)
            classList.push('ended')
          if (block.isVisible)
            classList.push('visible')
          if (block.isDragged)
            classList.push('dragged')
          if (block.isDraggedStartLine)
            classList.push('dragged-started')
          if (block.isDraggedEndLine)
            classList.push('dragged-ended')
        } else {
          classList.push('hide')
        }
      }
      return classList
    },
    dragMouseDown(event) {
      if (this.isHide)
        return
      event.preventDefault()
      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },
    elementDrag(event) {
      if (this.isHide)
        return
      event.preventDefault()
      const id = Number(event.target.getAttribute('data-id'))
      const findIndex = this.columnData
        .findIndex((item) => item.id === id)
      if (findIndex >= 0) {
        const block = this.columnData[findIndex]
        if (!block.isDragged)
          block.isDragged = true
      }
      this.setStartAndEndLine()
    },
    closeDragElement() {
      document.onmouseup = null
      document.onmousemove = null
    },
    view(id) {
      for (let i = 0; i < this.columnData.length; i++) {
        const item = this.columnData[i]
        item.isView = item.id === id
      }
    },
    doubleClick(event, id) {
      if (this.isHide)
        return
      alert(id)
    },
    contextmenu(event, id) {
      console.log(id)
    },
    remove() {
      this.$eventBus.$emit('remove', this.id)
    },
    hide(flag, soundFlag = false) {
      this.isHide = flag ?? !this.isHide
      if (soundFlag)
        this.$eventBus.$emit('playSound', 'done.mp3')
      this.$eventBus.$emit('hide')
      this.release()
    },
    setStartAndEndLine() {
      for (let i = 0; i < this.columnData.length; i++) {
        const item = this.columnData[i]
        item.isDraggedStartLine = false
        item.isDraggedEndLine = false
      }
      for (let i = 0; i < this.columnData.length; i++) {
        const item = this.columnData[i]
        const prevItem = i !== 0
          ? this.columnData[i - 1]
          : false
        const nextItem = i !== this.columnData.length - 1
          ? this.columnData[i + 1]
          : false
        if ((!prevItem || !prevItem.isDragged) && item.isDragged)
          item.isDraggedStartLine = true
        if ((!nextItem || !nextItem.isDragged) && item.isDragged)
          item.isDraggedEndLine = true
      }
    },
    visible(flag) {
      for (let i = 0; i < this.columnData.length; i++) {
        const item = this.columnData[i]
        if (item.isDragged)
          item.isVisible = flag
        item.isStartLine = false
        item.isEndLine = false
        item.isDragged = false
        item.isDraggedStartLine = false
        item.isDraggedEndLine = false
      }
      for (let i = 0; i < this.columnData.length; i++) {
        const item = this.columnData[i]
        const prevItem = i !== 0
          ? this.columnData[i - 1]
          : false
        const nextItem = i !== this.columnData.length - 1
          ? this.columnData[i + 1]
          : false
        if ((!prevItem || !prevItem.isVisible) && item.isVisible)
          item.isStartLine = true
        if ((!nextItem || !nextItem.isVisible) && item.isVisible)
          item.isEndLine = true
      }
    },
    release() {
      this.columnData = this.columnData.map(item => {
        item.isDragged = false
        item.isDraggedStartLine = false
        item.isDraggedEndLine = false
        return item
      })
    },
    clear() {
      this.columnData = this.columnData.map(item => {
        item.isStartLine = false
        item.isEndLine = false
        item.isDragged = false
        item.isDraggedStartLine = false
        item.isDraggedEndLine = false
        item.isVisible = false
        return item
      })
    }
  }
}
</script>
