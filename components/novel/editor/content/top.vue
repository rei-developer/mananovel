<template>
  <div class='e-content-top'>
    <div class='item'>
      <label>
        확대
        <input type='number' step='0.1' min='0.1' max='10' v-model='zoom'/>
      </label>
    </div>
    <div class='item'>
      <div
        class='button'
        @click='onClickPreviewPos'
      >
        <font-awesome-icon icon='bullseye'/>
        추적
      </div>
    </div>
    <div class='item'>
      <div
        class='button'
        @click='onClickDebug'
      >
        <font-awesome-icon icon='bug'/>
        디버그
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
.e-content-top {
  display: flex;
  height: 24px;
  font-size: 13px;
  border: 1px solid var(--primary);
  border-right: 0;
  background-color: #333;
  > .item {
    border-right: 1px solid var(--primary);
    > .button {
      min-width: 22px;
      height: 22px;
      line-height: 20px;
      padding: 0 5px;
      color: var(--primary);
      font-size: 13px;
      &:hover {background-color: rgba(255, 255, 255, .1)}
      &.fixed {opacity: .5}
    }
    > label {
      min-width: 22px;
      height: 22px;
      line-height: 20px;
      padding: 0 5px;
      color: #FFF;
      > input {
        width: 45px;
        margin-left: 4px;
        color: #FFF;
        text-align: right;
        border: 0;
        border-left: 1px dashed var(--primary);
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
      this.zoom = Number(this.zoom)
      this.$eventBus.$emit('c.zoom', this.zoom)
    }
  },
  mounted() {
    window.addEventListener('mousewheel', this.onMouseWheel, {passive: false})
    window.addEventListener('DOMMouseScroll', this.onMouseWheel, false)
  },
  methods: {
    onClickPreviewPos() {
      this.$eventBus.$emit('cp.setPreviewPos')
    },
    onClickDebug() {
      this.$eventBus.$emit('cp.toggleDebug')
    },
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
