<template>
  <div class='e-scene-board-header'>
    <div
      class='list'
      @click='onClickReverse'
    >
      목록
      <font-awesome-icon :icon='isReverse ? "chevron-down" : "chevron-up"'/>
    </div>
    <div
      class='sub-event'
      @click='onClickRemove'
    >
      <font-awesome-icon icon='trash-alt'/>
    </div>
    <div
      class='sub-event'
      @click='onClickHide'
    >
      <font-awesome-icon :icon='isHiddenAll ? "eye-slash" : "eye"'/>
    </div>
    <ul>
      <li
        :class='[getBlockClassList(item.id)]'
        :data-id='item.id'
        @click='onClickBlock($event, item.id)'
        v-for='item in columns'
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

.e-scene-board-header {
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
    min-width: 21px;
    height: 22px;
    line-height: 18px;
    font-weight: bold;
    border-right: 1px solid @primary;
    border-bottom: 1px solid @primary;
  }
  > .list {
    min-width: 100px;
    padding: 0 3px;
    border-right: 1px dashed @primary;
    border-bottom: 1px solid @primary;
    > svg {margin: 4px 0 0 4px}
  }
  > .sub-event {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 1px;
    border-right: 1px solid @primary;
    border-bottom: 1px solid @primary;
  }
  > ul {
    display: flex;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid @primary;
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
      default: 0
    },
    isHiddenAll: {
      type: Boolean,
      default: false
    },
    isReverse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columns: []
    }
  },
  mounted() {
    for (let id = 1; id <= this.columnCount; id++)
      this.columns.push({id})
  },
  methods: {
    getBlockClassList(id) {
      let classList = []
      const findIndex = this.columns
        .findIndex(item => item.id === id)
      if (findIndex >= 0) {
        const item = this.columns[findIndex]
        if (!!item.isViewed)
          classList.push('view')
      }
      return classList
    },
    onClickBlock(event, id) {
      for (let i = 0; i < this.columns.length; i++) {
        const item = this.columns[i]
        item.id === id
          ? item.isViewed = 1
          : delete item.isViewed
      }
      this.$forceUpdate()
      this.$eventBus.$emit('sb.playSound', 'done.mp3')
      this.$eventBus.$emit('sb.view', id)
    },
    onClickReverse() {
      this.$eventBus.$emit('sb.playSound', 'done.mp3')
      this.$eventBus.$emit('sb.reverse')
    },
    onClickHide() {
      this.$eventBus.$emit('sb.playSound', 'done.mp3')
      this.$eventBus.$emit('sb.hideAll', !this.isHiddenAll)
    },
    onClickRemove() {
      this.$eventBus.$emit('sb.beforeRemoveAll')
    }
  }
}
</script>
