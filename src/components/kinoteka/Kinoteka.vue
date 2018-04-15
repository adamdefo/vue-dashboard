<template src="./Kinoteka.tmpl.html"></template>

<script>
import Notification from './../../notification'

export default {
  name: 'Kinoteka',
  data: () => {
    return {
      api: '../api/',
      title: 'Кинотека',
      loading: false,
      btnAdd: {
        txt: 'Открыть форму'
      },
      uploadFiles: [],
      cover: '',
      kinoteka: [],
      kinotekaItem: {
        id: null,
        name: '',
        year: null,
        content: ''
      },
      isShowForm: false
    }
  },
  methods: {
    getFilms: function () {
      let vm = this
      this.$http.get(this.api).then(function (response) {
        let data = response.data
        vm.kinoteka = data.list.slice()
        this.loading = true
      }, function (error) {
        console.log(error)
        this.loading = true
      })
    },
    getFilm: function (film) {
      this.kinotekaItem = Object.assign({}, film)
      this.isShowForm = true
    },
    findFilmById: function (filmId) {
      let vm = this
      this.kinoteka.some(item => {
        if (item.id.toString() === filmId) {
          Object.assign(item, vm.kinotekaItem)
        }
      })
    },
    save: function () {
      let vm = this
      this.loading = false
      let params = {
        action: !vm.kinotekaItem.id ? 'create' : 'update'
      }

      this.$http.post(this.api, Object.assign(this.kinotekaItem, params)).then(response => {
        vm.loading = true
        let data = response.data
        console.log(data.message)
        this.findFilmById(this.kinotekaItem.id) // обновляю инфо у фильма
        // если нет id значит новый фильм
        if (!vm.kinotekaItem.id) {
          vm.kinotekaItem.id = data.filmId
          vm.kinoteka.unshift(vm.kinotekaItem)
          let formData = new FormData()
          formData.append('file', vm.uploadFiles[0])
          formData.append('filmId', data.filmId)
          vm.$http.post(vm.api + 'upload.service.php', formData).then(upload => {
            console.log(upload)
          })
        }
      }, error => {
        console.log(error)
        vm.loading = true
      })
    },
    addNewFilm: function () {
      this.isShowForm = true
      this.kinotekaItem = {
        id: null,
        name: 'Новый фильм',
        year: null,
        content: ''
      }
      this.cover = ''
      this.uploadFiles = []
    },
    closeForm: function () {
      this.isShowForm = false

      let notification = new Notification({
        message: '<p>This is just a simple notice. Everything is in order and this is a <a href="#">simple link</a>.</p>',
        layout: 'growl',
        effect: 'scale',
        type: 'notice', // notice, warning, error or success
        onClose: () => {
          console.log('AAAAAAAAAAA')
        }
      })
      notification.show()
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
    // this.getFilms()
  },
  mounted: function () {},
  computed: {
    isValid: function () {
      return (this.kinotekaItem.name !== '') && (this.kinotekaItem.content !== '')
    }
  }
}
</script>

<style lang="scss" scoped src="./styles.sass"></style>
