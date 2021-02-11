<template>
  <div class='e-section-body'>
    <div
      :class='[
        "item",
        "accordion",
        isVisibleBookmark ? undefined : "hide"
      ]'
    >
      <div
        class='label'
        @click.self='onClickBookmarkVisible'
      >
        책갈피
        <font-awesome-icon :icon='isVisibleBookmark ? "chevron-up" : "chevron-down"'/>
      </div>
      <div class='content'>
        <e-input
          v-model='bookmark'
          placeholder='책갈피 이름'
          :maxlength='20'
          display
        />
      </div>
    </div>
    <div class='item'>
      <div class='label'>
        이름
        <div class='right'>
          <e-button
            size='sm'
            @click='onClickVariable("name", true)'
            beep
          >
            변수
          </e-button>
        </div>
      </div>
      <e-input
        v-model='name'
        placeholder='액터 이름'
        :maxlength='20'
        display
      />
    </div>
    <div class='item'>
      <div class='label'>
        대사
        <div class='right'>
          <e-button
            size='sm'
            @click='onClickVariable("text")'
            beep
          >
            변수
          </e-button>
          <e-button
            size='sm'
            icon='tint'
            @click='onClickAddColor("text")'
            beep
          >
            색깔 넣기
          </e-button>
          <e-input type='color' v-model='color'/>
        </div>
      </div>
      <e-textarea
        ref='textarea'
        class='custom-scroll-box'
        v-model='text'
        placeholder='이곳에 대사를 입력하세요...'
        :rows='4'
        autofocus
      />
    </div>
    <div
      :class='[
        "item",
        "accordion",
        isVisibleChoice ? undefined : "hide"
      ]'
    >
      <div
        class='label'
        @click.self='onClickChoiceVisible'
      >
        선택지
        <font-awesome-icon :icon='isVisibleChoice ? "chevron-up" : "chevron-down"'/>
        <div
          class='right'
          @click.self='onClickChoiceVisible'
        >
          <e-button
            size='sm'
            @click='onClickVariable("name", true)'
            beep
          >
            변수
          </e-button>
        </div>
      </div>
      <div class='content'>
        <e-input
          v-model='name'
          placeholder='선택지 1'
          :maxlength='20'
          display
        />
      </div>
    </div>
    <hr/>
    <b-form-checkbox
      v-model='isApplyAllVisibleColumns'
      value='accepted'
      switch
    >
      활성화된 모든 씬에 동일하게 적용
    </b-form-checkbox>
    <div class='e-button-group right'>
      <e-button
        icon='save'
        @click='onClickSave'
        beep
      >
        적용
      </e-button>
    </div>
    {{ enc }}
    {{ dec }}
  </div>
</template>

<style lang='less' scoped>

</style>

<script>
import EInput from '@/components/novel/editor/common/input'
import ETextarea from '@/components/novel/editor/common/textarea'
import EButton from '@/components/novel/editor/common/button'

import {CUSTOM_SECRET_KEY} from '@/data/config.json'

export default {
  name: 'NovelEditorSidebarScriptEditTemplateScript',
  components: {
    EInput,
    ETextarea,
    EButton
  },
  props: {
    rowId: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: null
    },
    pureData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      data: this.pureData,
      bookmark: !!this.pureData.script
        ? this.pureData.script.bookmark
        : '',
      name: !!this.pureData.script
        ? this.pureData.script.name
        : '',
      text: !!this.pureData.script
        ? this.pureData.script.text
        : '',
      color: '#000',
      isVisibleBookmark: false,
      isVisibleChoice: false,
      isApplyAllVisibleColumns: false,

      enc: null,
      dec: null
    }
  },
  watch: {
    pureData() {
      this.data = this.pureData
      this.bookmark = !!this.pureData.script
        ? this.pureData.script.bookmark
        : ''
      this.name = !!this.pureData.script
        ? this.pureData.script.name
        : ''
      this.text = !!this.pureData.script
        ? this.pureData.script.text
        : ''
      this.color = '#000'
      this.isApplyAllVisibleColumns = false
      this.$refs.textarea.focus()
    }
  },
  computed: {
    isAllEmpty() {
      return (
        !this.bookmark &&
        !this.name &&
        !this.text
      )
    }
  },
  methods: {
    onClickBookmarkVisible() {
      this.isVisibleBookmark = !this.isVisibleBookmark
    },
    onClickChoiceVisible() {
      this.isVisibleChoice = !this.isVisibleChoice
    },
    onClickVariable(target, replace = false) {
      const content = '{{변수 이름}}'
      this[target] = replace
        ? this[target] = content
        : this[target]?.concat(content)
    },
    onClickAddColor(target) {
      this[target] = this[target]?.concat(`[c=${this.color}]내용[/c]`)
    },
    onClickSave() {
      if (this.isAllEmpty) {
        delete this.data.script
      } else {
        this.data.script = {}
        if (this.bookmark)
          this.data.script.bookmark = this.bookmark
        if (this.name)
          this.data.script.name = this.name
        if (this.text)
          this.data.script.text = this.text
      }
      this.$eventBus.$emit('sb.update', this.rowId, this.data.id, this.data, this.isApplyAllVisibleColumns)
      this.$forceUpdate()

      console.log(
        JSON.stringify(this.data).length
      )

      this.enc = this.CryptoJS.AES.encrypt(JSON.stringify(this.data), CUSTOM_SECRET_KEY).toString()

      console.log(
        this.enc.length
      )

      this.dec = JSON.parse(this.CryptoJS.AES.decrypt(this.enc, CUSTOM_SECRET_KEY).toString(this.CryptoJS.enc.Utf8))

      console.log(
        this.CryptoJS.AES.decrypt(this.enc, CUSTOM_SECRET_KEY).toString(this.CryptoJS.enc.Utf8).length
      )
    }
  }
}
</script>
