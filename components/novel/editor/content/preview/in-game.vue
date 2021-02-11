<template>
  <div
    :class='[
      "e-content-preview-in-game",
      grabbing ? "grabbing" : undefined
    ]'
    :style='getCustomCSSOptions("content")'
    @mousemove='onMouseMove'
    @mousedown='onMouseDown'
    @mouseup='onMouseUp'
    v-if='viewId'
  >
    <div class='content'>
      {{ dataSource }}
    </div>
    <div
      class='background'
      :style='getCustomCSSOptions("bg")'
    />
  </div>
</template>

<style lang='less' scoped>
.e-content-preview-in-game {
  position: absolute;
  color: #FFF;
  background-color: #000;
  overflow: hidden;
  cursor: grab;
  &.grabbing {cursor: grabbing}
  > .content {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  > .background {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>

<script>
import NovelCommon from '@/mixins/novel/common'

export default {
  name: 'NovelEditorContentPreviewInGame',
  mixins: [NovelCommon],
  props: {
    viewId: {
      type: Number,
      default: null
    },
    w: {
      type: Number,
      default: null
    },
    h: {
      type: Number,
      default: null
    },
    zoom: {
      type: Number,
      default: null
    },
    pureDataSource: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dataSource: [],
      backgroundInfo: {},
      grabbing: false
    }
  },
  watch: {
    async pureDataSource() {
      this.dataSource = this.pureDataSource
      const bgData = this.getBackgroundData.column
      this.backgroundInfo = {
        imageUrl: !!bgData.bg
          ? await this.getBackgroundImageUrl(bgData.bg.id)
          : undefined,
        size: !!bgData.bg
          ? this.getBackgroundSize(bgData.bg.sizeType, bgData.bg.sizeW, bgData.bg.sizeH)
          : undefined,
        repeat: !!bgData.bg
          ? bgData.bg.repeatType
          : undefined,
        pos: !!bgData.bg
          ? this.getBackgroundPosition(bgData.bg.pos)
          : undefined,
        zoom: !!bgData.bg
          ? bgData.bg.zoom
          : undefined,
        radius: !!bgData.bg
          ? bgData.bg.radius
          : undefined,
        rotate: !!bgData.bg
          ? this.getBackgroundRotate(bgData.bg.rotate)
          : undefined,
        opacity: !!bgData.bg
          ? (bgData.bg.opacity / 100).toFixed(2)
          : undefined,
        w: !!bgData.bg
          ? bgData.bg.w
          : undefined,
        h: !!bgData.bg
          ? bgData.bg.h
          : undefined,
        x: !!bgData.bg
          ? bgData.bg.x
          : undefined,
        y: !!bgData.bg
          ? bgData.bg.y
          : undefined,
        z: !!bgData.bg
          ? bgData.bg.z
          : undefined,
        filter: !!bgData.bg
          ? this.getBackgroundFilter(bgData.bg)
          : undefined
      }
    }
  },
  computed: {
    getScriptData() {

    },
    getBackgroundData() {
      return this.dataSource
        .find(item => item.type === 'bg')
    }
  },
  methods: {
    getCustomCSSOptions(part) {
      const data = {
        content: {
          width: `${this.w}px`,
          height: `${this.h}px`,
          zoom: this.zoom
        },
        bg: {
          width: `${this.backgroundInfo.w || this.w}px`,
          height: `${this.backgroundInfo.h || this.h}px`,
          left: `${this.backgroundInfo.x || 0}px`,
          top: `${this.backgroundInfo.y || 0}px`,
          borderRadius: `${this.backgroundInfo.radius}px`,
          backgroundImage: this.backgroundInfo.imageUrl,
          backgroundSize: this.backgroundInfo.size,
          backgroundRepeat: this.backgroundInfo.repeat,
          backgroundPosition: this.backgroundInfo.pos,
          transform: this.backgroundInfo.rotate,
          filter: this.backgroundInfo.filter,
          opacity: this.backgroundInfo.opacity,
          zoom: this.backgroundInfo.zoom,
          zIndex: `${this.backgroundInfo.z || 0}`
        }
      }
      return data[part] || undefined
    },
    onMouseMove(event) {
      const realX = Math.floor(event.offsetX / this.zoom)
      const realY = Math.floor(event.offsetY / this.zoom)
      this.$eventBus.$emit('cs.getPos', realX, realY)
    },
    onMouseDown() {
      this.grabbing = true
    },
    onMouseUp() {
      this.grabbing = false
    }
  }
}
</script>
