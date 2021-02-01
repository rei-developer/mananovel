<template>
  <div>
    <div class='wrapper-body'>
      <Header/>
      <main>
        <div class='content'>
          <b-alert variant='dark' dismissible>
            주소 변경 공지사항은 테스트.com 으로 접속해주세요.
          </b-alert>
          <Nuxt/>
        </div>
        <div class='side' v-if='$store.state.isDesktop'>
          <SidebarAD/>
        </div>
      </main>
      <div class='background' v-if='$store.state.isDesktop'/>
    </div>
    <Footer/>
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;

.wrapper-body {
  min-height: calc(100vh - 44px - 1rem);
  > main {
    display: flex;
    width: 1200px;
    margin: 0 auto;
    > .content {
      flex: 1;
      max-width: 892px;
      > .alert-dismissible {
        width: 100%;
        margin-bottom: .5rem;
        padding-top: .6rem;
        padding-bottom: .8rem;
        border: 0;
        border-radius: 0;
        background: #333;
        color: #FFF;
        font-size: 13px;
        font-weight: bold;
        text-align: center;
      }
    }
    > .side {
      width: 300px;
      margin-left: .5rem;
    }
  }

  > .background {
    width: 4800px;
    height: 4148px;
    position: fixed;
    top: 8rem;
    left: 0;
    background-image: url('/background.jpg');
    background-size: 25%;
    opacity: .1;
    z-index: -1;
  }
}

@media (max-width: 1199px) {
  .wrapper-body > main {width: 100%}
}
</style>

<script>
import Header from '@/components/header'
import SidebarAD from '@/components/sidebar/ad'
import Footer from '@/components/footer'

export default {
  components: {
    Header,
    SidebarAD,
    Footer
  },
  async mounted() {
    await this.$nextTick()
    await this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  async beforeDestroy() {
    await this.$nextTick()
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    async onResize() {
      await this.$nextTick()
      this.$store.commit('screenWidth', window.innerWidth)
    }
  }
}
</script>
