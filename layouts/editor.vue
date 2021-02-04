<template>
  <div class='wrapper'>
    <novel-editor-header/>
    <novel-editor-header-page/>
    <Nuxt/>
    <div class='background'/>
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
  top: -6rem;
  left: 0;
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
  data() {
    return {}
  },
  methods: {}
}
</script>
