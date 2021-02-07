<template>
  <div>
    <input
      ref='input'
      class='e-input'
      :type='type'
      :value='value'
      :placeholder='placeholder'
      :maxlength='maxlength'
      @input='onInput'
    />
    <span v-if='maxlength && value && value.length > 0'>
      {{ value.length }}/{{ maxlength }}
    </span>
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-hover: #5F5476;

input.e-input {
  color: #FFF;
  border: 1px solid @primary;
  background: transparent;
  outline: none;
  &:focus {border-style: dashed}
  &[type='color'] {
    width: 19px;
    height: 19px;
    margin: 0;
    padding: 0;
    border: 1px solid @primary;
    -webkit-appearance: none;
  }
  &[type='color']::-webkit-color-swatch-wrapper {padding: 0}
  &[type='color']::-webkit-color-swatch {border: none}
}
</style>

<script>
export default {
  name: 'NovelEditorCommonInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    maxlength: {
      type: Number,
      default: null
    }
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    },
    focus() {
      this.$refs.input.focus()
    }
  }
}
</script>
