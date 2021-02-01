<template>
  <div class='content-box'>
    <div class='item'>
      <a href='https://t.me/mananovel' target='_blank'>
        <div class='item'>
          광고 문의하기
          <br>
          (300 * free 또는 사이트 상단 자유)
        </div>
      </a>
    </div>
  </div>
</template>

<style lang='less' scoped>
.content-box {
  margin-bottom: .5rem;
  border-radius: 2px;
  background: #FFF;
  box-shadow: 1px 0 10px rgba(0, 0, 0, .1);
  > .item {
    width: 100%;
    height: 70px;
    > a {
      width: 100%;
      height: 100%;
      text-decoration: none;
    }
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: #FFF;
      font-size: 12px;
      text-align: center;
      background-color: #666;
      background-repeat: no-repeat;
      background-size: cover;
      &:hover {background-color: #333}
    }
  }
}
</style>

<script>
export default {
  name: 'SidebarAD'
}
</script>
