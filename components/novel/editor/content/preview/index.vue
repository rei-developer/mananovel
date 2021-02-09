<template>
  <div class='e-content-preview'>
    <div
      id='content-wrapper'
      class='content-wrapper'
    >
      <drag-it-dude :style='{left: `${x}px`, top: `${y}px`}'>
        <novel-editor-content-preview-in-game
          :viewId='viewId'
          :w='w'
          :h='h'
          :zoom='zoom'
          :pureDataSource='dataSource'
        />
      </drag-it-dude>
    </div>
    <div class='background1'/>
    <div class='background2'/>
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-focus: #5F5476;

.e-content-preview {
  position: relative;
  > .content-wrapper {
    > .drag-it-dude {
      > .content-box {
        width: 375px;
        height: 812px;
        color: #FFF;
        background: #000;
        cursor: move;
      }
    }
  }
  > .content-wrapper,
  > .background1,
  > .background2 {
    width: 500%;
    height: 500%;
    position: absolute;
  }
  > .background1 {
    background-image: linear-gradient(90deg, #cdcccc 0px, #cdcccc 1px, transparent 1px, transparent 99px, transparent 100px),
    linear-gradient(#cdcccc 0px, #cdcccc 1px, transparent 1px, transparent 99px, transparent 100px),
    linear-gradient(#e0e0e0 0px, #e0e0e0 1px, transparent 1px, transparent 99px, transparent 100px),
    linear-gradient(90deg, #e0e0e0 0px, #e0e0e0 1px, transparent 1px, transparent 99px, transparent 100px),
    linear-gradient(transparent 0px, transparent 5px, #f6f6f6 5px, #f6f6f6 95px, transparent 95px, transparent 100px),
    linear-gradient(90deg, #e0e0e0 0px, #e0e0e0 1px, transparent 1px, transparent 99px, #e0e0e0 99px, #e0e0e0 100px),
    linear-gradient(90deg, transparent 0px, transparent 5px, #f6f6f6 5px, #f6f6f6 95px, transparent 95px, transparent 100px),
    linear-gradient(transparent 0px, transparent 1px, #f6f6f6 1px, #f6f6f6 99px, transparent 99px, transparent 100px),
    linear-gradient(#cdcccc, #cdcccc);
    background-size: 100px 100%, 100% 100px, 100% 10px, 10px 100%, 100% 100px, 100px 100%, 100px 100%, 100px 100px, 100px 100px;
  }
  > .background2 {
    background-image: url('/background-min.png');
    filter: grayscale(100%);
    opacity: .2;
  }
}
</style>

<script>
import DragItDude from 'vue-drag-it-dude'
import NovelEditorContentPreviewInGame from '@/components/novel/editor/content/preview/in-game'
import {CDN_HOST} from '~/data/config.json'

const EVENT_BUS_PREFIX = 'cp'

export default {
  name: 'NovelEditorContentPreview',
  components: {
    DragItDude,
    NovelEditorContentPreviewInGame
  },
  data() {
    return {
      x: 0,
      y: 0,
      w: 375,
      h: 812,
      zoom: 1,
      viewId: 0,
      dataSource: []
    }
  },
  created() {
    const p = `${EVENT_BUS_PREFIX}.`
    const onEventBusList = [
      ['setData', (id, data) => this.setData(id, data)]
    ]
    onEventBusList.map(item => this.$eventBus.$on(`${p}${item[0]}`, item[1]))
  },
  mounted() {
    const contentWrapper = document.getElementById('content-wrapper')
    const contentPreviewWrapper = document.getElementById('content-preview-wrapper')
    const {width, height} = contentWrapper.getBoundingClientRect()
    this.x = (width / 2) - (this.w / 2)
    this.y = (height / 2) - (this.h / 2)
    contentPreviewWrapper.scrollLeft = this.x
    contentPreviewWrapper.scrollTop = this.y + 1
  },
  beforeDestroy() {
    const p = `${EVENT_BUS_PREFIX}.`
    const offEventBusList = ['setData']
    offEventBusList.map(item => this.$eventBus.$off(`${p}${item}`))
  },
  methods: {
    setZoom(value) {
      this.zoom = value
    },
    setData(id, data) {
      this.viewId = id
      this.dataSource = JSON.parse(JSON.stringify(data))
        .map(item => {
          if (!!item.columns) {
            item.column = item.columns
              .filter(i => i.id === this.viewId)[0]
            delete item.columns
          }
          return item
        })
    }
  }
}
</script>
