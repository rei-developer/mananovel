<template>
  <div class='e-content-top'>
    <div class='zoom'>
      <label>
        확대
        <input type='number' step='0.1' min='0.1' max='10' v-model='zoom'/>
      </label>
    </div>
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-focus: #5F5476;

.e-content-top {
  display: flex;
  height: 24px;
  font-size: 13px;
  border: 1px solid @primary;
  border-right: 0;
  background-color: #333;
  > .zoom {
    border-right: 1px solid @primary;
    > label {
      width: 80px;
      height: 21px;
      line-height: 19px;
      padding-left: 4px;
      color: #FFF;
      > input {
        width: 45px;
        margin-left: 4px;
        color: #FFF;
        text-align: right;
        border: 0;
        border-left: 1px dashed @primary;
        background: transparent;
        outline: none;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          margin: 0;
          -webkit-appearance: none;
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: 'NovelEditorContentTop',
  data() {
    return {
      zoom: 1
    }
  },
  watch: {
    zoom() {
      this.$eventBus.$emit('c.zoom', this.zoom)
    }
  },
  mounted() {
    window.addEventListener('mousewheel', this.onMouseWheel, {passive: false})
    window.addEventListener('DOMMouseScroll', this.onMouseWheel, false)
  },
  methods: {
    onMouseWheel(event) {
      event.preventDefault()
      if (!event.ctrlKey)
        return
      const zoom = event.deltaY > 0
        ? this.zoom - 0.1
        : this.zoom + 0.1
      if (zoom < 0.1 || zoom > 10)
        return
      this.zoom = Number((zoom).toFixed(1))
      this.$eventBus.$emit('c.zoom', this.zoom)
    }
  }
}
</script>
