<template>
    <div class="b-auth">
        <div class="form-wrapper">
          <form @submit.prevent="logIn" class="form">
            <div class="form__title">
              <h1>{{ form.title }}</h1>
              <a @click="switchForm(form.type)">{{ form.link }}</a>
            </div>
            <div class="form__group">
                <div class="form__item">
                    <input id="login" v-model="login" class="control" type="text" name="login" />
                    <label class="label">Логин</label>
                </div>
                <div class="form__item">
                    <input id="pswd" v-model="pswd" class="control" type="password" name="pswd" />
                    <label class="label">Пароль</label>
                </div>
            </div>
            <div class="form__item form__item--btn">
                <button class="btn" type="submit" v-bind:disabled="!isValidForm">
                    <span>Войти</span>
                </button>
            </div>
          </form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Auth',
  data: function () {
    return {
      count: 0,
      login: '',
      pswd: '',
      someData: '',
      form: {
        type: 'login',
        title: 'Вход',
        link: 'Регистрация'
      }
    }
  },
  methods: {
    checkUser: function () {
      console.log('Проверяю пользователя')
    },
    logIn: function (event) {
      let url = 'https://jsonplaceholder.typicode.com'
      console.log(this.login)

      this.$http.get(url + '/posts/1')
      .then(function (response) {
        this.$router.push('orders')
        this.someData = response
        console.log(response)
      }, function (error) {
        console.log(error)
      })
    },
    switchForm: function (type) {
      console.log(type)
    }
  },
  created: function () {
    this.checkUser()
  },
  computed: {
    // валидация формы
    isValidForm: function () {
      return (this.login !== '') && (this.pswd !== '')
    }
  }
}
</script>

<style lang="scss" scoped>
.b-auth {
  position: relative;
  width: 100%;
}

.form__item {
  margin: 25px 0;
}
</style>