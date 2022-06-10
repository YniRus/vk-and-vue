<template>
  <div class="error">
    <h1>Ошибка {{ title }}</h1>
    <router-link to="/">На главную</router-link>
  </div>
</template>

<script>
export default {
  name: 'Error',

  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
