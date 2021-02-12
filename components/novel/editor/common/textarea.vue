<template>
  <div>
    <textarea
      ref='textarea'
      class='e-textarea custom-scroll-box'
      :value='value'
      :placeholder='placeholder'
      :rows='rows'
      @input='onInput'
    />
  </div>
</template>

<style lang='less' scoped>
textarea.e-textarea {
  width: 100%;
  color: #FFF;
  border: 1px solid var(--primary);
  background: transparent;
  outline: none;
  &:focus {border-style: dashed}
}
</style>

<script>
export default {
  name: 'NovelEditorCommonTextarea',
  props: {
    rows: {
      type: Number,
      default: 1
    },
    value: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    }
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    },
    focus() {
      this.$refs.textarea.focus()
    }
  }
}
</script>
