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
                <button class="btn" type="submit" v-bind:disabled="!isValid">
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
    isValid: function () {
      return (this.login !== '') && (this.pswd !== '')
    }
  }
}
</script>

<style lang="scss" scoped>
.code {
  width: 600px;
  margin: 0 auto;
}

.b-auth {
  position: relative;
  width: 100%;
}

.form {
  position: relative;
  width: 100%;
  &-wrapper {
    position: relative;
    margin: 5rem auto;
    padding: 3rem;
    width: 100%;
    min-width: 300px;
    max-width: 400px;
  }
  &__title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    & > h1 {
      display: inline-block;
      font-size: 100%;
      margin: 0;
    }
    & > a {
      float: right;
      font-size: 1.27rem;
      line-height: 1;
    }
  }
  &__group {
    position: relative;
    padding: 15px 0;
  }
  &__item {
    position: relative;
    padding: 15px 0;
    &--btn {
      padding: 0;
    }
    & > .label {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      color: #8f8f8f;
      font-size: 1.5rem;
    }
    & > .control {
      border: 1px solid #e8e8e8;
      -webkit-box-shadow: inset 1px 1px 0 rgba(0,0,0,.3);
      box-shadow: inset 1px 1px 0 rgba(0,0,0,.3);
      line-height: 30px;
      height: 30px;
      background: #fff;
      font-size: 1.5rem;
      color: rgb(20, 55, 90);
      // color: #555e6c;
      outline: none;
      padding: 5px 8px;
      width: 100%;
      &:focus + label {
        display: none;
      }
    }
  }
}

.btn {
  cursor: pointer;
  font-size: 1.5rem;
  padding: 3px 6px;
}
</style>