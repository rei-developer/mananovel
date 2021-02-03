<template>
  <div class='content-box'>
    <!--    <NovelGamePreview/>-->
    <main>
      <novel-editor-bottom-scene-board
      />
    </main>
    <section class='sidebar'>
      <novel-editor-sidebar-script-edit/>
    </section>
  </div>
</template>

<style lang='less' scoped>
.content-box {
  display: flex;
  height: 100%;
  > main {flex: 1}
  > section.sidebar {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

<script>
// import NovelGamePreview from '@/components/novel/game/preview'
import NovelEditorSidebarScriptEdit from '@/components/novel/editor/sidebar/script-edit'
import NovelEditorBottomSceneBoard from '@/components/novel/editor/bottom/scene-board'

export default {
  name: 'NovelEditor',
  layout: 'editor',
  components: {
    // NovelGamePreview,
    NovelEditorSidebarScriptEdit,
    NovelEditorBottomSceneBoard
  }
}
</script>
