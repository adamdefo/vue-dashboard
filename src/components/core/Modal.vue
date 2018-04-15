<template>
<div class="md">
  <div class="md__overlay"></div>
  <div class="md__container">
    <div class="md__inner">
      <button class="md-close js-md-close">Закрыть</button>
      <div class="md__header">
        <div class="ttl ttl-h2 ttl-bold">Спасибо за твой выбор Бро!</div>
        <div class="ttl ttl-h2">Я перезвоню Вам в течение 5 минут ;)</div>
      </div>
      <div class="md__content">
        <form class="form js-form-request md-form">
          <div class="form__item _required">
            <label for="name" class="form__lbl">Представься</label>
            <input id="name" type="text" name="name" class="form__ctrl">
          </div>
          <div class="form__item _required">
            <label for="phone" class="form__lbl">Телефон</label>
            <input id="phone" type="text" name="phone" class="form__ctrl">
          </div>
          <div class="form__item">
            <label for="mail" class="form__lbl">Электропочта</label>
            <input id="mail" type="text" name="mail" class="form__ctrl">
          </div>
          <div class="form__item form__item-btn">
            <button type="button" class="btn js-btn-submit"><span>Отправить</span></button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Lessons',
  data: () => {
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
  created: {
  },
  mounted: {

  },
  computed: {
    // isValid: function () {
    //   return (this.nickname !== '') && (this.phone !== '')
    // }
  }
}
</script>

<style lang="sass" scoped>
.md
	position: fixed
	top: 0
	left: 0
	width: 100%
	height: 100%
	background-color: rgba(0,0,0,.85)
	opacity: 0
	padding: 35px 0
	z-index: 0
	-webkit-transition: all .3s
	transition: all .3s
	&_show
		opacity: 1
		z-index: 1001
	&__overlay
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		z-index: 1
	&__inner
		position: relative
		background-color: #ffffff
		border-radius: 4px
		margin: 0 auto
		padding: 20px 30px
		width: 100%
		max-width: 360px
		z-index: 2
	&__header
		position: relative
		padding: 20px 0
		z-index: 1
		.title
			color: #000000
			font-size: 2.25em
			font-weight: 100
			text-align: center
	&__footer
		position: relative
		font-size: .92em
		margin-top: 10px
		z-index: 2
  &-close
    position: absolute
    top: 0
    right: 0
    background-image: url(data:image/svg+xml;base64,PHN2Zw0KICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwM…l0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIgLz4NCiAgPC9nPg0KPC9zdmc+DQo=)
    background-color: #2f2e33
    background-position: center center
    background-repeat: no-repeat
    width: 8rem
    height: 8rem
    border: 0
    text-indent: 9999px
    outline: none
    cursor: pointer
    overflow: hidden
    z-index: 5
</style>
