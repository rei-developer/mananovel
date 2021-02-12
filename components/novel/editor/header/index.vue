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
header.e-header {
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
    border-bottom: 1px solid #333;
    list-style: none;
    > li {
      padding: 0 .4rem;
      color: #333;
      &:active, &.active {
        color: #FFF;
        background: var(--primary-hover);
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
