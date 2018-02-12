<template>
  <div class="blog">
    <div class="title">
      <h1>{{ title }}</h1>
      <div class="title__links">
        <button @click="showAddArticleForm">Добавить</button>
      </div>
    </div>
    <div class="blog__article-list">
      <ul>
        <li v-for="article in articles">
          <a href="#">{{ article.title }}</a>
        </li>
      </ul>
    </div>
    <div v-if="isShowArticleForm" class="blog__form">
      <form class="form" @submit.prevent="saveArticle" enctype="multipart/form-data">
        <div class="form__group">
          <div class="form__group-item">
            <label class="form__label">Заголовок</label>
            <input class="form__control" type="text" v-model="article.title" />
          </div>
        </div>
        <div class="form__group">
          <div class="form__group-item">
            <label class="form__label">Краткое описание</label>
            <input class="form__control" type="text" v-model="article.meta.description" />
          </div>
        </div>
        <div class="form__group">
          <div class="form__group-item">
            <label class="form__label">Ключевые слова</label>
            <input class="form__control" type="text" v-model="article.meta.keywords" />
          </div>
        </div>
        <div class="form__group">
          <div class="form__group-item">
            <label class="form__label">Содержание</label>
            <textarea class="form__control form__control_txt" type="text" v-model="article.content"></textarea>
          </div>
        </div>
        <div class="form__group">
          <div class="form__group-item">
            <label class="form__label">
              <input class="form__control form__control_checkbox" type="checkbox" v-model="article.isDraft" /><span>черновик</span>
            </label>
          </div>
        </div>
        <div class="form__group form__group_btn">
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
      title: 'Статьи',
      loading: false,
      articles: [
        {
          id: 1,
          title: 'Article 1'
        },
        {
          id: 2,
          title: 'Article 2'
        }
      ],
      articleImage: '', // обложка для статьи
      article: {
        title: '',
        meta: {
          description: '',
          keywords: ''
        },
        content: '',
        isDraft: true
      },
      isShowArticleForm: false,
      blogList: [] // список статей
    }
  },
  methods: {
    getArticles: function () {
      let vm = this
      this.$http.get(this.api + '?articles').then(function (response) {
        let articles = response.data
        vm.articles = articles.slice()
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
    },
    onFileChange: function (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0])
    },
    createImage: function (file) {
      var image = new Image()
      console.log(image)
      var reader = new FileReader()
      var vm = this

      reader.onload = (e) => {
        vm.articleImage = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (e) {
      this.articleImage = ''
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
.blog {
  &__article-list {
    // border-left: 1px solid #dedede; 
    & ul {
      margin-left: 16px;
    }
  }
}


.title {
  padding: 2.5rem 0 1.5rem;
  & > h1 {
    border-bottom: 1px solid #dedede;
    margin: 0 0 1.5rem;
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
