<template>
  <div>
    <input
      ref='input'
      :class='[
        "e-input",
        block ? "block" : undefined,
        readonly ? "readonly" : undefined
      ]'
      :type='type'
      :value='value'
      :placeholder='placeholder'
      :maxlength='maxlength'
      :readonly='readonly'
      @input='onInput'
    />
    <span v-if='display && maxlength && value && value.length > 0'>
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
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }
  &:not(.readonly):focus {border-style: dashed}
  &.block {width: 100%}
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
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    maxlength: {
      type: Number,
      default: null
    },
    display: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput(event) {
      let value = event.target.value
      try {
        if (this.type === 'number') {
          if (this.min && Number(value) < this.min) {
            value = (this.min).toString()
            event.target.value = this.min
          }
          if (this.max && Number(value) > this.max) {
            value = (this.max).toString()
            event.target.value = this.max
          }
        }
        this.$emit('input', value)
      } catch (error) {
        throw new Error(error)
      }
    },
    focus() {
      this.$refs.input.focus()
    }
  }
}
</script>
