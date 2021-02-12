<template>
  <div class='e-sidebar-script-edit custom-scroll-box'>
    <div
      :is='getComponent'
      :rowId='rowId'
      :type='type'
      :pureData='data'
    />
  </div>
</template>

<style lang='less' scoped>
.e-sidebar-script-edit {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: calc(100vh - 189px - 56px);
  color: #FFF;
  font-size: 13px;
  border: 1px solid var(--primary);
  border-bottom: 0;
  background: #333;
}
</style>

<script>
import NovelEditorSidebarScriptEditTemplateScript from '@/components/novel/editor/sidebar/script-edit/template/script'
import NovelEditorSidebarScriptEditTemplateBcg from '~/components/novel/editor/sidebar/script-edit/template/bcg'
import NovelEditorSidebarScriptEditTemplateScg from '~/components/novel/editor/sidebar/script-edit/template/scg'
import NovelEditorSidebarScriptEditTemplateBgm from '~/components/novel/editor/sidebar/script-edit/template/bgm'
import NovelEditorSidebarScriptEditTemplateJs from '@/components/novel/editor/sidebar/script-edit/template/js'
import NovelEditorSidebarScriptEditTemplateParticle
  from '@/components/novel/editor/sidebar/script-edit/template/particle'

const EVENT_BUS_PREFIX = 'se'

export default {
  name: 'NovelEditorSidebarScriptEdit',
  components: {
    NovelEditorSidebarScriptEditTemplateScript,
    NovelEditorSidebarScriptEditTemplateBcg,
    NovelEditorSidebarScriptEditTemplateScg,
    NovelEditorSidebarScriptEditTemplateBgm,
    NovelEditorSidebarScriptEditTemplateJs,
    NovelEditorSidebarScriptEditTemplateParticle
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
  computed: {
    getComponent() {
      const componentList = [
        {type: 'script', component: NovelEditorSidebarScriptEditTemplateScript},
        {type: 'bcg', component: NovelEditorSidebarScriptEditTemplateBcg},
        {type: 'scg', component: NovelEditorSidebarScriptEditTemplateScg},
        {type: 'bgm', component: NovelEditorSidebarScriptEditTemplateBgm},
        {type: 'js', component: NovelEditorSidebarScriptEditTemplateJs},
        {type: 'particle', component: NovelEditorSidebarScriptEditTemplateParticle}
      ]
      return componentList
        .find(item => item.type === this.type)?.component
    }
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
