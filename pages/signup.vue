<template>
  <div>
    <div class='content-box'>
      <b-alert variant='warning' show>
        <font-awesome-icon icon='exclamation-triangle'/>
        개발중인 페이지
      </b-alert>
      <h6>
        <font-awesome-icon icon='user-plus'/>
        기본정보 입력
      </h6>
      <hr>
      <b-form-group
        label-align='right'
        label-cols='3'
        label-size='sm'
        label='아이디'
        label-for='input-sm'
      >
        <b-form-input
          size='sm'
          placeholder='영문·숫자 및 최소 3자 이상'
          v-model='id'
          :state='stateId'
          trim
          autofocus
        />
      </b-form-group>
      <b-form-group
        label-align='right'
        label-cols='3'
        label-size='sm'
        label='암호'
        label-for='input-sm'
      >
        <b-form-input
          type='password'
          size='sm'
          placeholder='최소 8자 이상'
          v-model='password'
          :state='statePassword'
          trim
        />
      </b-form-group>
      <b-form-group
        label-align='right'
        label-cols='3'
        label-size='sm'
        label='암호 확인'
        label-for='input-sm'
        :invalid-feedback='invalidPassword'
        :state='statePasswordConfirm'
      >
        <b-form-input
          type='password'
          size='sm'
          placeholder='최소 8자 이상'
          v-model='passwordConfirm'
          :state='statePasswordConfirm'
          trim
        />
      </b-form-group>
      <b-form-group
        description='공백, 특수문자 불가'
        label-align='right'
        label-cols='3'
        label-size='sm'
        label='닉네임'
        label-for='input-sm'
      >
        <b-form-input
          size='sm'
          placeholder='최소 2자 이상'
          v-model='nickname'
          :state='stateNickname'
          trim
        />
      </b-form-group>
      <b-form-group
        label-align='right'
        label-cols='3'
        label-size='sm'
        label='E-mail'
        label-for='input-sm'
      >
        <b-form-input
          type='email'
          size='sm'
          placeholder='선택'
          v-model='email'
          trim
        />
      </b-form-group>
      <h6>
        <font-awesome-icon icon='check'/>
        자동등록 방지
      </h6>
      <hr>
      <vue-hcaptcha
        sitekey='3c20f7ef-7109-4e4f-a67f-ba46afeaa0a0'
        theme='dark'
        @verify='onVerify'
      />
      <div class='bottom'>
        <b-button
          squared
          size='sm'
          variant='primary'
          @click='onSubmitClick'
        >
          <font-awesome-icon icon='check-circle'/>
          회원가입
        </b-button>
        <b-button
          squared
          size='sm'
          variant='dark'
          to='/signin'
        >
          취소
        </b-button>
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
.content-box {
  width: calc(302px + 1rem);
  margin: 0 auto;
  padding: .5rem;
  border-radius: 2px;
  background: #FFF;
  box-shadow: 1px 0 10px rgba(0, 0, 0, .1);
  hr {margin: 0 0 .5rem}
  > .form-group {margin-bottom: .5rem}
  > .bottom {
    display: flex;
    > a,
    > button {width: 50%}
  }
}
</style>

<script>
import VueHcaptcha from '@hcaptcha/vue-hcaptcha'
import {verify} from '@/api/captcha'

export default {
  name: 'Signup',
  components: {VueHcaptcha},
  data() {
    return {
      id: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      email: '',
      isDev: false
    }
  },
  asyncData({isDev}) {
    return {isDev}
  },
  computed: {
    invalidPassword() {
      if (this.password !== this.passwordConfirm)
        return '암호와 암호 확인이 서로 일치하지 않습니다.'
      return ''
    },
    stateId() {
      return this.id.length >= 4
    },
    statePassword() {
      return this.password.length >= 8
    },
    statePasswordConfirm() {
      return this.password === this.passwordConfirm && this.password.length >= 8
    },
    stateNickname() {
      return this.nickname.length >= 2
    },
    stateEmail() {
      return this.email.length > 0
    }
  },
  methods: {
    async onVerify(token) {
      try {
        const data = await verify(token, this.$axios)
        if (data.status === 'FAIL')
          return this.$toast.error('FAIL')
        this.$toast.success('SUCCESS')
      } catch (error) {
        this.$toast.error(error.message)
        console.error(error)
      }
    },
    async onSubmitClick() {
      this.$toast.warning('현재 회원가입 페이지는 개발중입니다.')
    }
  }
}
</script>
