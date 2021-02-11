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
      <!--      {{ isCompleted }}-->
    </div>
    <div
      :class='[
        "background",
        isDebug ? "debug" : undefined
      ]'
      :style='{
        ...getCustomCSSOptions("bcg"),
        boxShadow: `0 0 0 1px ${getDebugColor(backgroundInfo.id)[0]} inset`
      }'
      v-if='isCompleted && backgroundInfo.isVisible'
    >
      <div
        class='label'
        :style='{
          color: getDebugColor(backgroundInfo.id)[1],
          backgroundColor: getDebugColor(backgroundInfo.id)[0]
        }'
      >
        [{{ backgroundInfo.id }}] {{ backgroundInfo.name }}
      </div>
    </div>
    <div
      :class='[
        "standing",
        isDebug ? "debug" : undefined
      ]'
      :style='{
        ...getCustomCSSOptions("scg", index),
        boxShadow: `0 0 0 1px ${getDebugColor(item.id)[0]} inset`
      }'
      v-for='(item, index) in standingInfo'
      :key='index'
      v-if='isCompleted && item.isVisible'
    >
      <div
        class='label'
        :style='{
          color: getDebugColor(item.id)[1],
          backgroundColor: getDebugColor(item.id)[0]
        }'
      >
        [{{ item.id }}] {{ item.name }}
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
    &.debug > .label {visibility: visible}
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
      standingInfo: [],
      grabbing: false,
      isCompleted: false,
      isDebug: true
    }
  },
  watch: {
    async pureDataSource() {
      this.isCompleted = false
      this.dataSource = this.pureDataSource
      const {
        id: bcgId,
        name: bcgName,
        column: bcgData
      } = this.getBackgroundData
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
      this.standingInfo = []
      await Promise.all(this.getStandingData.map(async (item, index) => {
        const {
          id: scgId,
          name: scgName,
          column: scgData
        } = item
        this.standingInfo[index] = {
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
      }))
      this.isCompleted = true
      this.$forceUpdate()
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
        .filter(item => item.type === 'scg')
    }
  },
  methods: {
    getCustomCSSOptions(part, index = 0) {
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
          width: `${this.standingInfo[index]?.w || this.w}px`,
          height: `${this.standingInfo[index]?.h || this.h}px`,
          left: `${this.standingInfo[index]?.x || 0}px`,
          top: `${this.standingInfo[index]?.y || 0}px`,
          borderRadius: `${this.standingInfo[index]?.radius}px`,
          backgroundImage: this.standingInfo[index]?.imageUrl,
          backgroundSize: this.standingInfo[index]?.size,
          backgroundRepeat: this.standingInfo[index]?.repeat,
          backgroundPosition: this.standingInfo[index]?.pos,
          transform: `rotate(${this.standingInfo[index]?.rotate}deg)`,
          filter: this.standingInfo[index]?.filter,
          animationName: `${this.standingInfo[index]?.aniType}`,
          animationDuration: `${this.standingInfo[index]?.aniDur}`,
          animationDelay: `${this.standingInfo[index]?.aniDel}`,
          animationIterationCount: `${this.standingInfo[index]?.aniCnt}`,
          animationDirection: `${this.standingInfo[index]?.aniDir}`,
          animationTimingFunction: `${this.standingInfo[index]?.aniFunc}`,
          opacity: this.standingInfo[index]?.opacity,
          zoom: this.standingInfo[index]?.zoom,
          zIndex: `${this.standingInfo[index]?.z || 0}`
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
