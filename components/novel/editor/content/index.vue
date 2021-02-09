<template>
  <div
    :class='[
      "e-content",
      $store.state.novel.editor.isHiddenSceneBoard ? "hide" : undefined
    ]'
  >
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
  height: calc(100vh - 189px - 56px);
  &.hide {height: calc(100vh - 56px)}
  > .content-preview-wrapper {
    display: flex;
    flex: 1;
    width: calc(100vw - 400px);
    border: 1px solid #333;
    border-left: 0;
    background-color: rgba(237, 167, 178, .1);
    overflow: scroll;
  }
}
</style>

<script>
import NovelEditorContentTop from '@/components/novel/editor/content/top'
import NovelEditorContentPreview from '@/components/novel/editor/content/preview'

const EVENT_BUS_PREFIX = 'c'

export default {
  name: 'NovelEditorContent',
  components: {
    NovelEditorContentTop,
    NovelEditorContentPreview
  },
  created() {
    const p = `${EVENT_BUS_PREFIX}.`
    this.$eventBus.$on(`${p}zoom`, value => this.setZoom(value))
  },
  beforeDestroy() {
    const p = `${EVENT_BUS_PREFIX}.`
    this.$eventBus.$off(`${p}zoom`)
  },
  methods: {
    setZoom(value) {
      this.$refs.contentPreview.setZoom(value)
    }
  }
}
</script>
