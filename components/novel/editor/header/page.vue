<template>
  <div>
    <header>
      <ul>
        <li @contextmenu.prevent='test'>테스트</li>
        <li>테스트</li>
        <li class='active'>테스트</li>
        <li>테스트</li>
        <li>테스트</li>
      </ul>
    </header>
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-hover: #5F5476;
@font-color: #EDE3EB;

header {
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
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    > li {
      padding: 0 .4rem;
      &:active, &.active {
        margin-bottom: -1px;
        background: rgba(255, 255, 255, .4);
      }
      &.active {
        color: @primary-hover;
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
