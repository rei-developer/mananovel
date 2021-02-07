<template>
  <div class='e-sidebar-console'>
    <div
      ref='console'
      class='content custom-scroll-box'
    >
      <ul
        v-for='(item, index) in stacks'
        :key='index'
      >
        <li
          :class='[
            "type",
            item.type
          ]'
        >
          {{ item.type.toUpperCase() }}
        </li>
        <li class='time'>{{ item.time }}</li>
        <li>: {{ item.text }}</li>
      </ul>
    </div>
    <div class='bottom'>
      <ul>
        <li v-if='page.id > 0'>페이지 : ({{ page.id }}, {{ page.name }})</li>
        <li v-if='row.id > 0'>항목 : ({{ row.id }}, {{ row.name }})</li>
        <li v-if='sceneId > 0'>씬 ID : {{ sceneId }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-hover: #5F5476;
@font-color: #EDE3EB;

.e-sidebar-console {
  height: 189px;
  border: 1px solid @primary;
  background-color: #333;
  > .content {
    height: 156px;
    margin: 5px;
    padding: 3px;
    border: 3px double @primary;
    > ul {
      display: flex;
      margin: 0 0 2px;
      padding: 0;
      color: #FFF;
      font-size: 13px;
      list-style: none;
      > li {
        line-height: 1;
        &:not(:first-child) {margin-left: 3px}
        &.type,
        &.time {
          height: 16px;
          padding: 0 3px;
          color: #333;
          border-radius: 2px;
        }
        &.type {
          line-height: 1.2;
          font-weight: bold;
          &.info {background-color: #9FC93C}
          &.warning {background-color: #FFBB00}
          &.error {background-color: red}
          &.success {background-color: #B2CCFF}
        }
        &.time {
          color: @primary-hover;
          background-color: @font-color;
        }
      }
    }
  }
  > .bottom {
    height: 22px;
    background-color: @primary;
    > ul {
      display: flex;
      justify-content: flex-end;
      margin: 0 5px 0;
      padding: 0;
      color: #333;
      font-size: 13px;
      list-style: none;
      > li:not(:first-child) {margin-left: .75rem}
    }
  }
}
</style>

<script>
const eventBusPrefix = 'cs'

export default {
  name: 'NovelEditorSidebarConsole',
  data() {
    return {
      page: {
        id: 0,
        name: '?'
      },
      row: {
        id: 0,
        name: '?'
      },
      sceneId: 0,
      stacks: []
    }
  },
  created() {
    const p = `${eventBusPrefix}.`
    this.$eventBus.$on(`${p}getPage`, page => this.getPage(page))
    this.$eventBus.$on(`${p}getRow`, row => this.getRow(row))
    this.$eventBus.$on(`${p}getRowAndSceneId`, (row, sceneId) => this.getRowAndSceneId(row, sceneId))
    this.$eventBus.$on(`${p}console`, (type = 'info', text = '', color = null) => this.console(type, text, color))
  },
  beforeDestroy() {
    const p = `${eventBusPrefix}.`
    this.$eventBus.$off(`${p}getPage`)
    this.$eventBus.$off(`${p}getRow`)
    this.$eventBus.$off(`${p}getRowAndSceneId`)
    this.$eventBus.$off(`${p}console`)
  },
  methods: {
    getPage(page) {
      this.page.id = page.id
      this.page.name = page.name.length > 7
        ? `${page.name.substr(0, 7)}...`
        : page.name
    },
    getRow(row) {
      this.row.id = row.id
      this.row.name = row.name.length > 7
        ? `${row.name.substr(0, 7)}...`
        : row.name
    },
    getRowAndSceneId(row, sceneId) {
      this.row.id = row.id
      this.row.name = row.name.length > 7
        ? `${row.name.substr(0, 7)}...`
        : row.name
      this.sceneId = sceneId
    },
    async console(type, text, color) {
      this.stacks.push({
        type,
        text,
        color,
        time: this.$moment().format('HH:mm:ss')
      })
      await this.$nextTick()
      this.$refs.console.scrollTop = this.$refs.console.scrollHeight
    }
  }
}
</script>
