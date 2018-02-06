<template>
  <div class="services">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Services',
  data () {
    return {
      title: 'Services'
    }
  }
}
</script>

<style lang="scss" scoped>
.services {
  & h1 {
    color: red
  }
}
</style>
