<template>
  <div
    class='backdrop'
    @click.self='close'
    v-if='visible'
  >
    <drag-it-dude :style='{left: `${x}px`, top: `${y}px`}'>
      <div
        ref='dialog'
        class='dialog'
        :style='{width: `${w}px`}'
      >
        <div class='header'>
          <font-awesome-icon :icon='icon' v-if='icon'/>
          {{ header }}
          <div class='close' @click='close'>
            <font-awesome-icon icon='times'/>
          </div>
        </div>
        <div class='content'>
          <slot v-if='!message'/>
          {{ message }}
        </div>
        <div class='footer'>
          <b-button squared variant='primary' size='sm' @click.prevent='submit'>응!</b-button>
          <b-button squared variant='dark' size='sm' @click='close'>아니...</b-button>
        </div>
      </div>
    </drag-it-dude>
  </div>
</template>

<script>
import DragItDude from 'vue-drag-it-dude'

export default {
  name: 'Dialog',
  components: {DragItDude},
  data() {
    return {
      header: null,
      icon: null,
      message: null,
      doEvent: null,
      w: 300,
      x: 0,
      y: 0,
      saveX: 0,
      saveY: 0,
      visible: false
    }
  },
  mounted() {
    window.addEventListener('keydown', event => {
      if (event.keyCode === 27)
        this.close()
    })
  },
  methods: {
    async show({header, icon, message, doEvent}) {
      this.header = header || '알림'
      this.icon = icon
      this.message = message
      this.doEvent = doEvent
      this.visible = true
      await this.$nextTick()
      const ch = this.$refs.dialog.clientHeight
      this.x = (window.innerWidth / 2) - (this.w / 2)
      this.y = (window.innerHeight / 2) - (ch / 2)
    },
    submit() {
      if (!!this.doEvent)
        this.$eventBus.$emit(this.doEvent)
      this.visible = false
    },
    close() {
      this.visible = false
    }
  }
}
</script>
