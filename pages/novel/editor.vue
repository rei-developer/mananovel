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
        <novel-editor-sidebar-script-edit
          ref='sidebarScriptEdit'
        />
      </section>
    </div>
  </client-only>
</template>

<style lang='less' scoped>
.e-content-box {
  display: flex;
  > main {
    flex: 1;
    > .e-content-wrapper {min-height: calc(100vh - 192px - 56px)}
  }
  > section {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

<script>
import NovelEditorContent from '@/components/novel/editor/content'
import NovelEditorSidebarScriptEdit from '~/components/novel/editor/sidebar/script-edit/index'
import NovelEditorBottomSceneBoard from '@/components/novel/editor/bottom/scene-board'

export default {
  name: 'NovelEditor',
  layout: 'editor',
  components: {
    NovelEditorContent,
    NovelEditorSidebarScriptEdit,
    NovelEditorBottomSceneBoard
  }
}
</script>
