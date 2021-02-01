<template>
  <b-overlay :show='loading' rounded='sm'>
    <div class='content-box'>
      <div class='title'>
        <b-button
          squared
          size='sm'
          variant='primary'
        >
          <font-awesome-icon icon='search'/>
          실시간 검색
        </b-button>
        <b-button
          squared
          size='sm'
          variant='dark'
        >
          <font-awesome-icon icon='search-plus'/>
          주간 검색
        </b-button>
      </div>
      <div class='content'>
        <b-badge
          :to='`/search?q=${item.text}`'
          variant='secondary'
          v-for='(item, index) in tags'
          :key='index'
        >
          {{ item.text }}
        </b-badge>
      </div>
    </div>
  </b-overlay>
</template>

<style lang='less' scoped>
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
  > .content {
    > a {
      margin-right: 4px;
      padding: 3px 5px 5px 5px;
    }
  }
}
</style>

<script>
export default {
  name: 'SidebarSearch',
  data() {
    return {
      tags: [],
      loading: true
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const {
        status,
        result
      } = await this.$axios.$get('/api/v1/search/widget/realtime')
      if (status === 'FAIL')
        return
      this.tags = result
      this.loading = false
    }
  }
}
</script>
