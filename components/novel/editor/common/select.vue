<template>
  <select
    :class='[
        "e-select",
        size
      ]'
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
  &.md {
    height: 24px;
    line-height: 22px;
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
    size: {
      type: String,
      default: 'md'
    }
  },
  methods: {
    onChange(event) {
      this.$emit('change', event)
    }
  }
}
</script>
