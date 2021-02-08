<template>
  <prism-editor
    class='my-editor'
    v-model='code'
    :highlight='highlighter'
    line-numbers
  />
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-hover: #5F5476;

.my-editor {
  padding: 5px;
  color: #FFF;
  font-size: 13px;
  line-height: 1.5;
  border: 1px solid @primary;
  background: #333;
  &:hover {border: 1px dashed @primary}
}
</style>

<script>
// import Prism Editor
import {PrismEditor} from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import {highlight, languages} from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import '@/assets/prism-editor.less' // import syntax highlighting styles

export default {
  name: 'CodeEditor',
  components: {
    PrismEditor
  },
  data: () => ({code: ''}),
  watch: {
    code() {
      this.$emit('change', this.code)
    }
  },
  methods: {
    setCode(code) {
      this.code = code
    },
    highlighter(code) {
      return highlight(code, languages.js) //returns html
    }
  }
}
</script>
