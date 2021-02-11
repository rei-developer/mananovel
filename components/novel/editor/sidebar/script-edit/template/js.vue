<template>
  <div class='e-section-body'>
    <div class='title'>
      <font-awesome-icon :icon="['fab', 'js']"/>
      자바스크립트 설정
    </div>
    <div class='item'>
      <div class='label'>
        코드 편집
        <div class='right'>
          <e-button
            size='sm'
            @click='onClickHelp'
            beep
          >
            <font-awesome-icon icon='question-circle'/>
            도움말
          </e-button>
        </div>
      </div>
      <div class='content'>
        <code-editor
          ref='codeEditor'
          @change='onChange'
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
                icon='bug'
                @click='onClickDebug'
                beep
              >
                디버그
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
  </div>
</template>

<script>
import CodeEditor from '@/components/common/code-editor'
import EInput from '@/components/novel/editor/common/input'
import ETextarea from '@/components/novel/editor/common/textarea'
import EButton from '@/components/novel/editor/common/button'
import NovelEditorConsole from '@/mixins/novel/editor/console'

const defaultCode = `debug("Hello, world!")\n// clear()`

export default {
  name: 'NovelEditorSidebarScriptEditTemplateJs',
  components: {
    CodeEditor,
    EInput,
    ETextarea,
    EButton
  },
  mixins: [NovelEditorConsole],
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
      text: !!this.pureData.js
        ? this.pureData.js.text
        : defaultCode,
      isApplyAllDraggedColumns: false,
      isApplyAllVisibleColumns: false
    }
  },
  watch: {
    pureData() {
      this.data = this.pureData
      this.text = !!this.pureData.js
        ? this.pureData.js.text
        : defaultCode
    },
    text() {
      this.init()
    }
  },
  computed: {
    isAllEmpty() {
      return (
        !this.text
      )
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$refs.codeEditor.setCode(this.text)
    },
    customScript() {
      const debug = args => (this.throwConsole('info', args, false))
      const clear = () => (this.$eventBus.$emit('cs.clear'))
      return {
        main(code) {
          eval(code)
        }
      }
    },
    onChange(text) {
      this.text = text
    },
    onClickHelp() {
      this.throwConsole('help', '마나노벨 질문답변 게시판 이용')
    },
    onClickDebug() {
      try {
        const customScript = this.customScript()
        customScript.main(this.text)
      } catch (error) {
        this.throwConsole('error', error, false)
      }
    },
    onClickSave() {
      if (this.isAllEmpty) {
        delete this.data.js
      } else {
        this.data.js = {}
        if (this.text)
          this.data.js.text = this.text
      }
      this.$eventBus.$emit('sb.update', this.rowId, this.data.id, this.data, this.isApplyAllDraggedColumns, this.isApplyAllVisibleColumns)
      this.$forceUpdate()
    }
  }
}
</script>
