<template>
  <div>
    <Dialog ref='dialog'/>
    <Download ref='download'/>
    <div class='header-box'>
      <div class='item'>
        <h5>
          <font-awesome-icon
            :icon='getBoardHeaderIcon'
            v-if='getBoardHeaderIcon'
          />
          {{ getBoardHeaderName }}
          <b-badge variant='primary'>{{ count | numberWithCommas }}</b-badge>
        </h5>
      </div>
      <div
        class='item right'
        v-if='saveCategoryList.length > 1'
      >
        <b-dropdown
          right
          size='sm'
          :text='getIntervalKey || "날짜"'
          variant='primary'
          v-if='board === "best"'
        >
          <b-dropdown-item
            :variant='interval === item.value ? "primary" : "outline-primary"'
            :href='getHeaderLinkGen({interval: item.value})'
            v-for='(item, index) in intervalList'
            :key='index'
            @click='onIntervalClick($event, item.value)'
          >
            {{ item.key }}
          </b-dropdown-item>
        </b-dropdown>
        <b-dropdown
          right
          size='sm'
          :text='category || "분류"'
          variant='primary'
        >
          <b-dropdown-item
            :variant='category ? "outline-primary" : "primary"'
            :href='`/save/${board}`'
            @click='onCategoryClick($event)'
          >
            전체
            <b-badge variant='dark'>{{ getSaveCategoryListCount | numberWithCommas }}</b-badge>
          </b-dropdown-item>
          <b-dropdown-item
            :variant='category === item.category ? "primary" : "outline-primary"'
            :href='getHeaderLinkGen({category: item.category})'
            v-for='(item, index) in saveCategoryList'
            :key='index'
            @click='onCategoryClick($event, item.category)'
          >
            {{ item.category }}
            <b-badge
              variant='dark'
              v-if='item.count > 0'
            >
              {{ item.count | numberWithCommas }}
            </b-badge>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <div class='middle-box'>
      <b-input-group size='sm'>
        <b-form-input
          v-model='searchText'
          :placeholder='`${getBoardHeaderName} 검색`'
          @keydown.enter='$refs.middleSearchButton.$el.click'
        />
        <b-input-group-append>
          <b-button
            ref='middleSearchButton'
            size='sm'
            variant='primary'
            :href='getSearchTextLinkGen()'
          >
            <font-awesome-icon icon='search'/>
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
    <div class='content-box'>
      <ul class='header'>
        <li class='w100'>분류</li>
        <li
          class='w100'
          v-if='board === "movie" || board === "k_movie"'
        >
          이미지
        </li>
        <li>제목</li>
        <li class='w80'>용량</li>
        <li class='w80'>날짜</li>
        <li class='w100'>다운로드</li>
      </ul>
      <ul
        :class='[idx === item.idx ? "view" : undefined]'
        v-for='(item, index) in saveList'
        :key='index'
      >
        <li class='w100'>{{ item.category }}</li>
        <li
          class='w100 thumb'
          v-if='board === "movie" || board === "k_movie"'
        >
          <nuxt-link :to='getContentLinkGen(item.idx)'>
            <div
              class='item'
              :style='{backgroundImage: item.uuid ? `url("https://cdn.mananovel.com/thumb/${item.uuid}.jpg")` : "none"}'
            >
              {{ item.uuid ? '' : 'NONE' }}
            </div>
          </nuxt-link>
        </li>
        <li class='subject'>
          <nuxt-link :to='getContentLinkGen(item.idx)'>
            <span v-html='filterTitle(item.title)'/>
          </nuxt-link>
        </li>
        <li class='w80 force'>{{ item.size }}</li>
        <li class='w80'>
          {{
            $moment().format('YYYY.MM.DD') === $moment(item.created).format('YYYY.MM.DD')
              ? $moment(item.created).format('HH:mm')
              : $moment(item.created).format('MM.DD')
          }}
        </li>
        <li class='w100'>
          <b-button-group size='sm'>
            <b-button
              squared
              variant='primary'
              @click='onDownloadClick("download", item)'
            >
              <font-awesome-icon icon='download'/>
            </b-button>
            <b-button
              squared
              variant='dark'
              @click='onDownloadClick("magnet", item)'
            >
              <font-awesome-icon icon='magnet'/>
            </b-button>
          </b-button-group>
        </li>
      </ul>
      <div class='pagination-wrapper'>
        <b-pagination-nav
          v-model='nowPage'
          :link-gen='getPaginationLinkGen'
          :limit='10'
          :number-of-pages='maxPage'
          size='sm'
          use-router
          @page-click='onPaginationPageClick'
          v-if='count > 0'
        />
      </div>
      <div class='bottom'>
        <div class='item'>
          <b-input-group size='sm'>
            <b-form-input
              v-model='searchText'
              placeholder='웹노벨 검색'
              @keydown.enter='$refs.bottomSearchButton.$el.click'
            />
            <b-input-group-append>
              <b-button
                ref='bottomSearchButton'
                size='sm'
                variant='primary'
                :href='getSearchTextLinkGen()'
              >
                <font-awesome-icon icon='search'/>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
@primary-hover: #5F5476;
@font-color: #EDE3EB;
@primary: #EDA7B2;

.header-box {
  display: flex;
  margin-bottom: 1rem;
  > .item {
    &.right {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      > div {margin-left: .25rem}
    }
  }
}

.middle-box {
  width: 300px;
  margin: 0 auto 1rem;
}

.content-box {
  border-radius: 2px;
  background: #FFF;
  box-shadow: 1px 0 10px rgba(0, 0, 0, .1);
  > ul {
    display: flex;
    margin: 0;
    padding: 0 .5rem;
    list-style: none;
    &.header > li {
      color: #333;
      font-weight: bold;
    }
    > li {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding: .5rem 0;
      border-bottom: 1px solid #DDD;
      color: #999;
      font-size: 13px;
      &.thumb {
        width: 100px;
        height: calc(100px + 1rem);
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
          font-size: 11px;
          font-weight: bold;
          background-color: #BBB;
          background-repeat: no-repeat;
          background-size: cover;
          border-radius: 2px;
        }
      }
      &.subject {
        justify-content: left;
        padding-left: 1rem;
        > a {
          color: #333;
          &:visited {color: #AAA}
        }
      }
      &.w80 {max-width: 80px}
      &.w100 {max-width: 100px}
      &.force {color: #333}
    }
    &.view > li {
      background: #F1F1F1;
      &.subject {
        font-weight: bold;
        > a {
          color: #AAA;
          pointer-events: none;
        }
      }
    }
  }
  > .pagination-wrapper {
    display: flex;
    justify-content: center;
    margin: 4rem 0 1rem;
  }
  > .bottom {
    display: flex;
    height: 43px;
    padding: 0 .5rem 0;
    background: @primary-hover;
    > .item {
      display: flex;
      align-items: center;
      > .input-group > input {border-right: 0}
    }
  }
}
</style>

<script>
import Dialog from '@/components/common/dialog'
import Download from '@/components/common/download'
import {numberWithCommas} from '@/util/format'
import {
  getSaveFileList,
  getSaveMagnetList
} from '@/api/save'
import BOARD_LIST from '@/data/board-list'

export default {
  name: 'BoardList',
  components: {
    Dialog,
    Download
  },
  filters: {numberWithCommas},
  props: {
    idx: {
      type: Number,
      default: null
    },
    board: {
      type: String,
      default: null
    },
    q: {
      type: String,
      default: null
    },
    category: {
      type: String,
      default: null
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    interval: {
      type: Number,
      default: undefined
    },
    count: {
      type: Number,
      default: 1
    },
    saveList: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    saveCategoryList: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  data() {
    return {
      intervalList: [
        {
          key: '전체',
          value: 0
        },
        {
          key: '오늘',
          value: 1
        },
        {
          key: '3일',
          value: 3
        },
        {
          key: '7일',
          value: 7
        },
        {
          key: '1개월',
          value: 30
        },
        {
          key: '3개월',
          value: 90
        }
      ],
      searchText: this.q,
      nowPage: this.page,
      nowInterval: this.interval,
      boardList: BOARD_LIST
    }
  },
  mounted() {
    // this.$refs.dialog.show({icon: 'info-circle', message: '안녕'})
    this.$eventBus.$on('submit', () => {
      console.log('잘했돋가')
    })
  },
  beforeDestroy() {
    this.$eventBus.$off('submit')
  },
  computed: {
    getBoardHeaderIcon() {
      return BOARD_LIST
        .find(item => item.field === this.board)?.icon
    },
    getBoardHeaderName() {
      return BOARD_LIST
        .find(item => item.field === this.board)?.name
    },
    getIntervalKey() {
      return this.intervalList
        .find(item => item.value === this.nowInterval)?.key
    },
    getSaveCategoryListCount() {
      return this.saveCategoryList
        .map(item => item.count)
        .reduce((arr, cur) => arr + cur, 0)
    },
    maxPage() {
      const maxPage = Math.floor(this.count / this.limit)
      return maxPage > 0 ? maxPage : 1
    }
  },
  methods: {
    filterTitle(text) {
      if (this.q) {
        const regex = new RegExp(`${this.q}`, 'g')
        text = text.replace(regex, `<span class='highlight'>${this.q}</span>`)
      }
      return text
    },
    makeQuery({q, category, interval, page}) {
      let query = []
      if (q)
        query.push(`q=${q}`)
      if (category)
        query.push(`category=${category}`)
      if (interval)
        query.push(`interval=${interval}`)
      if (page)
        query.push(`page=${page}`)
      if (query.length > 0) {
        query = query.join('&')
        query = `?${query}`
      }
      return query
    },
    getHeaderLinkGen({category = this.category, interval = this.nowInterval}) {
      return `/save/${this.board}${this.makeQuery({category, interval})}`
    },
    getContentLinkGen(idx) {
      return `/${idx}${this.makeQuery({
        q: this.searchText,
        category: this.category,
        interval: this.nowInterval,
        page: this.nowPage
      })}`
    },
    getPaginationLinkGen(page) {
      return `/save/${this.board}${this.makeQuery({
        q: this.q,
        category: this.category,
        interval: this.nowInterval,
        page
      })}`
    },
    getSearchTextLinkGen() {
      return `/save/${this.board}${this.makeQuery({
        q: this.searchText,
        interval: this.nowInterval
      })}`
    },
    onCategoryClick(event, category = undefined) {
      this.$eventBus.$emit('SetCategory', category)
    },
    onIntervalClick(event, interval = undefined) {
      this.nowInterval = interval
      this.$eventBus.$emit('SetInterval', interval)
    },
    async onDownloadClick(type, item) {
      const NAMESPACE = '65f9af5d-f23f-4065-ac85-da725569fdcd'
      const TOKEN = this.$uuid.v5(`${item.idx}`, NAMESPACE)
      try {
        const data = type === 'download'
          ? await getSaveFileList({
            idx: item.idx,
            token: TOKEN
          }, this.$axios)
          : await getSaveMagnetList({
            idx: item.idx,
            token: TOKEN
          }, this.$axios)
        if (data.status === 'FAIL')
          return this.$toast.error('토큰이 일치하지 않습니다')
        const result = type === 'download'
          ? data.saveFileList
          : data.saveMagnetList
        if (!result)
          return this.$toast.error('목록이 존재하지 않습니다')
        this.$refs.download.show(type, result)
      } catch (error) {
        if (error.response?.status === 429)
          return this.$toast.error(error.response.data.message)
        this.$toast.error(error.message)
        console.error(error)
      }
    },
    onPaginationPageClick(event, page) {
      this.$eventBus.$emit('SetPage', page)
    }
  }
}
</script>
