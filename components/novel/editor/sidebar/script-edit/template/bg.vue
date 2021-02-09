<template>
  <div class='e-section-body'>
    <div class='item'>
      <div class='label'>그림 ID</div>
      <div class='content'>
        <div class='rows'>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>그림 ID</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='id'
                  placeholder='그림 ID'
                  :maxlength='20'
                  block
                  readonly
                />
              </div>
            </div>
          </div>
          <div class='cols'>
            <div class='content'>
              <e-button
                size='md'
                icon='search'
                @click='onClickSearch'
                beep
              >
                찾기
              </e-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='item'>
      <div class='label'>배경 영역</div>
      <div class='content'>
        <div class='rows'>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>너비</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='w'
                  placeholder='기본값: 화면 너비'
                  :min='-9999'
                  :max='9999'
                  block
                />
              </div>
            </div>
          </div>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>높이</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='w'
                  placeholder='기본값: 화면 높이'
                  :min='-9999'
                  :max='9999'
                  block
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      :class='[
        "item",
        "accordion",
        isVisibleDetailOption ? undefined : "hide"
      ]'
    >
      <div
        class='label'
        @click.self='onClickDetailOptionVisible'
      >
        배경 상세설정
        <font-awesome-icon :icon='isVisibleDetailOption ? "chevron-up" : "chevron-down"'/>
      </div>
      <div class='content'>
        <div class='rows'>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>폭</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='w'
                  placeholder='기본값: 화면 너비'
                  :min='-9999'
                  :max='9999'
                  block
                />
              </div>
            </div>
            <div class='cols-row'>
              <div class='label'>길이</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='h'
                  placeholder='기본값: 화면 높이'
                  :min='-9999'
                  :max='9999'
                  block
                />
              </div>
            </div>
            <div class='cols-row'>
              <div class='label'>X</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='x'
                  placeholder='기본값: 0'
                  :min='-9999'
                  :max='9999'
                  block
                />
              </div>
            </div>
            <div class='cols-row'>
              <div class='label'>Y</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='y'
                  placeholder='기본값: 0'
                  :min='-9999'
                  :max='9999'
                  block
                />
              </div>
            </div>
            <div class='cols-row'>
              <div class='label'>Z</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='z'
                  placeholder='기본값: 0'
                  :min='-9999'
                  :max='9999'
                  block
                />
              </div>
            </div>
          </div>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>포지션</div>
              <div class='content'>
                <div class='position-box'>
                  <div
                    :class='[
                      "cols",
                      pos === item.value ? "active" : undefined
                    ]'
                    @click='onClickBackgroundPos(item.value)'
                    v-for='(item, index) in posList'
                    :key='index'
                  >
                    {{ item.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr/>
    <b-form-checkbox
      v-model='isAllApplyWithVisible'
      value='accepted'
      switch
    >
      활성화된 모든 씬에 동일하게 적용
    </b-form-checkbox>
    <div class='e-button-group right'>
      <e-button
        icon='save'
        @click='onClickSave'
        beep
      >
        적용
      </e-button>
    </div>
    {{ data }}
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;

.e-section-body {
  > .item {
    > .content {
      > .rows {
        display: flex;
        justify-content: space-between;
        &:not(:last-child) {margin-bottom: 5px}
        > .cols {
          width: calc(50% - 5px);
          > .cols-row {
            display: inline-flex;
            &:not(:last-child) {margin-bottom: 5px}
            > .label {min-width: 60px}
            > .content {
              width: 100%;
              > .position-box {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                width: 126px;
                height: 126px;
                padding: 0 5px 5px 0;
                border: 1px solid @primary;
                > .cols {
                  flex-grow: 0;
                  flex-shrink: 0;
                  flex-basis: 34px;
                  line-height: 34px;
                  margin: 5px 0 0 5px;
                  color: #333;
                  text-align: center;
                  background: rgba(255, 255, 255, .2);
                  &.active {background: @primary}
                  &:active {opacity: .9}
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

<script>
import EInput from '@/components/novel/editor/common/input'
import ETextarea from '@/components/novel/editor/common/textarea'
import EButton from '@/components/novel/editor/common/button'

export default {
  name: 'NovelEditorSidebarScriptEditTemplateBg',
  components: {
    EInput,
    ETextarea,
    EButton
  },
  props: {
    rowId: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: null
    },
    pureData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      data: this.pureData,
      id: !!this.pureData.bg
        ? this.pureData.bg.id
        : undefined,
      pos: !!this.pureData.bg
        ? this.pureData.bg.pos
        : undefined,
      w: !!this.pureData.bg
        ? this.pureData.bg.w
        : undefined,
      h: !!this.pureData.bg
        ? this.pureData.bg.h
        : undefined,
      x: !!this.pureData.bg
        ? this.pureData.bg.x
        : undefined,
      y: !!this.pureData.bg
        ? this.pureData.bg.y
        : undefined,
      z: !!this.pureData.bg
        ? this.pureData.bg.z
        : undefined,
      posList: [
        {label: 'TL', value: 1},
        {label: 'TC', value: 2},
        {label: 'TR', value: 3},
        {label: 'CL', value: 4},
        {label: 'C', value: 5},
        {label: 'CR', value: 6},
        {label: 'BL', value: 7},
        {label: 'BC', value: 8},
        {label: 'BR', value: 9}
      ],
      isVisibleDetailOption: true,
      isAllApplyWithVisible: false
    }
  },
  watch: {
    pureData() {
      this.data = this.pureData
      this.id = !!this.pureData.bg
        ? this.pureData.bg.id
        : undefined
      this.pos = !!this.pureData.bg
        ? this.pureData.bg.pos
        : undefined
      this.w = !!this.pureData.bg
        ? this.pureData.bg.w
        : undefined
      this.h = !!this.pureData.bg
        ? this.pureData.bg.h
        : undefined
      this.x = !!this.pureData.bg
        ? this.pureData.bg.x
        : undefined
      this.y = !!this.pureData.bg
        ? this.pureData.bg.y
        : undefined
      this.z = !!this.pureData.bg
        ? this.pureData.bg.z
        : undefined
      this.isAllApplyWithVisible = false
    }
  },
  computed: {
    isAllEmpty() {
      return (
        !this.id &&
        !this.pos &&
        !this.w &&
        !this.h &&
        !this.x &&
        !this.y &&
        !this.z
      )
    }
  },
  methods: {
    onClickSearch() {

    },
    onClickDetailOptionVisible() {
      this.isVisibleDetailOption = !this.isVisibleDetailOption
    },
    onClickBackgroundPos(pos) {
      if (this.pos === pos)
        return this.pos = 0
      this.pos = pos
    },
    onClickSave() {
      if (this.isAllEmpty) {
        delete this.data.bg
      } else {
        this.data.bg = {}
        if (this.id)
          this.data.bg.id = this.id
        if (this.pos)
          this.data.bg.pos = this.pos
        if (this.w)
          this.data.bg.w = this.w
        if (this.h)
          this.data.bg.h = this.h
        if (this.x)
          this.data.bg.x = this.x
        if (this.y)
          this.data.bg.y = this.y
        if (this.z)
          this.data.bg.z = this.z
      }
      this.$eventBus.$emit('sb.update', this.rowId, this.data.id, this.data, this.isAllApplyWithVisible)
      this.$forceUpdate()
    }
  }
}
</script>
