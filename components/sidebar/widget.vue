<template>
  <b-overlay :show='loading' rounded='sm'>
    <div class='content-box'>
      <div class='title'>
        <b-button
          squared
          size='sm'
          variant='primary'
        >
          <font-awesome-icon icon='star'/>
          실시간 인기
        </b-button>
        <b-button
          squared
          size='sm'
          variant='dark'
        >
          <font-awesome-icon icon='clock'/>
          최근 등록
        </b-button>
      </div>
      <ul>
        <li
          v-for='(item, index) in getData'
          :key='index'
        >
          <NuxtLink
            class='title'
            :to='`/${item.idx}`'
          >
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </b-overlay>
</template>

<style lang='less' scoped>
@primary-hover: #5F5476;
@font-color: #EDE3EB;
@primary: #EDA7B2;

.content-box {
  margin-bottom: .5rem;
  padding: .5rem;
  border-radius: 2px;
  background: #FFF;
  box-shadow: 1px 0 10px rgba(0, 0, 0, .1);
  > .title {
    display: flex;
    margin-bottom: 3px;
    > button {width: 50%}
  }
  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    > li {
      padding: .1rem 0 .2rem;
      > a {
        display: block;
        color: @primary-hover;
        font-size: 12px;
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        cursor: pointer;
        &:hover {color: @primary}
        &:visited {color: #AAA}
      }
    }
  }
}
</style>

<script>
import {getSaveWidgetList} from '@/api/save'

export default {
  name: 'SidebarWidget',
  data() {
    return {
      tab: 'movie',
      movieList: [],
      kMovieList: [],
      loading: true
    }
  },
  mounted() {
    this.fetch()
  },
  computed: {
    getData() {
      return this.tab === 'movie'
        ? this.movieList
        : this.kMovieList
    }
  },
  methods: {
    async fetch() {
      const {
        movieList,
        kMovieList
      } = await getSaveWidgetList(this.$axios, true)
      this.movieList = movieList
      this.kMovieList = kMovieList
      this.loading = false
    }
  }
}
</script>
