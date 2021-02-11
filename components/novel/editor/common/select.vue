<template>
  <select
    :class='[
        "e-select",
        size,
        block ? "block" : undefined
      ]'
    :value='value'
    @change='onChange'
  >
    <slot/>
  </select>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-hover: #5F5476;

.e-select {
  width: fit-content;
  height: 19px;
  line-height: 18px;
  padding: 0 5px;
  color: #333;
  font-size: 13px;
  border: 0;
  background-color: @primary;
  outline: none;
  &:hover {opacity: .9}
  &:active {
    color: #FFF;
    background-color: @primary-hover;
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
  name: 'NovelEditorCommonSelect',
  props: {
    value: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'md'
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange(event) {
      this.$emit('change', event)
    }
  }
}
</script>
