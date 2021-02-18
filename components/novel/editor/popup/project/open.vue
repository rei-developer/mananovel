<template>
  <div class='backdrop'>
    <drag-it-dude :style='{left: `${x}px`, top: `${y}px`}'>
      <div
        ref='dialog'
        class='dialog'
        :style='{width: `${w}px`}'
      >
        <div class='header'>
          <font-awesome-icon icon='folder-open'/>
          프로젝트 열기
        </div>
        <div class='content'>
          모두모두 환영해<br>
          모두모두 환영해<br>
          모두모두 환영해<br>
        </div>
        <div class='footer'>
          <e-button
            icon='plus-circle'
            @click='onClickNewProject'
            beep
          >
            새 프로젝트
          </e-button>
        </div>
      </div>
    </drag-it-dude>
  </div>
</template>

<script>
import DragItDude from 'vue-drag-it-dude'
import EButton from '~/components/novel/editor/common/button'

export default {
  name: 'NovelEditorPopupOpenProject',
  components: {
    DragItDude,
    EButton
  },
  data() {
    return {
      w: 300,
      x: 0,
      y: 0,
      saveX: 0,
      saveY: 0
    }
  },
  async mounted() {
    await this.$nextTick()
    const ch = this.$refs.dialog.clientHeight
    this.x = (window.innerWidth / 2) - (this.w / 2)
    this.y = (window.innerHeight / 2) - (ch / 2)
  },
  methods: {
    onClickNewProject() {
      this.$store.commit('novel/editor/setEditorState', 'new')
      // this.$store.commit('novel/editor/setGameId', 1)
    }
  }
}
</script>
