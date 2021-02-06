<template>
  <header class='e-header'>
    <ul>
      <li>프로젝트(<u>P</u>)</li>
      <li>편집(<u>E</u>)</li>
      <li>보기(<u>V</u>)</li>
      <li>게임(<u>G</u>)</li>
      <li>도구(<u>T</u>)</li>
      <li>도움말(<u>H</u>)</li>
    </ul>
  </header>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;
@primary-hover: #5F5476;
@font-color: #EDE3EB;

header.e-header {
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
    border-bottom: 1px solid @primary-hover;
    list-style: none;
    > li {
      padding: 0 .4rem;
      &:active, &.active {
        color: @font-color;
        background: @primary-hover;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'NovelEditorHeader'
}
</script>
