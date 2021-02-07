<template>
  <div class='e-sidebar-script-edit-template-script'>
    <div class='item'>
      <div class='label'>대사 편집</div>
      <textarea
        ref='text'
        class='custom-scroll-box'
        v-model='text'
        placeholder='이곳에 대사를 입력하세요'
        :rows='4'
        autofocus
      />
    </div>
    <hr/>
    <b-form-checkbox
      v-model='isAllApplyWithVisible'
      value='accepted'
      switch
    >
      활성화된 모든 컬럼에 동일하게 적용
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
    {{ data }}
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-hover: #5F5476;
@font-color: #EDE3EB;

.e-sidebar-script-edit-template-script {
  > .item {
    &:not(:last-child) {margin-bottom: .5rem}
    > .label {
      height: 24px;
      margin: -5px 0 5px;
      font-size: 13px;
      border-bottom: 1px solid rgba(255, 255, 255, .2);
    }
    > textarea {
      width: 100%;
      min-height: 82px;
      color: #FFF;
      border: 1px solid @primary;
      background: transparent;
      outline: none;
      &:focus {border-style: dashed}
    }
  }
  > hr {
    margin: 0 0 5px;
    border-top: 1px solid rgba(255, 255, 255, .2);
  }
}
</style>

<script>
import EButton from '@/components/novel/editor/common/button'

export default {
  name: 'NovelEditorSidebarScriptEditTemplateScript',
  components: {EButton},
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
      text: !!this.pureData.script
        ? this.pureData.script.text
        : null,
      isAllApplyWithVisible: false
    }
  },
  watch: {
    pureData() {
      this.data = this.pureData
      this.text = !!this.pureData.script
        ? this.pureData.script.text
        : null
      this.$refs.text.focus()
    }
  },
  computed: {
    isAllEmpty() {
      return (
        !this.text
      )
    }
  },
  methods: {
    onClickSave() {
      if (this.isAllEmpty) {
        delete this.data.script
      } else {
        this.data.script = {}
        this.data.script.text = this.text
      }
      this.$eventBus.$emit('sb.update', this.rowId, this.data.id, this.data, this.isAllApplyWithVisible)
      this.$forceUpdate()
    }
  }
}
</script>
