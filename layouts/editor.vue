<template>
  <div
    :class='[$store.state.novel.editor.isLoading ? "e-editor e-loading" : "e-editor"]'
  >
    <b-overlay variant='dark' :show='isLoading'>
      <template #overlay>
        <div class='text-center'>
          <div class='logo'><img :src='`/mascot.png`' alt='mascot'></div>
          <p><img :src='`/logo.png`' alt='logo'></p>
          <p>데이터를 불러오고 있는 중이에요...!</p>
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
    animation: spin 5s linear infinite;
  }
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
    }
  }
}
</script>
