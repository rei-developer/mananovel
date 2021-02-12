<template>
  <div
    :class='[
      "e-content-preview-in-game",
      grabbing ? "grabbing" : undefined,
      isDebug ? undefined : "hide"
    ]'
    :style='getCustomCSSOptions("content")'
    @mousemove='onMouseMove'
    @mousedown='onMouseDown'
    @mouseup='onMouseUp'
    v-if='viewId'
  >
    <div class='backdrop' v-if='isDebug'/>
    <vue-snowf
      :class='[
        "particle",
        isDebug ? "debug" : undefined
      ]'
      :amount='particleInfo.amount'
      :size='particleInfo.size'
      :speed='particleInfo.speed'
      :wind='particleInfo.wind'
      :opacity='particleInfo.opacity'
      :swing='particleInfo.swing'
      :image='particleInfo.url'
      :zIndex='particleInfo.z'
      :resize='particleInfo.isResize'
      :color='particleInfo.color'
      v-if='particleInfo && particleInfo.isVisible && !particleInfo.isHidden'
    />
    <div
      :class='[
        "background",
        isDebug ? "debug" : undefined
      ]'
      :style='{
        ...getCustomCSSOptions("bcg"),
        boxShadow: isDebug ? `0 0 0 1px ${getDebugColor(backgroundInfo.id)[0]} inset` : undefined
      }'
      v-if='backgroundInfo && backgroundInfo.isVisible && !backgroundInfo.isHidden'
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
        boxShadow: isDebug ? `0 0 0 1px ${getDebugColor(item.id)[0]} inset` : undefined
      }'
      v-for='(item, index) in standingInfo'
      :key='index'
      v-if='item && item.isVisible && !item.isHidden'
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
    <div
      :class='[
        "script",
        isDebug ? "debug" : undefined
      ]'
      :style='{
        ...getCustomCSSOptions("script"),
        boxShadow: isDebug ? `0 0 0 1px ${getDebugColor(scriptInfo.id)[0]} inset` : undefined
      }'
      v-if='scriptInfo && scriptInfo.isVisible && !scriptInfo.isHidden'
    >
      <div
        class='label'
        :style='{
          color: getDebugColor(scriptInfo.id)[1],
          backgroundColor: getDebugColor(scriptInfo.id)[0]
        }'
      >
        [{{ scriptInfo.id }}] {{ scriptInfo.name }}
      </div>
      <div class='content'>
        <div class='name'>{{ scriptInfo.author }}</div>
        <p v-html='previewText'/>
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
.e-content-preview-in-game {
  position: absolute;
  color: #FFF;
  background-color: #000;
  cursor: grab;
  &.grabbing {cursor: grabbing}
  &.hide {overflow: hidden}
  > .backdrop {
    position: absolute;
    width: inherit;
    height: inherit;
    outline: 1000rem solid rgba(0, 0, 0, .7);
    z-index: 10000;
  }
  > .background,
  > .standing,
  > .particle,
  > .script {
    position: absolute;
    top: 0;
    left: 0;
    > .label {display: none}
    &.debug > .label {display: block}
  }
  > .script {
    width: calc(100% - 1rem);
    min-height: 130px;
    padding: .25rem .5rem;
    position: absolute;
    top: unset;
    left: .5rem;
    bottom: .5rem;
    border: 1px solid #FFF;
    background: rgba(0, 0, 0, .6);
    z-index: 101;
    > .content {
      color: #FFF;
      text-shadow: 1px 1px #000;
      > .name {
        color: var(--primary);
        font-size: 16px;
        font-weight: bold;
      }
      > p {margin: 0}
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
    background-color: var(--primary);
  }
}
</style>

<script>
import NovelCommon from '@/mixins/novel/common'
import {CDN_HOST} from '~/data/config.json'

let timer
let BGM
let BGS

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
    },
    isDebug: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      dataSource: [],
      scriptInfo: {},
      particleInfo: {},
      backgroundInfo: {},
      standingInfo: [],
      previewText: '',
      grabbing: false
    }
  },
  watch: {
    async pureDataSource() {
      this.dataSource = this.pureDataSource
      const {
        id: scriptId,
        name: scriptName,
        column: scriptData,
        isHidden: scriptIsHidden
      } = this.getScriptData
      this.scriptInfo = {
        id: scriptId,
        name: scriptName,
        author: !!scriptData.script
          ? scriptData.script.author
          : undefined,
        text: !!scriptData.script
          ? scriptData.script.text
          : undefined,
        isVisible: !!scriptData.script,
        isHidden: scriptIsHidden
      }
      const {
        id: particleId,
        name: particleName,
        column: particleData,
        isHidden: particleIsHidden
      } = this.getParticleData
      this.particleInfo = {
        id: particleId,
        name: particleName,
        url: !!particleData.particle
          ? particleData.particle.url
          : undefined,
        amount: !!particleData.particle
          ? Number(particleData.particle.amount || 50)
          : undefined,
        size: !!particleData.particle
          ? Number(particleData.particle.size || 5)
          : undefined,
        speed: !!particleData.particle
          ? Number(particleData.particle.speed || 1.5)
          : undefined,
        wind: !!particleData.particle
          ? Number(particleData.particle.wind || 0)
          : undefined,
        color: !!particleData.particle
          ? particleData.particle.color
          : undefined,
        opacity: !!particleData.particle
          ? Number(particleData.particle.opacity || 0.8)
          : undefined,
        swing: !!particleData.particle
          ? Number(particleData.particle.swing || 1)
          : undefined,
        z: !!particleData.particle
          ? Number(particleData.particle.z || 100)
          : undefined,
        isResize: !!particleData.particle
          ? particleData.particle.isResize
          : undefined,
        isVisible: !!particleData.particle,
        isHidden: particleIsHidden
      }
      const {
        id: bcgId,
        name: bcgName,
        column: bcgData,
        isHidden: bcgIsHidden
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
        isVisible: !!bcgData.bcg,
        isHidden: bcgIsHidden
      }
      this.standingInfo = []
      await Promise.all(this.getStandingData.map(async (item, index) => {
        const {
          id: scgId,
          name: scgName,
          column: scgData,
          isHidden: scgIsHidden
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
          isVisible: !!scgData.scg,
          isHidden: scgIsHidden
        }
      }))
      this.$forceUpdate()
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      this.printText()
    }
  },
  mounted() {
    BGM = new Audio()
    BGS = new Audio()
  },
  computed: {
    getScriptData() {
      return this.dataSource
        .find(item => item.type === 'script')
    },
    getParticleData() {
      return this.dataSource
        .find(item => item.type === 'particle')
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
    printText(line = 0) {
      if (!this.scriptInfo.text)
        return this.previewText = ''
      const textList = this.scriptInfo.text.split('\n')
      if (textList.length <= line)
        return
      const text = textList[line]
      for (let i = 0; i <= text.length; i++)
        timer = setTimeout(() => {
          const prefix = textList
            .filter((item, index) => index < line)
          const script = [text.substr(0, i)]
          this.previewText = prefix
            .concat(script)
            .join('<br>')
          if (i === text.length)
            return this.printText(++line)
        }, i * 30)
    },
    playBGM(url) {
      BGM.src = `${CDN_HOST}/novel/audio/bgm/${url}`
      BGM.loop = true
      BGM.play()
    },
    playBGS(url) {
      BGS.src = `${CDN_HOST}/novel/audio/bgm/${url}`
      BGS.loop = true
      BGS.play()
    },
    playSound(url) {
      const sound = new Audio()
      sound.src = `${CDN_HOST}/novel/audio/sound/${url}`
      sound.play()
    },
    stopBGM() {
      BGM.pause()
      BGM = new Audio()
    },
    stopBGS() {
      BGS.pause()
      BGS = new Audio()
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
