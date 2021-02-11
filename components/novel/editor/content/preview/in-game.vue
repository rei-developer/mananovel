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
      <!--      {{ dataSource }}-->
    </div>
    <div
      :class='[
        "background",
        isDebug ? "debug" : undefined
      ]'
      :style='getCustomCSSOptions("bcg")'
      v-if='backgroundInfo.isVisible'
    >
      <div class='label'>
        [{{ backgroundInfo.id }}] {{ backgroundInfo.name }}
      </div>
    </div>
    <div
      :class='[
        "standing",
        isDebug ? "debug" : undefined
      ]'
      :style='getCustomCSSOptions("scg")'
      v-if='standingInfo.isVisible'
    >
      <div class='label'>
        [{{ standingInfo.id }}] {{ standingInfo.name }}
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;

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
  > .background,
  > .standing {
    position: absolute;
    top: 0;
    left: 0;
    > .label {visibility: hidden}
    &.debug {
      box-shadow: 0 0 0 1px @primary inset;
      > .label {visibility: visible}
    }
  }
  .debug > .label {
    display: flex;
    padding: 0 2px;
    position: absolute;
    top: 0;
    left: 0;
    color: #333;
    font-size: 11px;
    background-color: @primary;
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
      standingInfo: {},
      grabbing: false,
      isDebug: true
    }
  },
  watch: {
    async pureDataSource() {
      this.dataSource = this.pureDataSource
      const {
        id: bcgId,
        name: bcgName,
        column: bcgData
      } = this.getBackgroundData
      const {
        id: scgId,
        name: scgName,
        column: scgData
      } = this.getStandingData
      this.backgroundInfo = {
        id: bcgId,
        name: bcgName,
        imageUrl: !!bcgData.bcg
          ? await this.getImageUrl('bcg', bcgData.bcg.id, bcgData.bcg.url)
          : undefined,
        size: !!bcgData.bcg
          ? this.getSize(bcgData.bcg.sizeType, bcgData.bcg.sizeW, bcgData.bcg.sizeH)
          : undefined,
        repeat: !!bcgData.bcg
          ? bcgData.bcg.repeatType
          : undefined,
        pos: !!bcgData.bcg
          ? this.getPosition(bcgData.bcg.pos)
          : undefined,
        zoom: !!bcgData.bcg
          ? bcgData.bcg.zoom
          : undefined,
        radius: !!bcgData.bcg
          ? bcgData.bcg.radius
          : undefined,
        rotate: !!bcgData.bcg
          ? bcgData.bcg.rotate
          : undefined,
        opacity: !!bcgData.bcg
          ? (bcgData.bcg.opacity / 100).toFixed(2)
          : undefined,
        w: !!bcgData.bcg
          ? bcgData.bcg.w
          : undefined,
        h: !!bcgData.bcg
          ? bcgData.bcg.h
          : undefined,
        x: !!bcgData.bcg
          ? bcgData.bcg.x
          : undefined,
        y: !!bcgData.bcg
          ? bcgData.bcg.y
          : undefined,
        z: !!bcgData.bcg
          ? bcgData.bcg.z
          : undefined,
        filter: !!bcgData.bcg
          ? this.getFilter(bcgData.bcg)
          : undefined,
        isVisible: !!bcgData.bcg
      }
      this.standingInfo = {
        id: scgId,
        name: scgName,
        imageUrl: !!scgData.scg
          ? await this.getImageUrl('scg', scgData.scg.id, scgData.scg.url)
          : undefined,
        size: !!scgData.scg
          ? this.getSize(scgData.scg.sizeType, scgData.scg.sizeW, scgData.scg.sizeH)
          : undefined,
        repeat: !!scgData.scg
          ? scgData.scg.repeatType
          : undefined,
        pos: !!scgData.scg
          ? this.getPosition(scgData.scg.pos)
          : undefined,
        zoom: !!scgData.scg
          ? scgData.scg.zoom
          : undefined,
        radius: !!scgData.scg
          ? scgData.scg.radius
          : undefined,
        rotate: !!scgData.scg
          ? scgData.scg.rotate
          : undefined,
        opacity: !!scgData.scg
          ? (scgData.scg.opacity / 100).toFixed(2)
          : undefined,
        w: !!scgData.scg
          ? scgData.scg.w
          : undefined,
        h: !!scgData.scg
          ? scgData.scg.h
          : undefined,
        x: !!scgData.scg
          ? scgData.scg.x
          : undefined,
        y: !!scgData.scg
          ? scgData.scg.y
          : undefined,
        z: !!scgData.scg
          ? scgData.scg.z
          : undefined,
        filter: !!scgData.scg
          ? this.getFilter(scgData.scg)
          : undefined,
        aniType: !!scgData.scg
          ? scgData.scg.aniType
          : undefined,
        aniDur: !!scgData.scg
          ? `${scgData.scg.aniDur}s`
          : undefined,
        aniDel: !!scgData.scg
          ? `${scgData.scg.aniDel}s`
          : undefined,
        aniCnt: !!scgData.scg
          ? scgData.scg.aniCnt
          : undefined,
        aniDir: !!scgData.scg
          ? scgData.scg.aniDir
          : undefined,
        aniFunc: !!scgData.scg
          ? scgData.scg.aniFunc
          : undefined,
        isVisible: !!scgData.scg
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
        bcg: {
          width: `${this.backgroundInfo.w || this.w}px`,
          height: `${this.backgroundInfo.h || this.h}px`,
          left: `${this.backgroundInfo.x || 0}px`,
          top: `${this.backgroundInfo.y || 0}px`,
          borderRadius: `${this.backgroundInfo.radius}px`,
          backgroundImage: this.backgroundInfo.imageUrl,
          backgroundSize: this.backgroundInfo.size,
          backgroundRepeat: this.backgroundInfo.repeat,
          backgroundPosition: this.backgroundInfo.pos,
          transform: `rotate(${this.backgroundInfo.rotate}deg)`,
          filter: this.backgroundInfo.filter,
          opacity: this.backgroundInfo.opacity,
          zoom: this.backgroundInfo.zoom,
          zIndex: `${this.backgroundInfo.z || 0}`
        },
        scg: {
          width: `${this.standingInfo.w || this.w}px`,
          height: `${this.standingInfo.h || this.h}px`,
          left: `${this.standingInfo.x || 0}px`,
          top: `${this.standingInfo.y || 0}px`,
          borderRadius: `${this.standingInfo.radius}px`,
          backgroundImage: this.standingInfo.imageUrl,
          backgroundSize: this.standingInfo.size,
          backgroundRepeat: this.standingInfo.repeat,
          backgroundPosition: this.standingInfo.pos,
          transform: `rotate(${this.standingInfo.rotate}deg)`,
          filter: this.standingInfo.filter,
          animationName: `${this.standingInfo.aniType}`,
          animationDuration: `${this.standingInfo.aniDur}`,
          animationDelay: `${this.standingInfo.aniDel}`,
          animationIterationCount: `${this.standingInfo.aniCnt}`,
          animationDirection: `${this.standingInfo.aniDir}`,
          animationTimingFunction: `${this.standingInfo.aniFunc}`,
          opacity: this.standingInfo.opacity,
          zoom: this.standingInfo.zoom,
          zIndex: `${this.standingInfo.z || 0}`
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
