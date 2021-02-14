<template>
  <div class='e-section-body'>
    <div class='title'>
      <font-awesome-icon icon='scroll'/>
      대사 설정
    </div>
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
            @click='onClickVariable("author", true)'
            beep
          >
            변수
          </e-button>
        </div>
      </div>
      <e-input
        v-model='author'
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
            @click='onClickVariable("author", true)'
            beep
          >
            고급 분기
          </e-button>
          <e-button
            size='sm'
            @click='onClickVariable("author", true)'
            beep
          >
            변수
          </e-button>
        </div>
      </div>
      <div class='content'>
        <e-input
          placeholder='선택지 1'
          :maxlength='20'
          display
          block
        />
        <div class='display: flex; width: 100px; height: 5px'/>
        <e-input
          placeholder='이동할 책갈피'
          :maxlength='20'
          display
          block
        />
      </div>
    </div>
    <hr/>
    <div class='item'>
      <div class='content'>
        <div class='rows'>
          <b-form-checkbox
            v-model='isApplyAllDraggedColumns'
            value='accepted'
            switch
          >
            드래그된 씬에 모두 적용
          </b-form-checkbox>
        </div>
        <div class='rows'>
          <div class='cols'>
            <b-form-checkbox
              v-model='isApplyAllVisibleColumns'
              value='accepted'
              switch
            >
              활성화된 씬에 모두 적용
            </b-form-checkbox>
          </div>
          <div class='cols'>
            <div class='e-button-group right'>
              <e-button
                variant='gray'
                icon='minus-square'
                @click='onClickClear'
                beep
              >
                초기화
              </e-button>
              <e-button
                icon='save'
                @click='onClickSave'
                beep
              >
                적용
              </e-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {{ enc }}
    {{ dec }}
  </div>
</template>

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
      author: !!this.pureData.script
        ? this.pureData.script.author
        : '',
      text: !!this.pureData.script
        ? this.pureData.script.text
        : '',
      color: '#000',
      isVisibleBookmark: false,
      isVisibleChoice: false,
      isApplyAllDraggedColumns: false,
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
      this.author = !!this.pureData.script
        ? this.pureData.script.author
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
        !this.author &&
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
    onClickClear() {
      // attrList.map(item => this[item] = undefined)
      delete this.data.script
      this.submit()
    },
    onClickSave() {
      if (this.isAllEmpty) {
        delete this.data.script
      } else {
        this.data.script = {}
        if (this.bookmark)
          this.data.script.bookmark = this.bookmark
        if (this.author)
          this.data.script.author = this.author
        if (this.text)
          this.data.script.text = this.text
      }
      this.submit()
      // this.enc = this.CryptoJS.AES.encrypt(JSON.stringify(this.data), CUSTOM_SECRET_KEY).toString()
      // this.dec = JSON.parse(this.CryptoJS.AES.decrypt(this.enc, CUSTOM_SECRET_KEY).toString(this.CryptoJS.enc.Utf8))
    },
    submit() {
      this.$eventBus.$emit('sb.update', this.rowId, this.data.id, this.data, this.isApplyAllDraggedColumns, this.isApplyAllVisibleColumns)
      this.$forceUpdate()
    }
  }
}
</script>
