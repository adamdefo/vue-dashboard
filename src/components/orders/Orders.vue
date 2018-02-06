<template>
  <div class="c-users">
    <div class="title">
      <h1>{{ title }}</h1>
      <div class="title__links">
        <button @click="showUserForm">Записать</button>
      </div>
    </div>

    <div class="b-client">
      <!-- список пользователей -->
      <div class="b-client__list">
        <div v-if="loading">
          <ul v-if="users.length" class="list">
          <li v-for="user in users" :key="user.id">
            <b>Name:</b> <a @click="getUserById(user.id); addInCart(user)">{{ user.name }}</a>, <b>Username:</b> {{ user.username }}, <b>Email:</b> {{ user.email }}
          </li>
        </ul>
        </div>
        <div v-else class="loading">Подождите идёт загрузка ...</div>
      </div>
      <!-- карточка пользователя -->
      <div v-if="isShowUserCard" class="b-client__card">
        <div class="inner">
          <button @click="onCloseCard" class="close">Закрыть</button>
          <!-- добавить клиента -->
          <div v-if="isShowUserForm" class="b-client__card-form">
            <form class="form form_client">
              <div class="form__group">
                <div class="form__item">
                  <input id="nickname" v-model="userForm.nickname" class="control" type="text" name="nickname" />
                  <label class="label">Псевдоним</label>
                </div>
                <div class="form__item">
                  <input id="phone" v-model="userForm.phone" class="control" type="text" name="phone" />
                  <label class="label">Телефон</label>
                </div>
                <div class="form__item">
                  <input id="price" v-model="userForm.price" class="control" type="text" name="price" />
                  <label class="label">Стоимость</label>
                </div>
                <div class="form__item">
                  <input id="service" v-model="userForm.service" class="control" type="text" name="service" />
                  <label class="label">Услуга</label>
                </div>
                <div class="form__item form__item_btn">
                  <button class="btn" type="submit" v-bind:disabled="!isValid">
                      <span>Записать</span>
                  </button>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data: function () {
    return {
      url: 'https://jsonplaceholder.typicode.com',
      title: 'Запись',
      loading: false,
      users: [],
      user: {},
      userForm: {
        nickname: '',
        phone: '',
        price: '',
        service: ''
      },
      isShowUserCard: false,
      isShowUserForm: false,
      orders: [] // записи
    }
  },
  methods: {
    getUsers: function () {
      this.$http.get(this.url + '/users').then(function (response) {
        console.log(response)
        let users = response.body
        this.users = users.slice()
        this.loading = true
      }, function (error) {
        console.log(error)
        this.loading = true
      })
    },
    updateUsers: function () {
      this.loading = false
      this.getUsers()
    },
    getUserById: function (userId) {
      this.users.some(user => {
        if (user.id === userId) {
          this.user = user
          this.isShowUserCard = true
        }
      })
    },
    onCloseCard: function () {
      this.isShowUserCard = false
      this.isShowUserForm = false
    },
    showUserForm: function () {
      this.isShowUserCard = !this.isShowUserCard
      this.isShowUserForm = !this.isShowUserForm
    },
    resetUser: function () {
      this.user = {}
    },
    addInCart: function (user) {
      console.log('Add user', user)
    }
  },
  created: function () {
    this.getUsers()
  },
  computed: {
    isValid: function () {
      return (this.nickname !== '') && (this.phone !== '')
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  padding: 2.5rem 0 1.5rem;
  & > h1 {
    border-bottom: 1px solid #dedede;
    margin: 0 0 1.5rem;
    padding-bottom: 1.5rem;
  }
  &__links {
    font-size: 1.3rem;
    & > a {
      margin-right: 1rem;
    }
  }
}

.b-client {
  position: relative;
  width: 100%;
  &__list {
    position: relative;
    width: 100%;
  }
  &__card {
    position: absolute;
    top: -50px;
    right: 0;
    width: 50%;
    z-index: 10;
    & .inner {
      position: relative;
      width: 100%;
      background: #ffffff;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,.35);
      padding: 1.5rem;
      margin-bottom: 3rem; 
      & .close {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
      }
      & .form {

      }
    }
  }
}

.list {
  & > li {
    font-size: 1.5rem;
    margin: 1.5rem 0;
  }
  & b {
    font-weight: bold;
  }
}

.loading {
  text-align: center;
  font-size: 1.3rem;
}
</style>
