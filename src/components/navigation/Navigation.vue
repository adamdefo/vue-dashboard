<template>
  <nav class="nav">
    <div class="nav__item" v-for="link in navLinks" :key="link.id">
      <router-link :to="link.href" class="nav__link"><span>{{ link.title }}</span></router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      navLinks: [
        {
          title: 'Блог',
          href: '/blog'
        },
        {
          title: 'Кинотека',
          href: '/kinoteka'
        }
      ]
    }
  }
}
</script>

<style lang="sass" src="./styles.sass" scoped></style>