<template>
  <div class='e-content'>
    <novel-editor-content-top/>
    <novel-editor-content-preview
      ref='contentPreview'
      class='content-preview-wrapper custom-scroll-box'
    />
  </div>
</template>

<style lang='less' scoped>
.e-content {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 192px - 56px);
  > .content-preview-wrapper {
    display: flex;
    flex: 1;
    border: 1px solid #333;
    border-left: 0;
  }
}
</style>

<script>
import NovelEditorContentTop from '@/components/novel/editor/content/top'
import NovelEditorContentPreview from '@/components/novel/editor/content/preview'

export default {
  name: 'NovelEditorContent',
  components: {
    NovelEditorContentTop,
    NovelEditorContentPreview
  },
  created() {
    this.$eventBus.$on('zoom', value => this.setZoom(value))
  },
  beforeDestroy() {
    this.$eventBus.$off('zoom')
  },
  methods: {
    setZoom(value) {
      this.$refs.contentPreview.setZoom(value)
    }
  }
}
</script>
