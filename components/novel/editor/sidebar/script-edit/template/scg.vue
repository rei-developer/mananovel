<template>
  <div class='e-section-body'>
    <div class='title'>
      <font-awesome-icon icon='running'/>
      스탠딩 CG 설정
    </div>
    <div class='item'>
      <div class='label'>데이터베이스</div>
      <div class='content'>
        <div class='rows'>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>ID</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='id'
                  placeholder='이미지 ID'
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
              <em>URL 주소 우선</em>
            </div>
          </div>
        </div>
        <div class='rows'>
          <div class='label'>또는 URL</div>
          <div class='block'>
            <e-input
              v-model='url'
              placeholder='이미지 URL 주소'
              block
            />
          </div>
        </div>
      </div>
    </div>
    <div class='item'>
      <div class='label'>영역</div>
      <div class='content'>
        <div class='rows'>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>크기</div>
              <div class='content'>
                <e-select
                  v-model='sizeType'
                  block
                  @change='onChangeSize'
                >
                  <option :value='null'>선택</option>
                  <option
                    :value='item.value'
                    v-for='(item, index) in sizeOptions'
                    :key='index'
                  >
                    {{ item.label }}
                  </option>
                </e-select>
              </div>
            </div>
          </div>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>반복</div>
              <div class='content'>
                <e-select
                  v-model='repeatType'
                  block
                  @change='onChangeRepeat'
                >
                  <option :value='null'>선택</option>
                  <option
                    :value='item.value'
                    v-for='(item, index) in repeatOptions'
                    :key='index'
                  >
                    {{ item.label }}
                  </option>
                </e-select>
              </div>
            </div>
          </div>
        </div>
        <div class='rows' v-if='isPossibleControlSize'>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>가로</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='sizeW'
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
              <div class='label'>세로</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='sizeH'
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
        isVisibleFilterOption ? undefined : "hide"
      ]'
    >
      <div
        class='label'
        @click.self='onClickFilterOption'
      >
        필터
        <font-awesome-icon :icon='isVisibleFilterOption ? "chevron-up" : "chevron-down"'/>
      </div>
      <div class='content'>
        <div class='rows'>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>흐림</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='blur'
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
              <div class='label'>밝기</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='bright'
                  placeholder='기본값: 1'
                  :min='-9999'
                  :max='9999'
                  block
                />
              </div>
            </div>
          </div>
        </div>
        <div class='rows'>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>대비</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='contrast'
                  placeholder='기본값: 100'
                  :min='0'
                  :max='100'
                  block
                />
              </div>
            </div>
          </div>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>흑백</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='gray'
                  placeholder='기본값: 0'
                  :min='0'
                  :max='100'
                  block
                />
              </div>
            </div>
          </div>
        </div>
        <div class='rows'>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>색조 회전</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='hue'
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
              <div class='label'>반전</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='invert'
                  placeholder='기본값: 0'
                  :min='0'
                  :max='100'
                  block
                />
              </div>
            </div>
          </div>
        </div>
        <div class='rows'>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>채도</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='saturate'
                  placeholder='기본값: 100'
                  :min='0'
                  :max='100'
                  block
                />
              </div>
            </div>
          </div>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>세피아</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='sepia'
                  placeholder='기본값: 0'
                  :min='0'
                  :max='100'
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
        isVisibleAniOption ? undefined : "hide"
      ]'
    >
      <div
        class='label'
        @click.self='onClickAniOption'
      >
        애니메이션
        <font-awesome-icon :icon='isVisibleAniOption ? "chevron-up" : "chevron-down"'/>
      </div>
      <div class='content'>
        <div class='rows'>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>종류</div>
              <div class='content'>
                <e-select
                  v-model='aniType'
                  block
                  @change='onChangeAni'
                >
                  <option :value='null'>선택</option>
                  <option
                    :value='item.value'
                    v-for='(item, index) in aniOptions'
                    :key='index'
                  >
                    {{ item.label }}
                  </option>
                </e-select>
              </div>
            </div>
          </div>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>프레임</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='aniDur'
                  placeholder='기본값: 1'
                  :min='0'
                  :max='9999'
                  block
                />
              </div>
            </div>
          </div>
        </div>
        <div class='rows'>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>딜레이</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='aniDel'
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
              <div class='label'>반복 횟수</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='aniCnt'
                  placeholder='기본값: 0'
                  :min='0'
                  :max='9999'
                  block
                />
              </div>
            </div>
          </div>
        </div>
        <div class='rows'>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>방향</div>
              <div class='content'>
                <e-select
                  v-model='aniDir'
                  block
                  @change='onChangeAniDir'
                >
                  <option :value='null'>선택</option>
                  <option
                    :value='item.value'
                    v-for='(item, index) in aniDirOptions'
                    :key='index'
                  >
                    {{ item.label }}
                  </option>
                </e-select>
              </div>
            </div>
          </div>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>속도</div>
              <div class='content'>
                <e-select
                  v-model='aniFunc'
                  block
                  @change='onChangeAniFunc'
                >
                  <option :value='null'>선택</option>
                  <option
                    :value='item.value'
                    v-for='(item, index) in aniFuncOptions'
                    :key='index'
                  >
                    {{ item.label }}
                  </option>
                </e-select>
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
        @click.self='onClickDetailOption'
      >
        상세 설정
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
              <div class='label'>배치</div>
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
        <div class='rows'>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>확대</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='zoom'
                  placeholder='기본값: 1'
                  :min='0'
                  :max='9999'
                  block
                />
              </div>
            </div>
          </div>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>반지름</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='radius'
                  placeholder='기본값: 0'
                  :min='0'
                  :max='9999'
                  block
                />
              </div>
            </div>
          </div>
        </div>
        <div class='rows'>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>회전</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='rotate'
                  placeholder='기본값: 0'
                  :min='-360'
                  :max='360'
                  block
                />
              </div>
            </div>
          </div>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>투명도</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='opacity'
                  placeholder='기본값: 100'
                  :min='0'
                  :max='100'
                  block
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr/>
    <div class='item'>
      <div class='content'>
        <div class='rows'>
          <b-form-checkbox
            v-model='isApplyAllDraggedColumns'
            value='accepted'
            switch
          >
            드래그된 씬에 모두 적용
          </b-form-checkbox>
        </div>
        <div class='rows'>
          <div class='cols'>
            <b-form-checkbox
              v-model='isApplyAllVisibleColumns'
              value='accepted'
              switch
            >
              활성화된 씬에 모두 적용
            </b-form-checkbox>
          </div>
          <div class='cols'>
            <div class='e-button-group right'>
              <e-button
                variant='gray'
                icon='minus-square'
                @click='onClickClear'
                beep
              >
                초기화
              </e-button>
              <e-button
                icon='save'
                @click='onClickSave'
                beep
              >
                적용
              </e-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
@primary: #EDA7B2;

.e-section-body {
  > .item {
    > .content {
      > .rows {
        > .cols {
          > .cols-row {
            > .content {
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
import ESelect from '@/components/novel/editor/common/select'
import EButton from '@/components/novel/editor/common/button'

const attrList = [
  'id',
  'url',
  'sizeType',
  'sizeW',
  'sizeH',
  'repeatType',
  'pos',
  'zoom',
  'radius',
  'rotate',
  'opacity',
  'w',
  'h',
  'x',
  'y',
  'z',
  'blur',
  'bright',
  'contrast',
  'gray',
  'hue',
  'invert',
  'saturate',
  'sepia',
  'aniType',
  'aniDur',
  'aniDel',
  'aniCnt',
  'aniDir',
  'aniFunc'
]

export default {
  name: 'NovelEditorSidebarScriptEditTemplateScg',
  components: {
    EInput,
    ETextarea,
    ESelect,
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
    const data = this.pureData
    const attr = {}
    attrList.map(item => attr[item] = !!data.scg ? data.scg[item] : undefined)
    attr.repeatType = 'no-repeat'
    attr.pos = 2
    return {
      data,
      ...attr,
      sizeOptions: [
        {label: '자동', value: 'auto'},
        {label: '포함', value: 'contain'},
        {label: '커버', value: 'cover'},
        {label: '상속', value: 'inherit'},
        {label: 'PX', value: 'px', ctrl: true},
        {label: 'EM/REM', value: 'rem', ctrl: true}
      ],
      repeatOptions: [
        {label: '상속', value: 'inherit'},
        {label: '반복 없음', value: 'no-repeat'},
        {label: '반복', value: 'repeat'},
        {label: 'X축 반복', value: 'repeat-x'},
        {label: 'Y축 반복', value: 'repeat-y'},
        {label: '원형', value: 'round'},
        {label: '간격', value: 'space'}
      ],
      aniOptions: [
        {label: '페이드인', value: 'fadein'},
        {label: '페이드아웃', value: 'fadeout'}
      ],
      aniDirOptions: [
        {label: '역방향', value: 'reverse'},
        {label: '순 > 역 반복', value: 'alternate'},
        {label: '역 > 순 반복', value: 'alternate-reverse'}
      ],
      aniFuncOptions: [
        {label: '저 > 고 > 저속', value: 'ease'},
        {label: '저 > 정상', value: 'ease-in'},
        {label: '정상 > 저속', value: 'ease-out'},
        {label: '저 > 정상 > 저속', value: 'ease-in-out'}
      ],
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
      isVisibleFilterOption: false,
      isVisibleAniOption: false,
      isVisibleDetailOption: false,
      isApplyAllDraggedColumns: false,
      isApplyAllVisibleColumns: false
    }
  },
  watch: {
    pureData() {
      this.data = this.pureData
      attrList.map(item => this[item] = !!this.pureData.scg ? this.pureData.scg[item] : undefined)
    }
  },
  computed: {
    isAllEmpty() {
      return JSON.parse(JSON.stringify(attrList))
        .filter(item => this[item])?.length < 1
    },
    isPossibleControlSize() {
      return this.sizeOptions
        .find(item => item.value === this.sizeType)?.ctrl
    }
  },
  methods: {
    onClickSearch() {

    },
    onChangeSize(event) {
      this.sizeType = event.target.value
    },
    onChangeRepeat(event) {
      this.repeatType = event.target.value
    },
    onChangeAni(event) {
      this.aniType = event.target.value
    },
    onChangeAniDir(event) {
      this.aniDir = event.target.value
    },
    onChangeAniFunc(event) {
      this.aniFunc = event.target.value
    },
    onClickFilterOption() {
      this.isVisibleFilterOption = !this.isVisibleFilterOption
    },
    onClickAniOption() {
      this.isVisibleAniOption = !this.isVisibleAniOption
    },
    onClickDetailOption() {
      this.isVisibleDetailOption = !this.isVisibleDetailOption
    },
    onClickBackgroundPos(pos) {
      if (this.pos === pos)
        return this.pos = 0
      this.pos = pos
    },
    onClickClear() {
      attrList.map(item => this[item] = undefined)
      delete this.data.scg
      this.submit()
    },
    onClickSave() {
      if (this.isAllEmpty)
        delete this.data.scg
      else {
        this.data.scg = {}
        attrList.map(item => this[item] ? this.data.scg[item] = this[item] : undefined)
      }
      this.submit()
    },
    submit() {
      this.$eventBus.$emit('sb.update', this.rowId, this.data.id, this.data, this.isApplyAllDraggedColumns, this.isApplyAllVisibleColumns)
      this.$forceUpdate()
    }
  }
}
</script>
