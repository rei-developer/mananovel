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
import {getBGPos} from '@/util/common'

import {CDN_HOST} from '@/data/config.json'

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
        pos: !!bgData.bg
          ? bgData.bg.pos
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
          backgroundImage: this.backgroundInfo.imageUrl,
          backgroundPosition: getBGPos(this.backgroundInfo.pos),
          left: `${this.backgroundInfo.x || 0}px`,
          top: `${this.backgroundInfo.y || 0}px`,
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
