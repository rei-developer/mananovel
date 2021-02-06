<template>
  <header class='e-header-page'>
    <ul>
      <li @contextmenu.prevent='test'>테스트</li>
      <li>테스트</li>
      <li class='active'>테스트</li>
      <li>테스트</li>
      <li>테스트</li>
    </ul>
  </header>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-hover: #5F5476;
@font-color: #EDE3EB;

header.e-header-page {
  width: 100%;
  color: #FFF;
  font-size: 13px;
  background: @primary;
  cursor: default;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  > ul {
    display: flex;
    height: 28px;
    line-height: 26px;
    margin: 0;
    padding: 0;
    list-style: none;
    border-bottom: 1px solid @primary-hover;
    > li {
      padding: 0 .4rem;
      &:active, &.active {
        margin-bottom: -1px;
        color: @primary-hover;
        background: rgba(255, 255, 255, .4);
      }
      &.active {
        border-bottom: 4px solid @primary-hover;
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
