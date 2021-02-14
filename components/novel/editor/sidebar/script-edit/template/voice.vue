<template>
  <div class='e-section-body'>
    <div class='title'>
      <font-awesome-icon icon='microphone-alt'/>
      보이스 설정
    </div>
    <div class='item'>
      <div class='label'>데이터베이스</div>
      <div class='content'>
        <div class='rows'>
          <div class='label'>URL</div>
          <div class='block'>
            <e-input
              v-model='url'
              placeholder='보이스 URL 주소'
              block
            />
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

<script>
import EInput from '@/components/novel/editor/common/input'
import EButton from '@/components/novel/editor/common/button'

const attrList = ['url']

export default {
  name: 'NovelEditorSidebarScriptEditTemplateVoice',
  components: {
    EInput,
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
    attrList.map(item => attr[item] = !!data.voice ? data.voice[item] : undefined)
    return {
      data,
      ...attr,
      isApplyAllDraggedColumns: false,
      isApplyAllVisibleColumns: false
    }
  },
  watch: {
    pureData() {
      this.data = this.pureData
      attrList.map(item => this[item] = !!this.pureData.voice ? this.pureData.voice[item] : undefined)
    }
  },
  computed: {
    isAllEmpty() {
      return JSON.parse(JSON.stringify(attrList))
        .filter(item => this[item])?.length < 1
    }
  },
  methods: {
    onClickClear() {
      attrList.map(item => this[item] = undefined)
      delete this.data.voice
      this.submit()
    },
    onClickSave() {
      if (this.isAllEmpty)
        delete this.data.voice
      else {
        this.data.voice = {}
        attrList.map(item => this[item] ? this.data.voice[item] = this[item] : undefined)
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
