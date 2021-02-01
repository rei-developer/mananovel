<template>
  <b-overlay :show='loading' rounded='sm'>
    <div class='content-box'>
      <ul>
        <li
          v-for='(item, index) in data'
          :key='index'
        >
          <NuxtLink
            class='thumb'
            :style='{backgroundImage: item.uuid ? `url("https://cdn.mananovel.com/thumb/${item.uuid}.jpg")` : undefined}'
            :to='`/${item.idx}`'
          />
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
  height: 300px;
  margin-bottom: .5rem;
  padding: .25rem 0 0 .25rem;
  border-radius: 2px;
  background: #FFF;
  box-shadow: 1px 0 10px rgba(0, 0, 0, .1);
  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    > li {
      display: flex;
      float: left;
      > a {
        text-decoration: none;
        cursor: pointer;
        &.thumb {
          width: calc(100px - .5rem);
          height: calc(100px - .5rem);
          margin: .25rem 0 0 .25rem;
          background-repeat: no-repeat;
          background-size: cover;
        }
      }
    }
  }
}
</style>

<script>
import {getSaveThumbList} from '@/api/save'

export default {
  name: 'SidebarThumb',
  data() {
    return {
      data: [],
      loading: true
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const {result} = await getSaveThumbList(this.$axios)
      this.data = result
      this.loading = false
    }
  }
}
</script>
