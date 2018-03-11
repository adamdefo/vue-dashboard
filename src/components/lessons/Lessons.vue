<template>
<div class="blog">
  <div class="title">
    <h1>{{ title }}</h1>
    <div class="title__links">
      <button @click="showForm">
        <span>{{ btnAdd.txt }}</span>
      </button>
    </div>
  </div>
  <div class="blog__article-list">
    <ul>
      <li v-for="item in kinoteka">
        <a @click.prevent="getArticle(item)">
          <img :src="item.cover" />
          <span>{{ item.title }}</span>
        </a>
      </li>
    </ul>
  </div>
  <div v-if="isShowForm" class="blog__form">
    <form class="form" method="post" @submit.prevent="saveArticle" enctype="multipart/form-data">
      <div class="dropbox">
        <div class="dropbox__image"><img :src="cover" /></div>
        <input class="dropbox__input" type="file" name="uploader" accept="image/*" multiple @change="changeUploader" />
      </div>
      <div class="form__title">{{ kinotekaItem.title }}</div>
      <div class="form__group">
        <div class="form__group-item">
          <label class="form__label">Заголовок</label>
          <input class="form__input" type="text" v-model="kinotekaItem.title" />
        </div>
      </div>
      <div class="form__group">
        <div class="form__group-item">
          <label class="form__label">Краткое описание</label>
          <input class="form__input" type="text" v-model="kinotekaItem.meta.description" />
        </div>
      </div>
      <div class="form__group">
        <div class="form__group-item">
          <label class="form__label">Ключевые слова</label>
          <input class="form__input" type="text" v-model="kinotekaItem.meta.keywords" />
        </div>
      </div>
      <div class="form__group">
        <div class="form__group-item">
          <label class="form__label">Содержание</label>
          <textarea class="form__input form__input_txt" type="text" v-model="kinotekaItem.content"></textarea>
        </div>
      </div>
      <div class="form__group">
        <div class="form__group-item">
          <label class="form__label">
            <input class="form__checkbox" type="checkbox" v-model="kinotekaItem.isDraft" /><span>черновик</span>
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
  name: 'Lessons',
  data: function () {
    return {
      api: '../api/',
      title: 'Уроки',
      loading: false,
      btnAdd: {
        txt: 'Открыть форму'
      },
      action: '',
      uploadFiles: [],
      cover: '',
      kinoteka: [],
      kinotekaItem: {
        cover: '',
        title: 'Новая статья',
        meta: {
          description: '',
          keywords: ''
        },
        content: '',
        isDraft: true
      },
      isShowForm: false,
      blogList: [] // список статей
    }
  },
  methods: {
    getArticles: function () {
      let vm = this
      this.$http.get(this.api).then(function (response) {
        console.log(response)
        let kinoteka = response.data
        vm.kinoteka = kinoteka.list.slice()
        this.loading = true
      }, function (error) {
        console.log(error)
        this.loading = true
      })
    },
    getArticle: function (article) {
      console.log(article)
      this.isShowForm = true
    },
    saveArticle: function () {
      let vm = this
      this.loading = false

      this.$http.post(this.api, this.kinotekaItem).then(response => {
        console.log(response)
        vm.loading = true
        let formData = new FormData()
        formData.append('file', vm.uploadFiles[0])
        vm.$http.post(vm.api + 'upload.service.php', formData).then(upload => {
          console.log(upload)
        })
      }, error => {
        console.log(error)
        vm.loading = true
      })
    },
    closeForm: function () {
      this.isShowForm = false
    },
    showForm: function () {
      this.isShowForm = !this.isShowForm
      this.btnAdd.txt = this.isShowForm ? 'Закрыть форму' : 'Открыть форму'
    },
    // реагирует на изменение загрузчика
    changeUploader: function (e) {
      this.uploadFiles = e.target.files || e.dataTransfer.files
      if (!this.uploadFiles.length) {
        return
      }
      this.createImage(this.uploadFiles[0])
    },
    // создает миниатюру загруженной обложки
    createImage: function (file) {
      let vm = this
      let fr = new FileReader()
      fr.onload = (e) => {
        vm.cover = e.target.result
      }
      fr.readAsDataURL(file)
    },
    // очищает загрузчик
    clearUploader: function (e) {
      this.cover = ''
    }
  },
  created: function () {
    this.getArticles()
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

.dropbox {
  position: relative;
  &__image {
    & img {
      display: inline-block;
      width: 30%;
      height: auto;
    }
  }
}
</style>
