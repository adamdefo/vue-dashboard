<template>
  <div id="app" class="layout">
    <div id="note-main" class="note note--show" v-if="showNote">
      <div class="note__content">
        <div class="note__txt">
          <p><strong>GO TO HELL •</strong> Call <strong>or</strong> Txt <strong>(666) 666 6666</strong> <strong>•</strong> email <a href="mailto:fuckoff@ass.ru"><strong>fuckoff@ass.ru</strong></a></p>
          <span v-on:click="closeNote" class="note__close"></span>
        </div>
      </div>
    </div>
    <header class="header">
      <div class="header__container">
        <div class="header__logo"><a :to="rootLink.href" :title="rootLink.title" class="logo"><span>admin</span></a>
        </div>
        <div class="header__nav">
          <navigation></navigation>
        </div>
      </div>
    </header>
    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navigation from './components/navigation/Navigation'
export default {
  components: {
    'navigation': Navigation
  },
  name: 'app',
  data () {
    return {
      rootLink: {
        title: 'на главную',
        href: '/'
      },
      showNote: false
    }
  },
  methods: {
    closeNote: function () {
      this.showNote = false
    }
  }
}
</script>

<style lang="sass" src="./styles.sass"></style>
