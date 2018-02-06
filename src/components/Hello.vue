<template>
  <div class="b-services">
    <h1>{{ title }}</h1>
    <div class="grid clr">
      <div class="grid__column">
        <div class="grid__item">
          <h2 class="ttl grid__ttl">Брови</h2>
          <ul class="list">
            <li>Коррекция</li>
            <li>Окрашивание</li>
            <li>Отращивание и реставрация</li>
            <li>Архитектура</li>
            <li>Биотатуаж</li>
            <li>Осветление и тонирование</li>
            <li>Перекрытие неудачного ПМ</li>
            <li>Мужская коррекция</li>
            <li>Fashion оформление</li>
            <li>Ламинирование</li>
          </ul>
        </div>
      </div>
      <div class="grid__column">
        <div class="grid__item">
          <h2 class="ttl grid__ttl">Ресницы</h2>
          <ul class="list">
            <li>Ламинирование</li>
            <li>Lashbotox</li>
            <li>Окрашивание</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="b-txt">
      <div class="content">
        <p>Please refer to our FAQ section for more information or CONTACT US with any questions you may have about any of our services. 
          Prices listed do not include applicable taxes. All prices are subject to change without notice. </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data () {
    return {
      title: 'Записаться онлайн'
    }
  }
}
</script>

<style lang="scss" scoped>
.b-txt {
  position: relative;
  border-top: 2px solid #cecece;
  border-bottom: 2px solid #cecece;
  margin: 3rem auto;
  text-align: center;
  width: 760px;
  & > .content {
    color: #232323;
    padding: 3rem 5rem;
    & p {
      margin: 0;
    }
  }
}

.grid {
  position: relative;
  margin: 0 auto;
  padding: 0 20px;
  width: 1000px;
  &__ttl {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    margin: 0;
    &:after {
      content: '';
      display: block;
      background: #ffffff;
      margin: 25px auto;
      height: 1px;
      width: 55px;
    }
  }
  &__column {
    float: left;
    padding: 15px;
    height: 100%;
    width: 50%;
  }
  &__item {
    background: #000000;
    color: #ffffff;
    padding: 30px;
  }
}

.list {
  list-style: none;
  & > li {
    font-size: 1.5rem;
    margin: 15px 0;
  }
}

</style>