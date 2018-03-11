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
      <li v-for="item in kinoteka" :key="item.id">
        <a @click.prevent="getFilm(item)"><span>{{ item.name }}</span></a>
      </li>
    </ul>
  </div>
  <div v-if="isShowForm" class="blog__form">
    <form class="form" method="post" @submit.prevent="save" enctype="multipart/form-data">
      <div class="dropbox">
        <div class="dropbox__image"><img :src="cover" /></div>
        <input class="dropbox__input" type="file" name="uploader" accept="image/*" multiple @change="changeUploader" />
      </div>
      <div class="form__title">{{ kinotekaItem.name }}</div>
      <div class="form__group">
        <div class="form__group-item">
          <label class="form__label">Название</label>
          <input class="form__input" type="text" v-model="kinotekaItem.name" />
        </div>
      </div>
      <div class="form__group">
        <div class="form__group-item">
          <label class="form__label">Описание</label>
          <textarea class="form__input form__input_txt" type="text" v-model="kinotekaItem.content"></textarea>
        </div>
      </div>
      <div class="form__group form__group_btn">
        <button class="btn" type="submit" :disabled="!isValid">Сохранить</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: 'Kinoteka',
  data: function () {
    return {
      api: '../api/',
      title: 'Кинотека',
      loading: false,
      btnAdd: {
        txt: 'Открыть форму'
      },
      action: '',
      uploadFiles: [],
      cover: '',
      kinoteka: [],
      kinotekaItem: {
        id: null,
        name: 'Новый фильм',
        content: ''
      },
      isShowForm: false,
      blogList: [] // список статей
    }
  },
  methods: {
    getFilms: function () {
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
    getFilm: function (film) {
      Object.assign(this.kinotekaItem, film)
      this.isShowForm = true
    },
    save: function () {
      let vm = this
      this.loading = false
      this.$http.post(this.api, this.kinotekaItem).then(response => {
        console.log(response)
        alert(response.data.message)
        vm.loading = true
        let data = response.data
        vm.kinotekaItem.id = data.lastInsertIndex
        vm.kinoteka.push(vm.kinotekaItem)
        let formData = new FormData()
        formData.append('file', vm.uploadFiles[0])
        formData.append('filmId', data.lastInsertIndex)
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
    this.getFilms()
  },
  computed: {
    isValid: function () {
      return (this.kinotekaItem.name !== '') && (this.kinotekaItem.content !== '')
    }
  }
}
</script>

<style lang="scss" scoped>
.blog {
  &__article-list {
    & ul {
      margin-left: 16px;
    }
  }
  &__form {
    width: 450px;
  }
}

.title {
  display: table;
  padding: 2.5rem 0 1.5rem;
  border-bottom: 1px solid #dedede;
  width: 100%;
  & > h1 {
    display: table-cell;
    vertical-align: middle;
    line-height: 1;
    margin: 0;
    width: 65%;
  }
  &__links {
    display: table-cell;
    vertical-align: middle;
    font-size: 1.3rem;
    text-align: right;
    width: 35%;
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
