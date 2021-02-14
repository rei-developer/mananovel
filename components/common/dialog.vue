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

<style lang='less' scoped>
@primary: #A5CFFF;
@primary-hover: #5F5476;
@font-color: #EDE3EB;

.backdrop {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .6);
  z-index: 1000;
}

.drag-it-dude {
  position: fixed;
  > .dialog {
    min-height: 100px;
    font-size: 13px;
    border: 1px solid #000;
    background: #FFF;
    box-shadow: 1px 0 10px rgba(0, 0, 0, .1);
    cursor: move;
    animation: fadein 1s;
    -moz-animation: fadein 1s;
    -webkit-animation: fadein 1s;
    -o-animation: fadein 1s;
    > .header {
      height: 25px;
      line-height: 21px;
      padding: 0 .5rem;
      color: #FFF;
      background: @primary;
      > .close {
        padding-top: 3px;
        color: #FFF;
        font-size: 18px;
        cursor: pointer;
      }
    }
    > .content {
      padding: .5rem;
      word-break: break-all;
    }
    > .footer {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      padding: 0 0.5rem 0.5rem;
      > button {margin-left: 5px}
    }
  }
}
</style>

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
    window.addEventListener('keydown', e => {
      if (e.keyCode === 27)
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
