<template>
  <div>
    <Header />
    <h1>Это главная страница приложения</h1>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>