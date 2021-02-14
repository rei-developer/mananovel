<template>
  <div class='wrapper'>
    <nav>
      <ul>
        <a href='https://t.me/mananovel' target='_blank'>
          <li>
            <font-awesome-icon icon='paper-plane'/>
            광고·문의
          </li>
        </a>
        <nuxt-link to='/dmca'>
          <li>
            <font-awesome-icon icon='copyright'/>
            DMCA
          </li>
        </nuxt-link>
        <!--        <nuxt-link to='/'>-->
        <!--          <li>-->
        <!--            <font-awesome-icon icon='mobile-alt'/>-->
        <!--            MOBILE-->
        <!--          </li>-->
        <!--        </nuxt-link>-->
      </ul>
    </nav>
  </div>
</template>

<style lang='less' scoped>
@primary-hover: #5F5476;
@font-color: #EDE3EB;
@primary: #A5CFFF;

.wrapper {
  height: 44px;
  > nav {
    margin-top: 1rem;
    color: #FFF;
    background: @primary;
    > ul {
      display: flex;
      align-items: center;
      width: 1200px;
      height: 44px;
      margin: 0 auto;
      padding: 0;
      list-style: none;
      > a {
        height: 44px;
        line-height: 42px;
        padding: 0 .5rem;
        color: #FFF;
        font-size: 13px;
        font-weight: bold;
        text-decoration: none;
        white-space: nowrap;
        &:hover {color: @font-color}
      }
    }
  }
}

@media (max-width: 1199px) {
  .wrapper {
    > nav {
      > ul {width: 100%}
    }
  }
}
</style>

<script>
export default {
  name: 'Footer'
}
</script>
