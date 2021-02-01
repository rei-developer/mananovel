<template>
  <div class='content' :style='getCustomCSSOptions("content")'>
    <div class='actor' v-if='actor'>
      <img :src='getActorImageUrl' alt='ACTOR_IMAGE'/>
    </div>
    <div class='select' v-if='selectList.length > 0'>
      <ul>
        <li
          v-for='(item, index) in selectList'
          :key='index'
          @click='onChoiceClick(item.id)'
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
    <div
      class='message-box'
      @click='onNextClick'
      v-if='text'
    >
      <div class='name'>{{ getFilteredName }}</div>
      <p v-html='text'/>
    </div>
  </div>
</template>

<style lang='less' scoped>
@primary: #5F5476;
@primary-hover: #EDE3EB;
@font-color: #EDA7B2;

.content {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #000;
  background-size: cover;
  word-break: break-all;
  overflow: hidden;

  > .actor {
    position: absolute;
    right: -12.5rem;
    bottom: -12.5rem;
    width: 200%;
    height: auto;
    animation: fadein 2s;
    -moz-animation: fadein 2s;
    -webkit-animation: fadein 2s;
    -o-animation: fadein 2s;
  }

  > .select {
    width: calc(100% - 3rem);
    position: absolute;
    left: 1.5rem;
    top: 11rem;
    > ul {
      margin: 0;
      padding: 0;
      list-style: none;
      > li {
        margin-bottom: .25rem;
        padding: .2rem .5rem .35rem;
        color: #FFF;
        text-align: center;
        text-shadow: 1px 1px #000;
        border: 1px solid @font-color;
        background: rgba(0, 0, 0, .6);
        &:hover {
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
  }

  > .message-box {
    width: calc(100% - 1rem);
    height: 94px;
    padding: 3px .5rem 0;
    position: absolute;
    left: .5rem;
    bottom: .5rem;
    color: #FFF;
    text-shadow: 1px 1px #000;
    border: 1px solid @font-color;
    background: rgba(0, 0, 0, .6);
    cursor: pointer;
    > .name {
      color: @font-color;
      font-size: 16px;
      font-weight: bold;
    }
    > p {margin: 0}
  }
}
</style>

<script>
import {CDN_HOST} from '@/data/config.json'

let timer = null

export default {
  name: 'NovelGameContent',
  props: {
    novelId: {
      type: Number,
      default: null
    },
    novelVer: {
      type: Number,
      default: null
    },
    token: {
      type: String,
      default: null
    },
    isDebug: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      script: {},
      actor: {},
      background: {},
      selectList: [],
      text: null,
      loading: false
    }
  },
  mounted() {
    this.fetch()
  },
  computed: {
    getActorImageUrl() {
      return this.actor.imageUrl
        ? `${CDN_HOST}/novel/img/actor/${this.actor.imageUrl}`
        : undefined
    },
    getFilteredName() {
      let name = this.script.customName || this.actor?.name
      switch (name) {
        case '[USERNAME]':
          name = this.$store.state.user.nickname || '이름 없음'
          break
      }
      return name
    }
  },
  methods: {
    async fetch(type = 'READY', pageId = 0, scriptIdOrSortNo = 0, selectId = 0) {
      const {
        status,
        message,
        script,
        actor,
        background,
        bgm,
        bgs,
        sound,
        selectList
      } = await this.$axios.$post(
        `/api/v1/novel/game/script/${this.novelId}/${this.novelVer}`,
        {type, pageId, scriptIdOrSortNo, selectId},
        {headers: {'x-access-token': this.token}}
      )
      if (status === 'FAIL')
        return this.$toast(message)
      this.script = script
      this.actor = actor
      this.background = background
      bgm
        ? this.$eventBus.$emit('playBGM', bgm.audioUrl)
        : this.$eventBus.$emit('stopBGM')
      bgs
        ? this.$eventBus.$emit('playBGS', bgs.audioUrl)
        : this.$eventBus.$emit('stopBGS')
      if (sound)
        this.$eventBus.$emit('playSound', sound.audioUrl)
      this.selectList = selectList || []
      this.printText()
    },
    printText(line = 0) {
      if (!this.script.text)
        return
      const textList = this.script.text.split('\n')
      if (textList.length <= line)
        return this.loading = false
      this.loading = true
      const text = textList[line]
      for (let i = 0; i <= text.length; i++)
        timer = setTimeout(() => {
          const prefix = textList
            .filter((item, index) => index < line)
          const script = [text.substr(0, i)]
          this.text = prefix
            .concat(script)
            .join('<br>')
          if (i === text.length)
            return this.printText(++line)
        }, i * 30)
    },
    getCustomCSSOptions(part) {
      const data = {
        content: {
          backgroundImage: this.background.imageUrl
            ? `url(${CDN_HOST}/novel/img/background/${this.background.imageUrl})`
            : undefined
        }
      }
      return data[part] || undefined
    },
    onChoiceClick(id) {
      if (this.loading || this.selectList.length < 1)
        return
      this.fetch('CHOICE', this.script.novelPageId, this.script.id, id)
    },
    onNextClick() {
      if (this.loading || this.selectList.length > 0)
        return
      this.fetch('NEXT', this.script.novelPageId, this.script.sortNo)
    }
  }
}
</script>
