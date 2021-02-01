<script>
import {getSaveList} from '@/api/save'

export default {
  data() {
    return {
      board: undefined,
      category: undefined,
      q: undefined,
      page: 1,
      limit: 20,
      interval: undefined,
      count: 1,
      saveList: [],
      saveCategoryList: []
    }
  },
  mounted() {
    this.$eventBus.$on('SetSearchText', q => {
      this.q = q
      this.fetch(true)
    })
    this.$eventBus.$on('SetCategory', category => {
      this.category = category
      this.fetch(true)
    })
    this.$eventBus.$on('SetInterval', interval => {
      this.interval = interval
      this.fetch(true)
    })
    this.$eventBus.$on('SetPage', page => {
      this.page = page
      this.fetch(true)
    })
  },
  beforeDestroy() {
    this.$eventBus.$off('SetSearchText')
    this.$eventBus.$off('SetCategory')
    this.$eventBus.$off('SetInterval')
    this.$eventBus.$off('SetPage')
  },
  watch: {
    '$store.state.forceUpdate': function () {
      this.category = undefined
      this.q = undefined
      this.page = 1
      this.interval = undefined
      this.fetch()
    }
  },
  methods: {
    async fetch(scrollToTop = false) {
      try {
        const data = await getSaveList({
          board: this.board,
          q: this.q,
          category: this.category,
          page: this.page,
          limit: this.limit,
          interval: this.interval
        }, this.$axios)
        if (data.status === 'FAIL')
          return this.$toast.error('FAIL')
        this.count = data.count
        this.saveList = data.saveList || []
        this.saveCategoryList = data.saveCategoryList || []
        if (scrollToTop) {
          await this.$nextTick()
          window.scrollTo(0, 0)
        }
      } catch (error) {
        this.$toast.error(error.message)
        console.error(error)
      }
    }
  }
}
</script>
