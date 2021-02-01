<template>
  <div class='content-box'>
    <p><span class='title'>제목</span></p>
    <p>작성중</p>
  </div>
</template>

<style lang='less' scoped>
.content-box {
  padding: .5rem;
  color: #333;
  font-size: 13px;
  border-radius: 2px;
  background: #FFF;
  box-shadow: 1px 0 10px rgba(0, 0, 0, .1);
  > p > span.title {
    font-size: 15px;
    font-weight: bold;
  }
}
</style>

<script>
export default {
  name: 'Help'
}
</script>
