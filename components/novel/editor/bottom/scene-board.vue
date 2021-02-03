<template>
  <div class='bottom-box' @contextmenu.prevent>
    <ul>
      <li
        :data-id='item.id'
        :class='[getBlockClasslist(item.id)]'
        @click='elementDrag'
        @mousedown='dragMouseDown'
        @contextmenu.self='contextmenu($event, item.id)'
        v-for='item in list'
        :key='item.id'
      />
    </ul>
    <div v-if='hasDragged'>드래그된게 있네</div>
    <div v-if='hasVisibled'>활성화된게 있네</div>
    <b-button @click='visible(true)'>활성화</b-button>
    <b-button @click='visible(false)'>삭제</b-button>
    <b-button @click='clear'>모두 삭제</b-button>
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-hover: #5F5476;
@font-color: #EDE3EB;

.bottom-box {
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  > ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    cursor: cell;
    &:not(:last-child) {border-bottom: 1px solid #EAEAEA}
    > li {
      width: 21px;
      height: 21px;
      background: #FFF;
      &:not(:last-child) {border-right: 1px dashed rgba(0, 0, 0, .1)}
      &.visibled {
        background-color: @primary;
        background-image: url('~assets/middle-point.png');
      }
      &.dragged, &.visibled.dragged {background-color: rgba(237,167,178, .5)}
      &.started {background-image: url('~assets/start-point.png')}
      &.ended {background-image: url('~assets/end-point.png')}
      &.started.ended {background-image: url('~assets/one-point.png')}
    }
  }
}
</style>

<script>
export default {
  name: 'NovelEditorBottomSceneBoard',
  data() {
    return {
      list: []
    }
  },
  mounted() {
    for (let i = 1; i <= 30; i++)
      this.list.push({
        id: i,
        isStartLine: false,
        isEndLine: false,
        isdragged: false,
        isVisible: false
      })
  },
  computed: {
    hasDragged() {
      const len = this.list.filter((item) => item.isdragged).length
      return len > 0
    },
    hasVisibled() {
      const len = this.list.filter((item) => item.isVisible).length
      return len > 0
    }
  },
  methods: {
    getBlockClasslist(id) {
      let classList = []
      const findIndex = this.list.findIndex((item) => item.id === id)
      if (findIndex >= 0) {
        const block = this.list[findIndex]
        if (block.isStartLine)
          classList.push('started')
        if (block.isEndLine)
          classList.push('ended')
        if (block.isVisible)
          classList.push('visibled')
        if (block.isdragged)
          classList.push('dragged')
      }
      return classList
    },
    dragMouseDown(event) {
      event.preventDefault()
      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },
    elementDrag(event) {
      event.preventDefault()
      const className = event.target.className
      if (className === 'dragged')
        return
      const id = Number(event.target.getAttribute('data-id'))
      const findIndex = this.list.findIndex((item) => item.id === id)
      if (findIndex >= 0) {
        const block = this.list[findIndex]
        if (!block.isdragged)
          block.isdragged = true
      }
    },
    closeDragElement() {
      document.onmouseup = null
      document.onmousemove = null
      this.setStartAndEndLine()
    },
    contextmenu(event, id) {
      console.log(id)
    },
    setStartAndEndLine() {

    },
    visible(flag) {
      for (let i = 0; i < this.list.length; i++) {
        const item = this.list[i]
        if (item.isdragged)
          item.isVisible = flag
        item.isdragged = false
        item.isStartLine = false
        item.isEndLine = false
      }
      for (let i = 0; i < this.list.length; i++) {
        const item = this.list[i]
        const prevItem = i !== 0
          ? this.list[i - 1]
          : false
        const nextItem = i !== this.list.length - 1
          ? this.list[i + 1]
          : false
        if ((!prevItem || !prevItem.isVisible) && item.isVisible)
          item.isStartLine = true
        if ((!nextItem || !nextItem.isVisible) && item.isVisible)
          item.isEndLine = true
      }
    },
    clear() {
      this.list = this.list.map((item) => {
        item.isStartLine = false
        item.isEndLine = false
        item.isdragged = false
        item.isVisible = false
        return item
      })
    }
  }
}
</script>
