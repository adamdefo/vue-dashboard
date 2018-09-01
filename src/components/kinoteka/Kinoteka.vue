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
        vm.loading = true
        // vm.showNotification('<p>Фильмы загружены</p>')
      }, function (error) {
        console.log(error)
        vm.loading = true
      })
    },
    getFilm: function (film) {
      let vm = this
      this.uploadFiles = []
      if (!film['cover']) {
        this.getCoverFilm(film).then(function (response) {
          let data = response.data
          if (data.id) {
            vm.cover = '/uploads/' + data.img
            film['cover'] = '/uploads/' + data.img
          } else {
            vm.cover = ''
          }
        }, function (error) {
          console.log(error)
        })
      } else {
        vm.cover = film['cover']
      }

      this.kinotekaItem = Object.assign({}, film)
      this.isShowForm = true
    },
    findFilmById: function (filmId) {
      let vm = this
      this.kinoteka.some(item => {
        // return item.id.toString() === filmId
        if (item.id.toString() === filmId) {
          Object.assign(item, vm.kinotekaItem)
        }
      })
    },
    // запрашивает обложку для фильма
    getCoverFilm: function (film) {
      return this.$http.get(this.api + 'cover.service.php', { params: { action: 'get', filmId: film.id } })
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
        let filmId = data.filmId
        let message = data.message

        // обновляю инфо у фильма
        vm.findFilmById(vm.kinotekaItem.id)
        // если нет id значит новый фильм
        if (!vm.kinotekaItem.id) {
          vm.kinotekaItem.id = filmId
          vm.kinoteka.unshift(vm.kinotekaItem)
          if (vm.uploadFiles.length) {
            vm.uploadImage(filmId)
          }
        } else {
          if (vm.uploadFiles.length) {
            vm.uploadImage(filmId).then(response => {
              console.log(response.data.responseText)
            })
          }
        }
        vm.showNotification(message)
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
    uploadImage: function (filmId) {
      let formData = new FormData()
      formData.append('file', this.uploadFiles[0])
      formData.append('filmId', filmId)
      return this.$http.post(this.api + 'upload.service.php', formData)
    },
    // очищает загрузчик
    clearUploader: function () {
      this.cover = ''
    },
    // выводит уведомление
    showNotification: function (message, effect = 'scale', type = 'notice') {
      let notification = new Notification({
        message,
        layout: 'growl',
        effect,
        type, // notice, warning, error or success
        onClose: () => {}
      })
      notification.show()
    }
  },
  created: function () {
    // получаю список фильмов
    this.getFilms()
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
