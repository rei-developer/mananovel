<template>
  <div>
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
        <div class='background'/>
      </div>
    </b-overlay>
  </div>
</template>

<style lang='less' scoped>
.wrapper {
  height: 100vh;
  overflow: hidden;
}

.background {
  width: 4800px;
  height: 4148px;
  position: fixed;
  top: 3rem;
  left: -1.25rem;
  background-image: url('/background.jpg');
  background-size: 20%;
  opacity: .1;
  z-index: -1;
}
</style>

<script>
import NovelEditorHeader from '~/components/novel/editor/header'
import NovelEditorHeaderPage from '~/components/novel/editor/header/page'

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
