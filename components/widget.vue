<template>
  <div class='content-box'>
    <div class='title'>
      <font-awesome-icon :icon='icon'/>
      {{ name }}
    </div>
    <hr>
    <ul :class='type'>
      <li
        v-for='(item, index) in data'
        :key='index'
      >
        <nuxt-link
          class='thumb'
          :style='{backgroundImage: item.uuid ? `url("https://cdn.mananovel.com/thumb/${item.uuid}.jpg")` : undefined}'
          :to='`/${item.id}`'
          v-if='type === "magazine"'
        />
        <nuxt-link
          class='title'
          :to='`/${item.id}`'
        >
          {{ item.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style lang='less' scoped>
@primary-hover: #5F5476;
@font-color: #EDE3EB;
@primary: #A5CFFF;

.content-box {
  border-radius: 2px;
  background: #FFF;
  box-shadow: 1px 0 10px rgba(0, 0, 0, .1);
  > .title {
    padding: .25rem 0 .4rem .5rem;
    color: #FFF;
    font-size: 13px;
    font-weight: bold;
    background: @primary;
    > svg {margin-right: .2rem}
  }
  > hr {margin: 0}
  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    &.magazine {
      height: 280px;
      > li {
        display: flex;
        align-items: center;
        justify-items: center;
        height: 55px;
        width: 50%;
        float: left;
        overflow: hidden;
        > a {
          text-decoration: none;
          cursor: pointer;
          &.thumb {
            width: 50px;
            height: 50px;
            margin: 5px 5px 0 5px;
            background-color: @font-color;
            background-image: url('/logo.png');
            background-repeat: no-repeat;
            background-size: cover;
          }
          &.title {
            display: -webkit-box;
            flex: 1;
            color: @primary-hover;
            font-size: 12px;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            &:hover {color: @primary}
            &:visited {color: #AAA}
          }
        }
      }
    }
    &.list {
      padding-bottom: .2rem;
      > li {
        padding: .2rem .5rem;
        > a {
          display: block;
          color: @primary-hover;
          font-size: 12px;
          text-decoration: none;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          cursor: pointer;
          &:hover {color: @primary}
          &:visited {color: #AAA}
        }
      }
    }
  }
}

@media (max-width: 1199px) {
  .content-box > ul.list {
    padding: 0;
    > li {
      padding: .3rem 0 .5rem .5rem;
      &:not(:last-child) {border-bottom: 1px solid rgba(0, 0, 0, .1)}
    }
  }
}
</style>

<script>
export default {
  name: 'Widget',
  props: {
    type: {
      type: String,
      default: 'list'
    },
    icon: {
      type: String,
      default: 'burn'
    },
    name: {
      type: String,
      default: null
    },
    data: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  }
}
</script>
