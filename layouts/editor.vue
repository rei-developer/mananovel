<template>
  <div
    :class='[$store.state.novel.editor.isLoading ? "e-editor e-loading" : "e-editor"]'
  >
    <b-overlay variant='dark' :show='isLoading'>
      <template #overlay>
        <div class='text-center'>
          <font-awesome-icon class='fa-spin' style='width: 3rem; height: 3rem' icon='cog'/>
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
@primary: #EDA7B2;

.e-editor {
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  ::selection {background: @primary}
  ::-moz-selection {background: @primary}
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
  computed: {
    isLoading() {
      return this.$store.state['novel']['editor']['isLoading']
    }
  }
}
</script>
