<template>
  <div class='e-editor'>
    <client-only @contextmenu.prevent>
      <b-overlay variant='dark' :show='isLoading || !isLogged'>
        <template #overlay v-if='isLoading'>
          <div class='text-center'>
            <div class='logo'>
              <img class='spin' src='/mascot.png' alt='mascot'>
            </div>
            <p><img src='/logo.png' alt='logo'></p>
            <p>데이터를 불러오고 있는 중이에요...!</p>
          </div>
        </template>
        <template #overlay v-if='!isLogged'>
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
          <header/>
          <header-page/>
          <div class='e-content-box'>
            <popup-open-project
              :is='getComponent'
              v-if='getEditorState'
            />
            <main>
              <div
                :class='[
            "e-content-wrapper",
            isHiddenSceneBoard ? "hide" : undefined
          ]'
              >
                <content/>
                <div
                  class='toggle-scene-board'
                  @click='onClickToggleSceneBoard'
                  @mouseenter='onMouseEnterSceneBoard'
                  @mouseleave='onMouseLeaveSceneBoard'
                >
                  <font-awesome-icon :icon='isHiddenSceneBoard ? "chevron-up" : "chevron-down"'/>
                </div>
                <div class='scene-board-tooltip' v-if='isHiddenSceneBoard'>F2</div>
              </div>
              <div>
                <bottom-scene-board/>
              </div>
            </main>
            <section>
              <div class='e-content-wrapper'>
                <sidebar-script-edit
                  ref='sidebarScriptEdit'
                />
              </div>
              <div>
                <sidebar-console/>
              </div>
            </section>
          </div>
        </div>
      </b-overlay>
    </client-only>
  </div>
</template>

<style lang='less' scoped>
.e-editor {
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  ::selection {
    color: #333;
    background: var(--primary);
  }
  .logo > img {
    width: 8rem;
    height: auto;
    margin-bottom: 1rem;
    border-radius: 500rem;
    &.spin {animation: spin 5s linear infinite}
  }
  p {color: #FFF}
  .wrapper {
    height: 100vh;
    overflow: hidden;
  }
  .e-content-box {
    display: flex;
    > main,
    > section {
      flex: 1;
      > .e-content-wrapper {
        position: relative;
        min-height: calc(100vh - 189px - 56px);
        &.hide {min-height: calc(100vh - 56px)}
        > .toggle-scene-board,
        > .scene-board-tooltip {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          z-index: 10;
        }
        > .toggle-scene-board {
          right: calc(11px + .5rem);
          bottom: 11px;
          width: 22px;
          height: 15px;
          font-size: 13px;
          border: 1px solid #333;
          border-bottom: 0;
          background-color: var(--primary);
          &:hover {opacity: .9}
        }
        > .scene-board-tooltip {
          width: 30px;
          height: 17px;
          padding-bottom: 1px;
          right: calc(7px + .5rem);
          bottom: 28px;
          color: #FFF;
          font-size: 12px;
          background-color: #333;
        }
      }
    }
  }
}
</style>

<script>
import Header from '@/components/novel/editor/header'
import HeaderPage from '@/components/novel/editor/header/page'
import Content from '@/components/novel/editor/content'
import SidebarScriptEdit from '@/components/novel/editor/sidebar/script-edit'
import SidebarConsole from '@/components/novel/editor/sidebar/console'
import BottomSceneBoard from '@/components/novel/editor/bottom/scene-board'
import PopupOpenProject from '@/components/novel/editor/popup/project/open'
import PopupNewProject from '@/components/novel/editor/popup/project/new'
import Console from '@/mixins/novel/editor/console'

const REST_API_KEY = 'aa7f303969993750f8c188c33e241ab2'
const REDIRECT_URI = '/api/v1/auth/kakao'

export default {
  name: 'NovelEditor',
  layout: 'empty',
  components: {
    Header,
    HeaderPage,
    Content,
    SidebarScriptEdit,
    SidebarConsole,
    BottomSceneBoard,
    PopupOpenProject,
    PopupNewProject
  },
  mixins: [Console],
  data() {
    return {
      isSceneBoardTooltipOpened: false
    }
  },
  mounted() {
    const theme = localStorage.getItem('theme')
    if (!!theme) {
      const style = document.documentElement.style
      style.setProperty('--primary', theme)
    }
    window.addEventListener('keydown', e => {
      if (e.keyCode === 113)
        this.onClickToggleSceneBoard(false)
    })
  },
  computed: {
    getComponent() {
      const componentList = [
        {state: 'open', component: PopupOpenProject},
        {state: 'new', component: PopupNewProject}
      ]
      return componentList
        .find(item => item.state === this.$store.state.novel.editor.editorState)?.component
    },
    getEditorState() {
      return this.$store.state.novel.editor.editorState
    },
    isHiddenSceneBoard() {
      return this.$store.state.novel.editor.isHiddenSceneBoard
    },
    isLoading() {
      return this.$store.state['novel']['editor']['isLoading']
    },
    isLogged() {
      return this.$store.state.user.isLogged
    }
  },
  methods: {
    onClickToggleSceneBoard(info = true) {
      this.$store.commit(`novel/editor/toggleHiddenSceneBoard`)
      if (info)
        this.throwConsole('info', '씬 보드는 F2로 접거나 펼칠 수 있어.')
    },
    onMouseEnterSceneBoard() {
      this.isSceneBoardTooltipOpened = true
    },
    onMouseLeaveSceneBoard() {
      this.isSceneBoardTooltipOpened = false
    },
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
      this.$store.commit('novel/editor/setEditorState', 'open')
    }
  },
  head() {
    return {
      title: '마나노벨 웹 비주얼노벨 엔진 - 베타 (ver. 1.0.0)'
    }
  }
}
</script>
