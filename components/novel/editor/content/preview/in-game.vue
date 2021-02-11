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
      const cgData = this.getStandingData.column
      this.backgroundInfo = {
        imageUrl: !!bgData.bcg
          ? await this.getBackgroundImageUrl(bgData.bcg.id, bgData.bcg.url)
          : undefined,
        size: !!bgData.bcg
          ? this.getSize(bgData.bcg.sizeType, bgData.bcg.sizeW, bgData.bcg.sizeH)
          : undefined,
        repeat: !!bgData.bcg
          ? bgData.bcg.repeatType
          : undefined,
        pos: !!bgData.bcg
          ? this.getPosition(bgData.bcg.pos)
          : undefined,
        zoom: !!bgData.bcg
          ? bgData.bcg.zoom
          : undefined,
        radius: !!bgData.bcg
          ? bgData.bcg.radius
          : undefined,
        rotate: !!bgData.bcg
          ? this.getRotate(bgData.bcg.rotate)
          : undefined,
        opacity: !!bgData.bcg
          ? (bgData.bcg.opacity / 100).toFixed(2)
          : undefined,
        w: !!bgData.bcg
          ? bgData.bcg.w
          : undefined,
        h: !!bgData.bcg
          ? bgData.bcg.h
          : undefined,
        x: !!bgData.bcg
          ? bgData.bcg.x
          : undefined,
        y: !!bgData.bcg
          ? bgData.bcg.y
          : undefined,
        z: !!bgData.bcg
          ? bgData.bcg.z
          : undefined,
        filter: !!bgData.bcg
          ? this.getFilter(bgData.bcg)
          : undefined
      }
    }
  },
  computed: {
    getScriptData() {

    },
    getBackgroundData() {
      return this.dataSource
        .find(item => item.type === 'bcg')
    },
    getStandingData() {
      return this.dataSource
        .find(item => item.type === 'scg')
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
