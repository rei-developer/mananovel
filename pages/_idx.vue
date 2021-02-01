<template>
  <div>
    <SaveContent
      :saveContent='saveContent'
      :saveFileList='saveFileList'
      :saveMagnetList='saveMagnetList'
      v-if='saveContent'
    />
    <SaveList
      :idx='saveContent.idx'
      :board='saveContent.board'
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
import SaveContent from '@/components/save/content'
import SaveList from '@/components/save/list'
import BoardListMixin from '@/mixins/save/list'
import {
  getSaveContent,
  getSaveList
} from '@/api/save'

export default {
  name: 'BoardContent',
  components: {
    SaveContent,
    SaveList
  },
  mixins: [BoardListMixin],
  data() {
    return {
      saveContent: null,
      saveFileList: [],
      saveMagnetList: []
    }
  },
  async asyncData({params, query, redirect, $axios}) {
    const idx = Number(params.idx)
    if (!idx)
      return redirect(302, '/')
    const {
      status: getSaveContentStatus,
      saveContent,
      saveFileList,
      saveMagnetList
    } = await getSaveContent(idx, $axios)
    if (getSaveContentStatus === 'FAIL')
      throw new Error('서버 응답에 실패했습니다')
    const category = query.category
      ? query.category.replace(/\+/g, ' ')
      : undefined
    const q = query.q
      ? query.q.replace(/\+/g, ' ')
      : undefined
    const page = Number(query.page) || 1
    const interval = Number(query.interval) || undefined
    const {
      status: getSaveListStatus,
      count,
      saveList,
      saveCategoryList
    } = await getSaveList({
      board: saveContent.board,
      category,
      q,
      page,
      limit: 20,
      interval
    }, $axios)
    if (getSaveListStatus === 'FAIL')
      throw new Error('서버 응답에 실패했습니다')
    return {
      category,
      q,
      page,
      interval,
      count,
      saveList,
      saveCategoryList,
      saveContent,
      saveFileList,
      saveMagnetList
    }
  }
}
</script>
