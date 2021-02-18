<template>
  <div
    :class='[
      "e-button",
      variant,
      size,
      block ? "block" : undefined
    ]'
    @click='onClick'
  >
    <font-awesome-icon :icon='icon' v-if='icon'/>
    <slot/>
  </div>
</template>

<style lang='less' scoped>
.e-button {
  width: fit-content;
  height: 19px;
  line-height: 18px;
  padding: 0 5px;
  color: #333;
  font-size: 13px;
  cursor: default;
  &.primary {
    background-color: var(--primary);
    &:hover {opacity: .9}
    &:active {
      color: #FFF;
      background-color: var(--primary-hover);
    }
  }
  &.gray {
    color: #FFF;
    background-color: #666;
    &:hover {opacity: .9}
    &:active {background-color: var(--primary-hover)}
  }
  &.block {width: 100%}
  &.md {
    height: 23px;
    line-height: 21px;
  }
  &.lg {
    height: 28px;
    line-height: 26px;
    padding: 0 10px;
    font-size: 15px;
  }
}
</style>

<script>
export default {
  name: 'NovelEditorCommonButton',
  props: {
    variant: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'md'
    },
    icon: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    block: {
      type: Boolean,
      default: false
    },
    beep: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick(event) {
      if (this.beep) {
        const sound = new Audio('/sound/done.mp3')
        sound.play()
      }
      this.$emit('click', event)
    }
  }
}
</script>
