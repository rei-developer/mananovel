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
            @mouseenter='onMouseEnterSceneBoard'
            @mouseleave='onMouseLeaveSceneBoard'
          >
            <font-awesome-icon :icon='isSceneBoardOpened ? "chevron-up" : "chevron-down"'/>
          </div>
          <div class='scene-board-tooltip' v-if='isSceneBoardTooltipOpened'>F2</div>
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
      > .toggle-scene-board,
      > .scene-board-tooltip {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 10;
      }
      > .toggle-scene-board {
        right: calc(11px + .5rem);
        bottom: 11px;
        width: 22px;
        height: 15px;
        font-size: 13px;
        border: 1px solid #333;
        border-bottom: 0;
        background-color: @primary;
        &:hover {opacity: .9}
      }
      > .scene-board-tooltip {
        width: 30px;
        height: 17px;
        padding-bottom: 1px;
        right: calc(7px + .5rem);
        bottom: 28px;
        color: #FFF;
        font-size: 12px;
        background-color: #333;
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
import NovelEditorConsole from '@/mixins/novel/editor/console'

export default {
  name: 'NovelEditor',
  layout: 'editor',
  components: {
    NovelEditorContent,
    NovelEditorSidebarScriptEdit,
    NovelEditorSidebarConsole,
    NovelEditorBottomSceneBoard
  },
  mixins: [NovelEditorConsole],
  data() {
    return {
      isSceneBoardTooltipOpened: false
    }
  },
  mounted() {
    window.addEventListener('keydown', e => {
      if (e.keyCode === 113)
        this.onClickToggleSceneBoard(false)
    })
  },
  computed: {
    isSceneBoardOpened() {
      return this.$store.state.novel.editor.isHiddenSceneBoard
    }
  },
  methods: {
    onClickToggleSceneBoard(info = true) {
      this.$store.commit(`novel/editor/toggleHiddenSceneBoard`)
      if (info)
        this.throwConsole('info', '씬 보드는 F2로 접거나 펼칠 수 있어.')
    },
    onMouseEnterSceneBoard() {
      this.isSceneBoardTooltipOpened = true
    },
    onMouseLeaveSceneBoard() {
      this.isSceneBoardTooltipOpened = false
    }
  },
  head() {
    return {
      title: '마나노벨 스튜디오 - 베타 (ver. 1.0.0)'
    }
  }
}
</script>
