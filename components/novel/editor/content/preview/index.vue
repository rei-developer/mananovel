<template>
  <div class='e-content-preview'>
    <div class='content-wrapper' :style='{zoom}'>
      <drag-it-dude>
        <div class='content-box'>

        </div>
      </drag-it-dude>
    </div>
    <div class='background'/>
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-focus: #5F5476;

.e-content-preview {
  > .content-wrapper {
    position: relative;
    width: 100%;
    height: 500%;
    .content-box {
      width: 375px;
      height: 812px;
      background: #000;
      cursor: move;
    }
  }
  > .background {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 6rem;
    left: .5rem;
    background-image: url('/background-min.png');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: left top;
    filter: grayscale(100%);
    opacity: .1;
    z-index: -1;
  }
}
</style>

<script>
import DragItDude from 'vue-drag-it-dude'

export default {
  name: 'NovelEditorContentPreview',
  components: {DragItDude},
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
