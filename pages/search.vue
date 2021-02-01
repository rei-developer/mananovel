<template>
  <div>
    <b-alert variant='warning' show>
      <font-awesome-icon icon='exclamation-triangle'/>
      개발중인 페이지입니다. 각 게시판별 검색 기능을 이용해주세요.
    </b-alert>
    검색어: {{ q }}
    {{ saveList }}
  </div>
</template>

<style lang='less' scoped>

</style>

<script>
export default {
  name: 'Search',
  data() {
    return {
      q: null,
      saveList: []
    }
  },
  async asyncData({query, $axios}) {
    const q = query.q || ''
    const {
      status,
      saveList
    } = await $axios.$get(`/api/search?q=${encodeURI(q)}`)
    if (status === 'FAIL')
      throw new Error('서버 응답에 실패했습니다')
    return {
      q,
      saveList
    }
  }
}
</script>
