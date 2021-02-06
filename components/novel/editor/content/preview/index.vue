<template>
  <div class='e-content-preview'>
    <div :style='{zoom}'>
      테스트입니다트입니다트입니다트입니다트입니다트입니다트입니다트입니다트입니다트입니다트입니다트입니다트입니다트입니다트입니다트입니다
    </div>
  </div>
</template>

<style lang='less' scoped>
.e-content-preview {}
</style>

<script>
import DragItDude from 'vue-drag-it-dude'

export default {
  name: 'NovelEditorContentPreview',
  // components: {DragItDude},
  data() {
    return {
      zoom: 1
    }
  },
  methods: {
    setZoom(value) {
      this.zoom = value
    }
  }
}
</script>
