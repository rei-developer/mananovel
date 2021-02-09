<template>
  <div>
    <div class='e-sidebar-console'>
      <div class='side'>
        <div
          class='button'
          @click='toBottom'
        >
          <font-awesome-icon icon='caret-square-down'/>
        </div>
        <div
          class='button'
          @click='clear'
        >
          <font-awesome-icon icon='trash-alt'/>
        </div>
        <hr/>
        <div
          :class='[
            "button",
            isFixed ? undefined : "fixed"
          ]'
          @click='fixing'
        >
          <font-awesome-icon icon='thumbtack'/>
        </div>
      </div>
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
    </div>
    <div class='e-sidebar-console-bottom'>
      <ul>
        <li>마우스 좌표 : ({{ pos.x }}, {{ pos.y }})</li>
        <li v-if='row.id > 0'>액션 : ({{ row.id }}, {{ row.name }})</li>
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
  display: flex;
  height: 167px;
  border: 1px solid @primary;
  background-color: #333;
  > .side {
    margin: 5px 0 5px 5px;
    > .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 19px;
      height: 19px;
      color: @primary;
      font-size: 13px;
      border-radius: 2px;
      &:hover {background-color: rgba(255, 255, 255, .1)}
      &.fixed {opacity: .5}
    }
    > hr {
      margin: 5px 0;
      border-color: rgba(255, 255, 255, .1);
    }
  }
  > .content {
    flex: 1;
    height: 155px;
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
          &.success {background-color: #B2CCFF}
          &.warning {background-color: #FFBB00}
          &.error {background-color: red}
          &.help {background-color: #B5B2FF}
        }
        &.time {
          color: @primary-hover;
          background-color: @font-color;
        }
      }
    }
  }
}

.e-sidebar-console-bottom {
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
</style>

<script>
const EVENT_BUS_PREFIX = 'cs'

export default {
  name: 'NovelEditorSidebarConsole',
  data() {
    return {
      pos: {
        x: 0,
        y: 0
      },
      row: {
        id: 0,
        name: '?'
      },
      sceneId: 0,
      stacks: [],
      isFixed: false
    }
  },
  created() {
    const p = `${EVENT_BUS_PREFIX}.`
    this.$eventBus.$on(`${p}getPos`, (x, y) => this.getPos(x, y))
    this.$eventBus.$on(`${p}getRow`, row => this.getRow(row))
    this.$eventBus.$on(`${p}getRowAndSceneId`, (row, sceneId) => this.getRowAndSceneId(row, sceneId))
    this.$eventBus.$on(`${p}console`, (type = 'info', text = '') => this.console(type, text))
    this.$eventBus.$on(`${p}clear`, () => this.clear())
  },
  beforeDestroy() {
    const p = `${EVENT_BUS_PREFIX}.`
    this.$eventBus.$off(`${p}getPos`)
    this.$eventBus.$off(`${p}getRow`)
    this.$eventBus.$off(`${p}getRowAndSceneId`)
    this.$eventBus.$off(`${p}console`)
    this.$eventBus.$off(`${p}clear`)
  },
  methods: {
    getPos(x, y) {
      this.pos.x = x
      this.pos.y = y
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
    console(type, text) {
      this.stacks.push({
        type,
        text,
        time: this.$moment().format('HH:mm:ss')
      })
      if (!this.isFixed)
        this.toBottom()
    },
    async toBottom() {
      await this.$nextTick()
      this.$refs.console.scrollTop = this.$refs.console.scrollHeight
    },
    clear() {
      this.stacks = []
    },
    fixing() {
      this.isFixed = !this.isFixed
    }
  }
}
</script>
