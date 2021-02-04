<template>
  <div @contextmenu.prevent>
    <div class='content-box'>
      <main>
        <div class='content'>
          <novel-game-preview/>
        </div>
        <div class='bottom'>
          <novel-editor-bottom-scene-board/>
        </div>
      </main>
      <section class='sidebar'>
        <novel-editor-sidebar-script-edit/>
      </section>
    </div>
  </div>
</template>

<style lang='less' scoped>
.content-box {
  display: flex;
  > main {
    flex: 1;
    > .content {min-height: calc(100vh - 192px - 56px)}
  }
  > section.sidebar {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

<script>
import NovelGamePreview from '@/components/novel/game/preview'
import NovelEditorSidebarScriptEdit from '@/components/novel/editor/sidebar/script-edit'
import NovelEditorBottomSceneBoard from '~/components/novel/editor/bottom/scene-board'

export default {
  name: 'NovelEditor',
  layout: 'editor',
  components: {
    NovelGamePreview,
    NovelEditorSidebarScriptEdit,
    NovelEditorBottomSceneBoard
  }
}
</script>
