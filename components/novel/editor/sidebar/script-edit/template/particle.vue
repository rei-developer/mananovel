<template>
  <div class='e-section-body'>
    <div class='title'>
      <font-awesome-icon :icon="['fab', 'react']"/>
      파티클 설정
    </div>
    <div class='item'>
      <div class='label'>데이터베이스</div>
      <div class='content'>
        <div class='rows'>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>종류</div>
              <div class='content'>
                <e-select
                  v-model='particleType'
                  block
                  @change='onChangeParticleType'
                >
                  <option :value='null'>선택</option>
                  <option
                    :value='item.value'
                    v-for='(item, index) in particleTypeOptions'
                    :key='index'
                  >
                    {{ item.label }}
                  </option>
                </e-select>
              </div>
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
      <div class='label'>상세 설정</div>
      <div class='content'>
        <div class='rows'>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>개수</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='amount'
                  placeholder='기본값: 50'
                  :min='0'
                  :max='200'
                  block
                />
              </div>
            </div>
          </div>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>크기</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='size'
                  placeholder='기본값: 5'
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
              <div class='label'>속도</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='speed'
                  placeholder='기본값: 1.5'
                  :min='0'
                  :max='100'
                  block
                />
              </div>
            </div>
          </div>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>바람</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='wind'
                  placeholder='기본값: 0'
                  :min='-100'
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
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>쉐이크</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='swing'
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
              <div class='label'>색상</div>
              <div class='content color'>
                <e-input
                  size='md'
                  type='color'
                  v-model='color'
                />
                <em>{{ color }}</em>
              </div>
            </div>
          </div>
          <div class='cols'>
            <div class='cols-row'>
              <div class='label'>Z</div>
              <div class='content'>
                <e-input
                  type='number'
                  v-model='z'
                  placeholder='기본값: 9999'
                  :min='-9999'
                  :max='9999'
                  block
                />
              </div>
            </div>
          </div>
        </div>
        <div class='rows'>
          <b-form-checkbox
            v-model='isResize'
            value='accepted'
            switch
          >
            파티클 자동 조정
          </b-form-checkbox>
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
.e-section-body {
  > .item {
    > .content {
      > .rows {
        > .cols {
          > .cols-row {
            > .content {
              &.color {
                display: flex;
                > em {
                  margin-left: 5px;
                  color: #999;
                }
                > div {height: 23px}
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
import ESelect from '@/components/novel/editor/common/select'
import EButton from '@/components/novel/editor/common/button'

const attrList = [
  'url',
  'particleType',
  'amount',
  'size',
  'speed',
  'wind',
  'color',
  'opacity',
  'swing',
  'z',
  'isResize'
]

export default {
  name: 'NovelEditorSidebarScriptEditTemplateParticle',
  components: {
    EInput,
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
    attrList.map(item => attr[item] = !!data.particle ? data.particle[item] : undefined)
    return {
      data,
      ...attr,
      particleTypeOptions: [
        {label: '눈', value: 'snow'},
        {label: '비', value: 'rain'}
      ],
      isApplyAllDraggedColumns: false,
      isApplyAllVisibleColumns: false
    }
  },
  watch: {
    pureData() {
      this.data = this.pureData
      attrList.map(item => this[item] = !!this.pureData.particle ? this.pureData.particle[item] : undefined)
    }
  },
  computed: {
    isAllEmpty() {
      return JSON.parse(JSON.stringify(attrList))
        .filter(item => this[item])?.length < 1
    }
  },
  methods: {
    onChangeParticleType(event) {
      const type = event.target.value
      if (type === 'snow') {
        this.amount = '100'
        this.size = '2'
        this.speed = '1.5'
        this.wind = '1'
        this.opacity = '0.8'
        this.swing = '2'
        this.url = undefined
      } else {
        this.amount = '200'
        this.size = '4'
        this.speed = '10'
        this.wind = '-1'
        this.opacity = '0.1'
        this.swing = '0'
        this.url = '/rain.png'
      }
      this.z = '100'
      this.isResize = true
      this.color = undefined
      this.particleType = type
    },
    onClickClear() {
      attrList.map(item => this[item] = undefined)
      delete this.data.particle
      this.submit()
    },
    onClickSave() {
      if (this.isAllEmpty)
        delete this.data.particle
      else {
        this.data.particle = {}
        attrList.map(item => this[item] ? this.data.particle[item] = this[item] : undefined)
      }
      this.submit()
    },
    submit() {
      console.log(this.data.particle, 'DD')
      this.$eventBus.$emit('sb.update', this.rowId, this.data.id, this.data, this.isApplyAllDraggedColumns, this.isApplyAllVisibleColumns)
      this.$forceUpdate()
    }
  }
}
</script>
