<template>
  <div class='verify-wrapper'>
    <div class='logo'>
      <img src='/mascot.png' alt='mascot'>
    </div>
    <div class='subject'>
      <font-awesome-icon icon='check-circle'/>
      로그인 성공!
    </div>
    <div class='description'>
      잠시 후 창이 저절로 닫힙니다...
    </div>
  </div>
</template>

<style lang='less' scoped>
.verify-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  color: #FFF;
  font-size: 1rem;
  background-color: #333;
  > .logo {
    width: 100px;
    height: 100px;
    > img {
      width: inherit;
      height: inherit;
      border-radius: 500rem;
    }
  }
  > .subject {
    margin: 1rem auto 0;
    color: var(--primary);
  }
  > .description {font-size: 13px}
}
</style>

<script>
export default {
  name: 'Verify',
  layout: 'empty',
  mounted() {
    const token = this.$route.query.token
    localStorage.setItem('service', 'kakao')
    localStorage.setItem('token', token)
    window.close()
  }
}
</script>
