<template>
  <div>
    <div class='content-box'>
      <b-alert variant='warning' show>
        <font-awesome-icon icon='exclamation-triangle'/>
        개발중인 페이지
      </b-alert>
      <h6>
        <font-awesome-icon icon='sign-in-alt'/>
        로그인
      </h6>
      <hr>
      <b-form-group>
        <b-form-input
          size='sm'
          placeholder='아이디'
          v-model='id'
          trim
          autofocus
        />
      </b-form-group>
      <b-form-group>
        <b-form-input
          type='password'
          size='sm'
          placeholder='암호'
          v-model='password'
          trim
        />
      </b-form-group>
      <div class='bottom'>
        <b-button
          squared
          size='sm'
          variant='primary'
          @click='onSubmitClick'
        >
          <font-awesome-icon icon='check-circle'/>
          로그인
        </b-button>
        <b-button
          squared
          size='sm'
          variant='dark'
          to='/signup'
        >
          회원가입
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
export default {
  name: 'Signin',
  data() {
    return {
      id: '',
      password: ''
    }
  },
  methods: {
    async onSubmitClick() {
      this.$toast.warning('현재 로그인 페이지는 개발중입니다.')
    }
  }
}
</script>
