<template>
  <div class='e-sidebar-script-edit-template-script'>
    <div class='item'>
      <div class='label'>대사 편집</div>
      <textarea
        class='custom-scroll-box'
        v-model='text'
        placeholder='이곳에 대사를 입력하세요'
        :rows='4'
        autofocus
      />
    </div>
    <b-button
      @click='onClickSave'
    >
      저장
    </b-button>
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
      margin: 0 0 5px;
      font-size: 13px;
      border-bottom: 1px solid rgba(255, 255, 255, .2);
    }
    > textarea {
      width: 100%;
      color: #FFF;
      border: 1px solid @primary;
      background: transparent;
      outline: none;
    }
  }
}
</style>

<script>
export default {
  name: 'NovelEditorSidebarScriptEditTemplateScript',
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
        : null
    }
  },
  watch: {
    pureData() {
      this.data = this.pureData
      this.text = !!this.pureData.script
        ? this.pureData.script.text
        : null
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
      this.$forceUpdate()
      this.$eventBus.$emit('sb.update', this.rowId, this.data)
    }
  }
}
</script>
