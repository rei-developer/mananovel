<template>
  <div>
    테스트
  </div>
</template>

<style lang='less' scoped>
section {
  display: flex;
  justify-content: space-between;
  &:not(:last-child) {margin-bottom: 1rem}
  > .content-box {width: calc((900px - 1.5rem) / 2)}
}

@media (max-width: 1199px) {
  section {
    flex-direction: column;
    > .content-box {
      width: 100vw;
      &:not(:last-child) {margin-bottom: 1rem}
    }
  }
}
</style>

<script>
export default {
  name: 'Index',
  components: {},
  data() {
    return {

    }
  },
  async asyncData({$axios}) {

    return {

    }
  }
}
</script>
