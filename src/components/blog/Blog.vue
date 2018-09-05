<template src="./Blog.tmpl.html"></template>

<script>
import Notification from './../core/notification'

export default {
  name: 'Blog',
  data: () => {
    return {
      api: '../api/',
      title: 'Блог',
      loading: false,
      listPosts: [],
      post: {
        id: null,
        title: '',
        content: ''
      },
      isShowForm: false
    }
  },
  methods: {
    getAllPosts: function () {
      let vm = this
      this.$http.get(this.api + 'blog.service.php').then(function (res) {
        let data = res.data
        vm.listPosts = data.list.slice()
        vm.loading = true
        // vm.showNotification('<p>Фильмы загружены</p>')
      }, function (error) {
        console.log(error)
        vm.loading = true
      })
    },
    getPost: function (post) {
      this.post = Object.assign({}, post)
      this.isShowForm = true
    },
    addPost: function () {
      this.isShowForm = true
      this.post = {
        id: null,
        title: 'Новый пост',
        content: ''
      }
    },
    findPostById: function (postId) {
      let vm = this
      this.listPosts.some(item => {
        // return item.id.toString() === filmId
        if (item.id.toString() === postId) {
          Object.assign(item, vm.post)
        }
      })
    },
    save: function () {
      let vm = this
      this.loading = false
      let params = {
        action: !vm.post.id ? 'create' : 'update'
      }

      this.$http.post(this.api + 'blog.service.php', Object.assign(this.post, params)).then(response => {
        vm.loading = true
        let data = response.data
        let postId = data.postId
        let message = data.message
        // обновляю инфо у фильма
        vm.findPostById(vm.post.id)
        // если нет id значит новый фильм
        if (!vm.post.id) {
          vm.post.id = postId
          vm.listPosts.unshift(vm.post)
        }
        vm.showNotification(message)
      }, error => {
        console.log(error)
        vm.loading = true
      })
    },
    closeForm: function () {
      this.isShowForm = false
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
    this.getAllPosts()
  },
  mounted: function () {},
  computed: {
    isValid: function () {
      return (this.post.name !== '') && (this.post.content !== '')
    }
  }
}
</script>

<style lang="scss" scoped src="./styles.sass"></style>
