
<!-- Стартовая страница работы с сайтом -->
<template>
  <v-app>
    <v-row align="center" justify="center">
      <v-col cols="0" sm="0" md="0">
        <!-- Кнопка начала работы с сайтом -->
        <!-- Позволяет перейти на страницу авторизации -->
        <v-btn
          class="elevation-5"
          x-large
          color="red darken-3"
          dark
          v-on:click="$router.push('authorization')"
          >Начать работу</v-btn
        >
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    isStart: false,
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>