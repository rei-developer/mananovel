<template>
  <div
    class='backdrop'
    @click.prevent.self='close'
  >
    <section>
      <div class='header'>
        <div
          class='close'
          @click='close'
        >
          <font-awesome-icon icon='times'/>
        </div>
      </div>
      <ul>
        <nuxt-link to='/save/best'>
          <li @click='forceUpdate($event, "best")'>
            <div class='icon'>
              <font-awesome-icon icon='star'/>
            </div>
            인기
          </li>
        </nuxt-link>
        <nuxt-link to='/save/newest'>
          <li @click='forceUpdate($event, "newest")'>
            <div class='icon'>
              <font-awesome-icon icon='clock'/>
            </div>
            최신
          </li>
        </nuxt-link>
        <nuxt-link
          :to='`/save/${item.field}`'
          v-for='(item, index) in boardList'
          :key='index'
        >
          <li @click='forceUpdate($event, item.field)'>
            <div class='icon'/>
            {{ item.name }}
          </li>
        </nuxt-link>
        <nuxt-link to='/help'>
          <li>
            <div class='icon'>
              <font-awesome-icon icon='question-circle'/>
            </div>
            도움말
          </li>
        </nuxt-link>
        <a href='https://t.me/mananovel' target='_blank'>
          <li>
            <div class='icon'>
              <font-awesome-icon icon='paper-plane'/>
            </div>
            광고·문의
          </li>
        </a>
      </ul>
    </section>
  </div>
</template>

<style lang='less' scoped>
@primary-hover: #5F5476;
@font-color: #EDE3EB;
@primary: #EDA7B2;

.backdrop {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .6);
  z-index: 1000;

  > section {
    width: 200px;
    height: 100%;
    font-size: 14px;
    background: #FFF;
    box-shadow: 1px 0 20px rgba(0, 0, 0, .2);
    > .header,
    > ul > a > li {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 .75rem 3px 0;
      color: #FFF;
      background: @primary-hover;
    }
    > .header {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      height: 44px;
      > .close {
        color: #FFF;
        cursor: pointer;
      }
    }
    > ul {
      height: calc(100% - 44px);
      margin: 0;
      padding: 0;
      background: #FAFAFA;
      list-style: none;
      overflow-y: auto;
      > a {
        text-decoration: none;
        > li {
          display: flex;
          color: @primary-hover;
          border-bottom: 1px solid rgba(0, 0, 0, .1);
          background: #FFF;
          &:hover {
            color: @font-color;
            background: @primary;
          }
          > .icon {
            display: flex;
            justify-content: center;
            width: 1.5rem;
            margin-left: .5rem;
            padding-top: 1px;
          }
        }
      }
    }
  }
}
</style>

<script>
import BOARD_LIST from '@/data/board-list'

export default {
  name: 'SidebarMenu',
  data() {
    return {
      boardList: BOARD_LIST
        .filter(item => item.visible)
    }
  },
  methods: {
    forceUpdate(event, field = null) {
      const board = this.$nuxt.$route.params.board
      if (board === field)
        this.$store.commit('forceUpdate')
    },
    close() {
      this.$eventBus.$emit('SetSidebar')
    }
  }
}
</script>
