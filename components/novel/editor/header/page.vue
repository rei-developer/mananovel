<template>
  <header class='e-header-page'>
    <ul>
      <li class='active' @contextmenu.prevent='test'>테스트</li>
      <li>테스트</li>
      <li>테스트</li>
      <li>테스트</li>
      <li>테스트</li>
    </ul>
  </header>
</template>

<style lang='less' scoped>
header.e-header-page {
  width: 100%;
  color: #FFF;
  font-size: 13px;
  background: var(--primary);
  cursor: default;
  > ul {
    display: flex;
    height: 28px;
    line-height: 26px;
    margin: 0;
    padding: 0;
    list-style: none;
    border-bottom: 1px solid #333;
    > li {
      padding: 0 .4rem;
      color: #333;
      &:active, &.active {
        margin-bottom: -1px;
        color: var(--primary-hover);
        background: rgba(255, 255, 255, .4);
      }
      &.active {
        font-weight: bold;
        border-bottom: 4px solid var(--primary-hover);
      }
      &:hover {background: rgba(255, 255, 255, .2)}
    }
  }
}
</style>

<script>
export default {
  name: 'NovelEditorHeaderPage',
  methods: {
    test() {
      this.$toast.success('하이')
    }
  }
}
</script>
