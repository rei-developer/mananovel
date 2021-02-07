<template>
  <div class='e-scene-board-inner'>
    <div class='list'>
      <label>
        <span class='required' v-if='isRequired'>*</span>
        {{ id }}:
        <input
          v-model='name'
          :placeholder='savedName'
          @change='onChangeName'
        />
      </label>
    </div>
    <div
      class='sub-event'
      @click='onClickRemove'
    >
      <font-awesome-icon :icon='isRequired ? "recycle" : "trash-alt"'/>
    </div>
    <div
      class='sub-event'
      @click='onClickHide'
    >
      <font-awesome-icon :icon='isHidden ? "eye-slash" : "eye"'/>
    </div>
    <ul>
      <li
        :class='[getBlockClassList(item.id)]'
        :data-id='item.id'
        @click='onClickBlock'
        @dblclick='onDoubleClick($event, item.id)'
        @contextmenu.self='onContextMenu($event, item.id)'
        @mousedown='onMouseDown'
        v-for='item in columns'
        :key='item.id'
      >
        <font-awesome-icon icon='edit' v-if='item.isOpened'/>
      </li>
    </ul>
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-hover: #5F5476;
@view: #B2CCFF;
@view-overlay: #B5B2FF;
@font-color: #EDE3EB;

.e-scene-board-inner {
  display: flex;
  color: #fff;
  font-size: 12px;
  background: #333;
  > .list,
  > .sub-event {
    min-width: 21px;
    height: 22px;
    border-right: 1px solid @primary;
    border-bottom: 1px dashed @primary;
  }
  > .list {
    width: 100px;
    min-width: 100px;
    line-height: 21px;
    padding: 0 3px;
    border-right: 1px dashed @primary;
    border-bottom: 1px dashed @primary;
    > label {
      > span.required {color: red}
      > input {
        width: 100%;
        height: auto;
        margin: 0 0 0 5px;
        padding: 0;
        border: 0;
        color: #FFF;
        background-color: transparent;
        outline: none;
      }
    }
  }
  > .sub-event {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 1px;
    border-right: 1px solid @primary;
    border-bottom: 1px dashed @primary;
  }
  > ul {
    display: flex;
    margin: 0;
    padding: 0;
    border-bottom: 1px dashed @primary;
    list-style: none;
    cursor: cell;
    > li {
      position: relative;
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
      &.open,
      &.open:before {background-color: #ED1C24 !important}
      > svg {
        position: absolute;
        top: 4px;
        margin-left: 4px;
      }
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
    type: {
      type: String,
      default: null
    },
    pureName: {
      type: String,
      default: null
    },
    pureColumns: {
      type: Array,
      default() {
        return []
      }
    },
    isPureHidden: {
      type: Boolean,
      default: false
    },
    isRequired: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tempClickedId: 1,
      name: this.pureName,
      savedName: this.pureName,
      columns: this.pureColumns,
      isHidden: this.isPureHidden
    }
  },
  watch: {
    pureName() {
      this.name = this.pureName
    },
    pureColumns() {
      this.columns = this.pureColumns
    },
    isPureHidden() {
      this.isHidden = this.isPureHidden
    }
  },
  methods: {
    getBlockClassList(id) {
      let classList = []
      const findIndex = this.columns
        .findIndex(item => item.id === id)
      if (findIndex >= 0) {
        const block = this.columns[findIndex]
        if (!!block.isOpened)
          classList.push('open')
        if (!!block.isViewed)
          classList.push('view')
        if (!this.isHidden) {
          if (!!block.isStart)
            classList.push('started')
          if (!!block.isEnd)
            classList.push('ended')
          if (!!block.isVisible)
            classList.push('visible')
          if (!!block.isDragged)
            classList.push('dragged')
          if (!!block.isDraggedStart)
            classList.push('dragged-started')
          if (!!block.isDraggedEnd)
            classList.push('dragged-ended')
        } else {
          classList.push('hide')
        }
      }
      return classList
    },
    onChangeName() {
      this.$eventBus.$emit('cs.getRow', {id: this.id, name: this.name})
      this.$eventBus.$emit('sb.name', this.id, this.name)
    },
    onClickBlock(event) {
      const id = Number(event.target.getAttribute('data-id'))
      if (event.shiftKey) {
        const startId = Math.min(id, this.tempClickedId)
        const endId = Math.max(id, this.tempClickedId)
        this.columns.map(item => {
          if (item.id >= startId && item.id <= endId && !item.isDragged)
            item.isDragged = 1
        })
        this.setStartAndEnd()
      } else {
        this.tempClickedId = id
        this.onMouseMove(event)
      }
    },
    onClickHide() {
      this.hide(null, true)
    },
    onClickRemove() {
      this.remove()
    },
    onDoubleClick(event, id) {
      if (this.isHidden)
        return
      this.$eventBus.$emit('cs.getRowAndSceneId', {id: this.id, name: this.name}, id)
      this.$eventBus.$emit('sb.openSidebar', this.id, id)
    },
    onContextMenu(event, id) {
      console.log(id)
    },
    onMouseDown(event) {
      if (this.isHidden)
        return
      event.preventDefault()
      document.onmousemove = this.onMouseMove
      document.onmouseup = this.onMouseUp
    },
    onMouseMove(event) {
      if (this.isHidden)
        return
      event.preventDefault()
      const id = Number(event.target.getAttribute('data-id'))
      const findIndex = this.columns
        .findIndex(item => item.id === id)
      if (findIndex >= 0) {
        const item = this.columns[findIndex]
        if (!item.isDragged)
          item.isDragged = 1
      }
      this.setStartAndEnd()
    },
    onMouseUp() {
      document.onmouseup = null
      document.onmousemove = null
    },
    view(id) {
      for (let i = 0; i < this.columns.length; i++) {
        const item = this.columns[i]
        if (item.id === id)
          item.isViewed = 1
        else
          delete item.isViewed
        this.$forceUpdate()
      }
    },
    open(id) {
      const findIndex = this.columns
        .findIndex(item => item.id === id)
      if (findIndex >= 0) {
        const item = this.columns[findIndex]
        if (!item.isOpened) {
          item.isOpened = 1
          item.isDragged = 1
          this.visible(true)
        }
      }
    },
    setStartAndEnd() {
      for (let i = 0; i < this.columns.length; i++) {
        const item = this.columns[i]
        delete item.isDraggedStart
        delete item.isDraggedEnd
      }
      for (let i = 0; i < this.columns.length; i++) {
        const item = this.columns[i]
        const prevItem = i !== 0
          ? this.columns[i - 1]
          : false
        const nextItem = i !== this.columns.length - 1
          ? this.columns[i + 1]
          : false
        if ((!prevItem || !prevItem.isDragged) && item.isDragged)
          item.isDraggedStart = 1
        if ((!nextItem || !nextItem.isDragged) && item.isDragged)
          item.isDraggedEnd = 1
      }
      this.$forceUpdate()
    },
    visible(flag) {
      for (let i = 0; i < this.columns.length; i++) {
        const item = this.columns[i]
        if (item.isDragged) {
          flag
            ? item.isVisible = 1
            : delete item.isVisible
        }
        delete item.isStart
        delete item.isEnd
        delete item.isDragged
        delete item.isDraggedStart
        delete item.isDraggedEnd
      }
      for (let i = 0; i < this.columns.length; i++) {
        const item = this.columns[i]
        const prevItem = i !== 0
          ? this.columns[i - 1]
          : false
        const nextItem = i !== this.columns.length - 1
          ? this.columns[i + 1]
          : false
        if ((!prevItem || !prevItem.isVisible) && item.isVisible)
          item.isStart = 1
        if ((!nextItem || !nextItem.isVisible) && item.isVisible)
          item.isEnd = 1
      }
      this.$forceUpdate()
    },
    release() {
      this.columns = this.columns.map(item => {
        delete item.isOpened
        delete item.isDragged
        delete item.isDraggedStart
        delete item.isDraggedEnd
        return item
      })
      this.$forceUpdate()
    },
    hide(flag, soundFlag = false) {
      const isHidden = flag ?? !this.isHidden
      isHidden
        ? this.isHidden = isHidden
        : delete this.isHidden
      if (soundFlag)
        this.$eventBus.$emit('sb.playSound', 'done.mp3')
      this.$eventBus.$emit('sb.hide', this.id, this.isHidden)
      this.release()
    },
    remove() {
      this.$eventBus.$emit('sb.remove', this.id)
    },
    clear() {
      this.columns = this.columns.map(item => {
        delete item.isStart
        delete item.isEnd
        delete item.isDragged
        delete item.isDraggedStart
        delete item.isDraggedEnd
        delete item.isVisible
        return item
      })
    }
  }
}
</script>
