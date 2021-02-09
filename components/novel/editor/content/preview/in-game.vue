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
    {{ getScriptData }}
  </div>
</template>

<style lang='less' scoped>
.e-content-preview-in-game {
  color: #FFF;
  background: #000;
  cursor: grab;
  &.grabbing {cursor: grabbing}
}
</style>

<script>
export default {
  name: 'NovelEditorContentPreviewInGame',
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
      default: () => []
    }
  },
  data() {
    return {
      dataSource: [],
      grabbing: false
    }
  },
  watch: {
    pureDataSource() {
      this.dataSource = this.pureDataSource
    }
  },
  computed: {
    getScriptData() {
      return this.dataSource
        .filter(item => item.type === 'script')
    }
  },
  methods: {
    getCustomCSSOptions(part) {
      const data = {
        content: {
          width: `${this.w}px`,
          height: `${this.h}px`,
          zoom: this.zoom
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
