<template>
  <div class='backdrop'>
    <drag-it-dude :style='{left: `${x}px`, top: `${y}px`}'>
      <div
        ref='dialog'
        class='dialog'
        :style='{width: `${w}px`}'
      >
        <div class='header'>
          <font-awesome-icon icon='plus-circle'/>
          새 프로젝트
        </div>
        <div class='content'>
          <div class='e-section-body'>
            <div class='item'>
              <div class='label'>데이터베이스</div>
              <div class='content'>
                <div class='rows'>
                  <div class='label'>URL</div>
                  <div class='block'>
                    <e-input
                      placeholder='보이스 URL 주소'
                      block
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr/>
            <div class='item'>
              <div class='content'>
                <div class='rows'>
                  <div class='cols'>
                    <b-form-checkbox
                      v-model='isApplyAllVisibleColumns'
                      value='accepted'
                      switch
                    >
                      테스트
                    </b-form-checkbox>
                  </div>
                  <div class='cols'>
                    <div class='e-button-group right'>
                      <e-button
                        variant='gray'
                        icon='arrow-left'
                        @click='onClickNewProject'
                        beep
                      >
                        돌아가기
                      </e-button>
                      <e-button
                        icon='plus-square'
                        @click='onClickCreate'
                        beep
                      >
                        생성
                      </e-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </drag-it-dude>
  </div>
</template>

<script>
import DragItDude from 'vue-drag-it-dude'
import EButton from '~/components/novel/editor/common/button'
import EInput from '~/components/novel/editor/common/input'

export default {
  name: 'NovelEditorPopupNewProject',
  components: {
    DragItDude,
    EButton,
    EInput
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
      this.$store.commit('novel/editor/setEditorState', 'open')
    }
  }
}
</script>
