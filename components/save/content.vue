<template>
  <div>
    <Dialog ref='dialog'/>
    <div class='content-box'>
      <div class='title'>
        <h5>{{ saveContent.title }}</h5>
        <hr>
        <ul>
          <li>
            <font-awesome-icon icon='tag'/>
            {{ saveContent.category }}
          </li>
          <li v-if='saveContent.sub_category'>
            {{ saveContent.sub_category }}
          </li>
          <li>
            <font-awesome-icon icon='clock'/>
            {{
              $moment().format('YYYY.MM.DD') === $moment(saveContent.created).format('YYYY.MM.DD')
                ? $moment(saveContent.created).format('HH:mm')
                : $moment(saveContent.created).format('MM.DD')
            }}
          </li>
          <li>
            <font-awesome-icon icon='eye'/>
            {{ saveContent.hit | numberWithCommas }}
          </li>
        </ul>
      </div>
    </div>
    <div
      class='content-box'
      v-if='saveFileList.length > 0'
    >
      <div
        class='files'
        v-for='(item, index) in saveFileList'
        :key='index'
      >
        <b-button
          squared
          size='sm'
          variant='primary'
          @click='forceFileDownload(item)'
        >
          <font-awesome-icon icon='download'/>
          DOWNLOAD
        </b-button>
        <span>{{ item.name }} ({{ item.size }})</span>
      </div>
    </div>
    <div
      class='content-box'
      v-if='saveMagnetList.length > 0'
    >
      <div
        class='files'
        v-for='(item, index) in saveMagnetList'
        :key='index'
      >
        <b-button
          squared
          size='sm'
          variant='primary'
          @click='forceFileDownload(item, "magnet")'
        >
          <font-awesome-icon icon='magnet'/>
          MAGNET
        </b-button>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div
      class='content-box'
      v-viewer
      v-if='getContent'
    >
      <div
        class='content'
        v-html='getContent'
      />
    </div>
    <div class='bottom-box'>
      <b-button
        squared
        size='sm'
        variant='primary'
        :to='`/save/${saveContent.board}`'
      >
        <font-awesome-icon icon='bars'/>
        목록
      </b-button>
    </div>
  </div>
</template>

<style lang='less' scoped>
@primary-hover: #5F5476;
@font-color: #EDE3EB;
@primary: #EDA7B2;

.content-box {
  margin-bottom: 1rem;
  border-radius: 2px;
  background: #FFF;
  box-shadow: 1px 0 10px rgba(0, 0, 0, .1);
  > .title {
    > h5 {
      margin: 0;
      padding: 10px 15px;
      color: #3b3e43;
      font-size: 18px;
      font-weight: bold;
      letter-spacing: -1px;
    }
    > hr {margin: 0}
    > ul {
      display: flex;
      margin: 0;
      padding: 10px 15px;
      list-style: none;
      > li {
        color: #999;
        font-size: 13px;
        &:not(:last-child) {margin-right: 2rem}
      }
    }
  }
  > .files {
    margin: 0;
    padding: 10px 15px;
    &:not(:last-child) {border-bottom: 1px solid rgba(0, 0, 0, .1)}
    > span {
      margin-left: .5rem;
      font-size: 13px;
    }
  }
  > .content {
    line-height: 1.5;
    margin: 0;
    padding: 10px 15px;
    color: #333;
    font-size: 13px;
    word-break: break-all;
    overflow-wrap: break-word;
  }
}

.bottom-box {
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 1rem;
  > a:not(:last-child),
  > button:not(:last-child) {margin-left: 5px}
}
</style>

<script>
import Dialog from '@/components/common/dialog'
import {numberWithCommas} from '@/util/format'
import 'viewerjs/dist/viewer.css'

export default {
  name: 'BoardContent',
  components: {Dialog},
  filters: {numberWithCommas},
  props: {
    saveContent: {
      type: Object,
      default: null
    },
    saveFileList: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    saveMagnetList: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  computed: {
    getContent() {
      const regex = /\[img[^\]]*src=[\"']?([^\]\"']+)[\"']?[^\]]*\]/mig
      return this.saveContent.content
        .replace(regex, `<img src='https://cdn.mananovel.com$1'>`)
    }
  },
  methods: {
    async forceFileDownload(item, type = 'download') {
      const URL = type === 'download'
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
