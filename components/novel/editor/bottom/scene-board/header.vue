<template>
  <div class='bottom-box'>
    <div class='list'>목록</div>
    <div
      class='sub-event'
      @click='remove'
    >
      <font-awesome-icon icon='trash-alt'/>
    </div>
    <div
      class='sub-event'
      @click='hide'
    >
      <font-awesome-icon :icon='isAllHide ? "eye-slash" : "eye"'/>
    </div>
    <ul>
      <li
        :class='[getBlockClassList(item.id)]'
        :data-id='item.id'
        @click='click($event, item.id)'
        v-for='item in sceneBoardColumnList'
        :key='item.id'
      >
        {{ item.id }}
      </li>
    </ul>
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-hover: #5F5476;
@view: #B2CCFF;
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
    display: flex;
    justify-content: center;
    width: 21px;
    height: 21px;
    line-height: 18px;
    font-weight: bold;
    border-right: 1px solid @primary;
  }
  > .list {
    width: 100px;
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
    > li {
      width: 21px;
      height: 21px;
      line-height: 20px;
      text-align: center;
      border-right: 1px dashed @primary;
      &.view {
        color: #333;
        font-weight: bold;
        background-color: @view;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'NovelEditorBottomSceneBoardHeader',
  props: {
    columnCount: {
      type: Number,
      default: 30
    },
    isAllHide: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sceneBoardColumnList: []
    }
  },
  mounted() {
    for (let i = 1; i <= this.columnCount; i++)
      this.sceneBoardColumnList.push({
        id: i,
        isView: i === 1
      })
  },
  methods: {
    getBlockClassList(id) {
      let classList = []
      const findIndex = this.sceneBoardColumnList
        .findIndex(item => item.id === id)
      if (findIndex >= 0) {
        const block = this.sceneBoardColumnList[findIndex]
        if (block.isView)
          classList.push('view')
      }
      return classList
    },
    click(event, id) {
      for (let i = 0; i < this.sceneBoardColumnList.length; i++) {
        const item = this.sceneBoardColumnList[i]
        item.isView = item.id === id
      }
      this.$eventBus.$emit('playSound', 'done.mp3')
      this.$eventBus.$emit('view', id)
    },
    remove() {

    },
    hide() {
      this.$eventBus.$emit('playSound', 'done.mp3')
      this.$eventBus.$emit('allHide', !this.isAllHide)
    }
  }
}
</script>
