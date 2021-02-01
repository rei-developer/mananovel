<template>
  <div>
    <SaveList
      :board='board'
      :category='category'
      :q='q'
      :page='page'
      :limit='limit'
      :interval='interval'
      :count='count'
      :saveList='saveList'
      :saveCategoryList='saveCategoryList'
    />
  </div>
</template>

<script>
import SaveList from '@/components/save/list'
import BoardListMixin from '@/mixins/save/list'
import {getSaveList} from '@/api/save'

export default {
  name: 'BoardIndex',
  components: {SaveList},
  mixins: [BoardListMixin],
  async asyncData({params, query, $axios}) {
    const board = params.board
    const category = query.category
      ? query.category.replace(/\+/g, ' ')
      : undefined
    const q = query.q
      ? query.q.replace(/\+/g, ' ')
      : undefined
    const page = Number(query.page) || 1
    const interval = Number(query.interval) || undefined
    const {
      status,
      count,
      saveList,
      saveCategoryList
    } = await getSaveList({
      board,
      category,
      q,
      page,
      limit: 20,
      interval
    }, $axios)
    if (status === 'FAIL')
      throw new Error('서버 응답에 실패했습니다')
    return {
      board,
      category,
      q,
      page,
      interval,
      count,
      saveList,
      saveCategoryList
    }
  }
}
</script>
