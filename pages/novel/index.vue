<template>
  <div class='content-box'>
    <NovelGameIndex
      ref='novelGame'
      v-if='isGameRunning'
    />
    {{ count }}
    {{ dataSource }}
    <b-button
      @click='onGameOpenClick(1, 1)'
    >
      실행
    </b-button>
  </div>
</template>

<style lang='less' scoped>
@primary: #A5CFFF;
@primary-focus: #5F5476;

.content-box {
  margin-bottom: 1rem;
  border-radius: 2px;
  background: #FFF;
  box-shadow: 1px 0 10px rgba(0, 0, 0, .1);
}

</style>

<script>
import NovelGameIndex from '@/components/novel/game'

export default {
  name: 'NovelIndex',
  components: {NovelGameIndex},
  data() {
    return {
      count: 0,
      dataSource: [],
      isGameRunning: false
    }
  },
  async asyncData({$axios}) {
    const {
      count,
      dataSource
    } = await $axios.$post(
      '/api/v1/novel/game',
      {page: 0, limit: 20}
    )
    return {
      count,
      dataSource
    }
  },
  mounted() {
    this.$eventBus.$on('gameEnd', () => this.onGameEnd())
  },
  beforeDestroy() {
    this.$eventBus.$off('gameEnd')
  },
  methods: {
    onGameOpenClick(id, version) {
      this.onGameStart(id, version)
    },
    async onGameStart(id, version) {
      if (this.isGameRunning)
        return
      this.isGameRunning = true
      await this.$nextTick()
      this.$refs.novelGame.show(id, version)
    },
    onGameEnd() {
      if (!this.isGameRunning)
        return
      this.isGameRunning = false
    }
  }
}
</script>
