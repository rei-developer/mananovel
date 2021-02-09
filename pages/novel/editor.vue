<template>
  <client-only @contextmenu.prevent>
    <div class='e-content-box'>
      <main>
        <div
          :class='[
            "e-content-wrapper",
            $store.state.novel.editor.isHiddenSceneBoard ? "hide" : undefined
          ]'
        >
          <novel-editor-content/>
          <div
            class='toggle-scene-board'
            @click='onClickToggleSceneBoard'
          >
            <font-awesome-icon :icon='isSceneBoardOpened ? "chevron-up" : "chevron-down"'/>
          </div>
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
@primary: #EDA7B2;

.e-content-box {
  display: flex;
  > main,
  > section {
    flex: 1;
    > .e-content-wrapper {
      position: relative;
      min-height: calc(100vh - 189px - 56px);
      &.hide {min-height: calc(100vh - 56px)}
      > .toggle-scene-board {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: calc(11px + .5rem);
        bottom: 11px;
        width: 22px;
        height: 15px;
        font-size: 13px;
        border: 1px solid #333;
        border-bottom: 0;
        background-color: @primary;
        z-index: 10;
        &:hover {opacity: .9}
      }
    }
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
  },
  computed: {
    isSceneBoardOpened() {
      return this.$store.state.novel.editor.isHiddenSceneBoard
    }
  },
  methods: {
    onClickToggleSceneBoard() {
      this.$store.commit(`novel/editor/toggleHiddenSceneBoard`)
    }
  }
}
</script>
