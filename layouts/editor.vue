<template>
  <div
    :class='[$store.state.novel.editor.isLoading ? "e-editor e-loading" : "e-editor"]'
  >
    <b-overlay variant='dark' :show='isLoading || !isLogged'>
      <template
        #overlay
        v-if='isLoading'
      >
        <div class='text-center'>
          <div class='logo'><img class='spin' src='/mascot.png' alt='mascot'></div>
          <p><img src='/logo.png' alt='logo'></p>
          <p>데이터를 불러오고 있는 중이에요...!</p>
        </div>
      </template>
      <template
        #overlay
        v-if='!isLogged'
      >
        <div class='text-center'>
          <p><img src='/logo.png' alt='logo'></p>
          <p>
            <b-button
              size='sm'
              variant='warning'
              @click='signIn'
            >
              <font-awesome-icon icon='comment'/>
              카카오톡으로 로그인
            </b-button>
          </p>
        </div>
      </template>
      <div class='wrapper'>
        <novel-editor-header/>
        <novel-editor-header-page/>
        <Nuxt/>
      </div>
    </b-overlay>
  </div>
</template>

<style lang='less' scoped>
@primary: #A5CFFF;

.e-editor {
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  ::selection {background: @primary}
  ::-moz-selection {background: @primary}
  .logo > img {
    width: 8rem;
    height: auto;
    margin-bottom: 1rem;
    border-radius: 500rem;
    &.spin {animation: spin 5s linear infinite}
  }
  p {color: #FFF}
}

.e-loading {cursor: wait}

.wrapper {
  height: 100vh;
  overflow: hidden;
}
</style>

<script>
import NovelEditorHeader from '@/components/novel/editor/header'
import NovelEditorHeaderPage from '@/components/novel/editor/header/page'

const REST_API_KEY = 'aa7f303969993750f8c188c33e241ab2'
const REDIRECT_URI = '/api/v1/auth/kakao'

export default {
  name: 'NovelEditor',
  components: {
    NovelEditorHeader,
    NovelEditorHeaderPage
  },
  mounted() {
    const theme = localStorage.getItem('theme')
    if (!!theme) {
      const style = document.documentElement.style
      style.setProperty('--primary', theme)
    }
  },
  computed: {
    isLoading() {
      return this.$store.state['novel']['editor']['isLoading']
    },
    isLogged() {
      return this.$store.state.user.isLogged
    }
  },
  methods: {
    async signIn() {
      await this.$nextTick()
      const url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${location.origin}${REDIRECT_URI}&response_type=code`
      const verify = window.open(url, '카카오톡 로그인', 'width=420, height=600')
      verify.onbeforeunload = () => this.reload()
    },
    reload() {
      const service = localStorage.getItem('service')
      const token = localStorage.getItem('token')
      this.$store.commit('user/signIn', {
        service,
        token
      })
    }
  }
}
</script>
