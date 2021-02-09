<template>
  <div class='e-sidebar-script-edit custom-scroll-box'>
    <novel-editor-sidebar-script-edit-template-script
      :rowId='rowId'
      :type='type'
      :pureData='data'
      v-if='type === "script"'
    />
    <novel-editor-sidebar-script-edit-template-bg
      :rowId='rowId'
      :type='type'
      :pureData='data'
      v-if='type === "bg"'
    />
    <novel-editor-sidebar-script-edit-template-js
      :rowId='rowId'
      :type='type'
      :pureData='data'
      v-if='type === "js"'
    />
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-hover: #5F5476;
@font-color: #EDE3EB;

.e-sidebar-script-edit {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: calc(100vh - 189px - 56px);
  padding: .5rem;
  color: @font-color;
  font-size: 13px;
  border: 1px solid @primary;
  border-bottom: 0;
  background: #333;
}
</style>

<script>
import NovelEditorSidebarScriptEditTemplateScript from '@/components/novel/editor/sidebar/script-edit/template/script'
import NovelEditorSidebarScriptEditTemplateBg from '@/components/novel/editor/sidebar/script-edit/template/bg'
import NovelEditorSidebarScriptEditTemplateJs from '@/components/novel/editor/sidebar/script-edit/template/js'

const EVENT_BUS_PREFIX = 'se'

export default {
  name: 'NovelEditorSidebarScriptEdit',
  components: {
    NovelEditorSidebarScriptEditTemplateScript,
    NovelEditorSidebarScriptEditTemplateBg,
    NovelEditorSidebarScriptEditTemplateJs
  },
  data() {
    return {
      rowId: 0,
      type: null,
      data: []
    }
  },
  created() {
    const p = `${EVENT_BUS_PREFIX}.`
    this.$eventBus.$on(`${p}openSidebar`, (rowId, type, data) => this.openSidebar(rowId, type, data))
  },
  beforeDestroy() {
    const p = `${EVENT_BUS_PREFIX}.`
    this.$eventBus.$off(`${p}openSidebar`)
  },
  methods: {
    openSidebar(rowId, type, data) {
      this.rowId = rowId
      this.type = type
      this.data = data
      this.$forceUpdate()
    }
  }
}
</script>
