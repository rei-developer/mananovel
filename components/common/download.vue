<template>
  <div
    class='backdrop'
    @click.self='close'
    v-if='visible'
  >
    <drag-it-dude :style='{left: `${x}px`, top: `${y}px`}'>
      <div
        ref='download'
        class='dialog'
        :style='{maxWidth: `${w}px`}'
      >
        <div class='header'>
          {{ type === 'download' ? '웹노벨 파일 목록' : '마그넷 목록' }}
          <div class='close' @click='close'>
            <font-awesome-icon icon='times'/>
          </div>
        </div>
        <div class='content'>
          <ul
            v-for='(item, index) in saveFileList'
            :key='index'
          >
            <li class='subject'>
              {{ item.name }}
              <br v-if='type === "magnet"'>
              <em>{{ item.url }}</em>
            </li>
            <li
              class='w80'
              v-if='type === "download"'
            >
              {{ item.size }}
            </li>
            <li
              class='w32'
              v-if='type !== "download"'
            >
              <b-button
                squared
                size='sm'
                variant='primary'
                @click.prevent='copyMagnet(item.url)'
              >
                <font-awesome-icon icon='copy'/>
              </b-button>
            </li>
            <li class='w32'>
              <b-button
                squared
                size='sm'
                :variant='type === "download" ? "primary" : "dark"'
                @click.prevent='forceFileDownload(item)'
              >
                <font-awesome-icon :icon='type'/>
              </b-button>
            </li>
          </ul>
        </div>
        <div class='footer'>
          <b-button squared variant='primary' size='sm' @click='close'>닫기 (ESC)</b-button>
        </div>
      </div>
    </drag-it-dude>
  </div>
</template>

<style lang='less' scoped>
@primary-hover: #5F5476;
@font-color: #EDE3EB;
@primary: #EDA7B2;

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
      background: @primary-hover;
      > .close {
        padding-top: 3px;
        color: #FFF;
        font-size: 18px;
        cursor: pointer;
      }
    }
    > .content {
      max-height: 228px;
      padding: .5rem .5rem 0;
      word-break: break-all;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      overflow-y: scroll;
      > ul {
        display: flex;
        margin: 0;
        padding: 0;
        border-top: 1px solid rgba(0, 0, 0, .1);
        list-style: none;
        > li {
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center;
          padding: .5rem 0;
          color: #333;
          font-size: 13px;
          &.subject {
            justify-content: left;
            > em {
              display: contents;
              color: #666;
            }
          }
          &.w32 {max-width: 32px}
          &.w80 {max-width: 80px}
        }
      }
    }
    > .footer {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      padding: .5rem;
      > button {margin-left: 5px}
    }
  }
}
</style>

<script>
import DragItDude from 'vue-drag-it-dude'

export default {
  name: 'Download',
  components: {DragItDude},
  data() {
    return {
      type: 'download',
      saveFileList: [],
      w: 360,
      x: 0,
      y: 0,
      visible: false
    }
  },
  mounted() {
    document.body.addEventListener('keydown', e => {
      if (e.keyCode === 27)
        this.close()
    })
  },
  methods: {
    async show(type, saveFileList) {
      this.type = type
      this.saveFileList = saveFileList
      this.visible = true
      await this.$nextTick()
      const ch = this.$refs.download.clientHeight
      this.x = (window.innerWidth / 2) - (this.w / 2)
      this.y = (window.innerHeight / 2) - (ch / 2)
    },
    close() {
      this.visible = false
    },
    copyMagnet(url) {
      this.$copyText(url)
      this.$toast.success('마그넷 주소를 복사했습니다')
    },
    async forceFileDownload(item) {
      const URL = this.type === 'download'
        ? `https://cdn.mananovel.com/${item.ext}/${item.uuid}.${item.ext}`
        : item.url
      const LINK = document.createElement('a')
      LINK.href = URL
      LINK.setAttribute('download', item.name)
      document.body.appendChild(LINK)
      LINK.click()
    }
  }
}
</script>
