<template>
  <client-only @contextmenu.prevent>
    <div class='e-content-box'>
      <main>
        <div class='e-content-wrapper'>
          <novel-editor-content/>
        </div>
        <div>
          <novel-editor-bottom-scene-board/>
        </div>
      </main>
      <section>
        <div class='e-content-wrapper'>
          <novel-editor-sidebar-script-edit
            ref='sidebarScriptEdit'
          />
        </div>
        <div>
          <novel-editor-sidebar-console/>
        </div>
      </section>
    </div>
  </client-only>
</template>

<style lang='less' scoped>
.e-content-box {
  display: flex;
  > main,
  > section {
    flex: 1;
    > .e-content-wrapper {min-height: calc(100vh - 189px - 56px)}
  }
}
</style>

<script>
import NovelEditorContent from '@/components/novel/editor/content'
import NovelEditorSidebarScriptEdit from '@/components/novel/editor/sidebar/script-edit/index'
import NovelEditorSidebarConsole from '@/components/novel/editor/sidebar/console'
import NovelEditorBottomSceneBoard from '@/components/novel/editor/bottom/scene-board'

export default {
  name: 'NovelEditor',
  layout: 'editor',
  components: {
    NovelEditorContent,
    NovelEditorSidebarScriptEdit,
    NovelEditorSidebarConsole,
    NovelEditorBottomSceneBoard
  }
}
</script>
