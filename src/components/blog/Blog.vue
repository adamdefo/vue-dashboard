<template>
  <div class="blog">
    <div class="title">
      <h1>{{ title }}</h1>
      <div class="title__links">
        <button @click="showAddArticleForm">Добавить</button>
      </div>
    </div>
    <div v-if="isShowArticleForm" class="blog__form">
      <form class="form" @submit.prevent="saveArticle">
        <div class="form__group">
          <div class="form__group-item">
            <input class="form__control" type="text" v-model="article.title" />
          </div>
        </div>
        <div class="form__group">
          <div class="form__group-item">
            <input class="form__control" type="text" v-model="article.meta.description" />
          </div>
        </div>
        <div class="form__group">
          <div class="form__group-item">
            <input class="form__control" type="text" v-model="article.meta.keywords" />
          </div>
        </div>
        <div class="form__group">
          <div class="form__group-item">
            <textarea class="form__control" type="text" v-model="article.content"></textarea>
          </div>
        </div>
        <div class="form__btn">
          <button class="btn" type="submit">Сохранить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data: function () {
    return {
      api: '../api/',
      url: 'https://jsonplaceholder.typicode.com',
      title: 'Блог',
      loading: false,
      article: {
        title: '',
        meta: {
          description: '',
          keywords: ''
        },
        content: ''
      },
      isShowArticleForm: false,
      blogList: [] // список статей
    }
  },
  methods: {
    getArticles: function () {
      this.$http.get(this.api + '?articles').then(function (response) {
        console.log(response)
        this.loading = true
      }, function (error) {
        console.log(error)
        this.loading = true
      })
    },
    saveArticle: function () {
      this.loading = false
      let params = Object.assign({}, this.article)
      this.$http.post(this.api, params).then(function (response) {
        console.log(response)
        this.loading = true
      }, function (error) {
        console.log(error)
        this.loading = true
      })
    },
    onCloseArticleForm: function () {
      this.isShowArticleForm = false
    },
    showAddArticleForm: function () {
      this.isShowArticleForm = !this.isShowArticleForm
    }
  },
  created: function () {
    // this.getArticles()
  },
  computed: {
    // isValid: function () {
    //   return (this.nickname !== '') && (this.phone !== '')
    // }
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
