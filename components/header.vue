<template>
  <div class='wrapper'>
    <SidebarMenu v-if='isSidebar'/>
    <header
      :class='[
        "desktop-only",
        top >= 100 ? "fixed" : undefined
      ]'
    >
      <ul>
        <nuxt-link to='/'>
          <li class='logo'>
            <div>
              <img :src='`/logo${logo}.png`' alt='마나노벨'>
            </div>
            <div>
              <div>MANA NOVEL</div>
              <div>웹으로 즐기는 나의 이야기</div>
            </div>
          </li>
        </nuxt-link>
        <li>
          <b-input-group size='sm'>
            <vue-typeahead-bootstrap
              size='sm'
              placeholder='웹노벨 검색'
              v-model='searchText'
              :data='searchResult'
              :serializer='s => s.text'
              :maxMatches='7'
              @keyup.enter='onSearchClick'
            />
            <b-input-group-append>
              <b-button
                size='sm'
                variant='primary'
                @click='onSearchClick'
              >
                <font-awesome-icon icon='search'/>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </li>
        <li class='right'>
          <b-button-group>
            <b-button squared size='sm' variant='primary' to='/signin'>
              <font-awesome-icon icon='sign-in-alt'/>
              로그인
            </b-button>
            <b-button squared size='sm' variant='outline-primary' to='/signup'>회원가입</b-button>
          </b-button-group>
        </li>
      </ul>
    </header>
    <header class='mobile-only'/>
    <nav
      :class='[
        "desktop-only",
        top >= 100 ? "fixed" : undefined
      ]'
    >
      <ul>
        <nuxt-link to='/novel/best'>
          <li>
            <font-awesome-icon icon='star'/>
            인기작
          </li>
        </nuxt-link>
        <nuxt-link to='/novel/newest'>
          <li>
            <font-awesome-icon icon='history'/>
            최신작
          </li>
        </nuxt-link>
        <nuxt-link to='/novel'>
          <li>노벨 목록</li>
        </nuxt-link>
        <li @click='onNovelEditorClick'>노벨 만들기</li>
        <!--        <nuxt-link-->
        <!--            :to='`/save/${item.field}`'-->
        <!--            v-for='(item, index) in boardList'-->
        <!--            :key='index'-->
        <!--        >-->
        <!--          <li @click='forceUpdate($event, item.field)'>{{ item.name }}</li>-->
        <!--        </nuxt-link>-->
      </ul>
    </nav>
    <nav class='mobile-only fixed'>
      <ul>
        <nuxt-link class='logo' to='/'>
          <li>
            <img src='/icon.png' alt='마나노벨'>
          </li>
        </nuxt-link>
        <nuxt-link to='/save/best'>
          <li @click='forceUpdate($event, "best")'>
            <font-awesome-icon icon='star'/>
            인기
          </li>
        </nuxt-link>
        <nuxt-link to='/save/newest'>
          <li @click='forceUpdate($event, "newest")'>
            <font-awesome-icon icon='clock'/>
            최신
          </li>
        </nuxt-link>
        <nuxt-link to='/help'>
          <li>
            <font-awesome-icon icon='question-circle'/>
            도움말
          </li>
        </nuxt-link>
        <nuxt-link class='right' to='/signin'>
          <li>
            <font-awesome-icon icon='sign-in-alt'/>
          </li>
        </nuxt-link>
      </ul>
    </nav>
    <b-button
      class='scroll-top'
      variant='dark'
      @click='onScrollTopClick'
      v-if='top >= 100'
    >
      <font-awesome-icon icon='chevron-up'/>
    </b-button>
    <b-button
      class='side-menu'
      variant='dark'
      @click='onSidebarClick'
    >
      <font-awesome-icon icon='bars'/>
    </b-button>
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-hover: #5F5476;
@font-color: #EDE3EB;

.wrapper {
  background: #fff;
  > header, nav {
    > ul {
      display: flex;
      align-items: center;
      width: 1200px;
      height: 100px;
      margin: 0 auto;
      padding: 0;
      list-style: none;
      > a {
        color: @primary;
        font-size: 14px;
        text-decoration: none;
        > li.logo {
          display: flex;
          align-items: center;
          &:last-child {
            line-height: 1.2rem;
            div:first-child {
              font-size: 24px;
              font-weight: bold;
            }
          }
        }
      }
      > li {
        margin-left: 1rem;
        &.right {
          display: flex;
          flex: 1;
          justify-content: flex-end;
        }
      }
    }
  }
  > header.fixed {margin-bottom: calc(1rem + 44px)}
  > nav {
    margin-bottom: 1rem;
    color: #FFF;
    background: @primary;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .1);
    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 5;
    }
    > ul {
      height: 44px;
      > a {
        height: 44px;
        line-height: 42px;
        padding: 0 .5rem;
        color: #FFF;
        font-size: 13px;
        font-weight: bold;
        text-decoration: none;
        white-space: nowrap;
        &:hover {
          color: @font-color;
          background: @primary-hover;
        }
      }
    }
  }
  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 1rem;
    width: 3rem;
    height: 3rem;
    font-size: 2rem;
    border-radius: 500rem;
    z-index: 1000;
    &.scroll-top {
      bottom: 4.5rem;
      > svg {margin-bottom: 2px}
    }
    &.side-menu {
      bottom: 1rem;
      font-size: 1.5rem;
    }
  }
}

.input-group > div:first-child {width: 300px}

@media (max-width: 1199px) {
  .wrapper > header.mobile-only {height: calc(1rem + 44px)}
  .wrapper > header,
  .wrapper > nav > ul {
    width: 100%;
    > a {
      &.logo:hover,
      &.right:hover {background: unset}
      &.right {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        font-size: 1.5rem;
      }
      > li > img {margin-top: -2px}
    }
  }
}
</style>

<script>
import VueTypeaheadBootstrap from '@/components/common/search'
import SidebarMenu from '@/components/sidebar/menu'

import BOARD_LIST from '@/data/board-list'

export default {
  name: 'Header',
  components: {
    VueTypeaheadBootstrap,
    SidebarMenu
  },
  data() {
    return {
      searchText: '',
      searchResult: [],
      boardList: BOARD_LIST
        .filter(item => item.visible),
      top: 0,
      logo: Math.floor(Math.random() * 4) + 1,
      isNovelEditorPopupOpen: false,
      isSidebar: false
    }
  },
  watch: {
    searchText() {
      this.search()
    }
  },
  async created() {
    try {
      await this.$nextTick()
      window.addEventListener('scroll', this.handleScroll)
    } catch (error) {
    }
  },
  mounted() {
    this.$eventBus.$on('SetSidebar', () => this.onSidebarClick())
  },
  beforeDestroy() {
    this.$eventBus.$off('SetSidebar')
  },
  async destroyed() {
    try {
      await this.$nextTick()
      window.removeEventListener('scroll', this.handleScroll)
    } catch (error) {
    }
  },
  methods: {
    forceUpdate(event, field = null) {
      const board = this.$nuxt.$route.params.board
      if (board === field)
        this.$store.commit('forceUpdate')
    },
    handleScroll() {
      this.top = window.top.scrollY
    },
    async search() {
      if (this.searchText === '' || this.searchText.length < 2)
        return this.searchResult = []
      try {
        const data = await this.$axios.$get(`/api/v1/search/list/${this.searchText}`)
        if (data.status === 'FAIL' || !data.result)
          return this.searchResult = []
        this.searchResult = data.result
      } catch (error) {
        if (error.response?.status === 429)
          return this.$toast.error(error.response.data.message)
        this.$toast.error(error.message)
        console.error(error)
      }
    },
    onSearchClick() {
      this.$router.push({path: `/search?q=${this.searchText}`})
      console.log(this.searchText)
    },
    async onScrollTopClick() {
      await this.$nextTick()
      window.scrollTo(0, 0)
    },
    async onNovelEditorClick() {
      this.isNovelEditorPopupOpen = !this.isNovelEditorPopupOpen
      let routeData = this.$router.resolve(
        {
          path: '/novel/editor',
          query: {'gameId': 'test'}
        })
      window.open(routeData.href, '_blank', `width=${screen.width},height=${screen.height}`)
    },
    onSidebarClick() {
      this.isSidebar = !this.isSidebar
    }
  }
}
</script>
