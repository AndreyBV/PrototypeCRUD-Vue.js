
<!-- Окно авторизации пользвоателя -->
<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col md="3" sm="5">
        <v-card class="rounded-xl">
          <!-- Заголовок окна авторизации -->
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-1 basil--text">Вход в SPCS</h1>
          </v-card-title>
          <!-- Панель вкладок для выбора типа входа - авторизация или регистрация-->
          <v-tabs color="red darken-3" grow>
            <v-tab
              v-for="item in items"
              :key="item"
              v-on:click="currentAuth = item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
          <!-- Элементы в результате выбора вкладки -->
          <v-tabs-items>
            <v-card flat class="rounded-xl">
              <!-- Поля для ввода текста -->
              <v-card-text>
                <v-form class="ma-3">
                  <!-- Поле ввоад логина -->
                  <v-text-field
                    label="Логин"
                    prepend-icon="mdi-account"
                  ></v-text-field>
                  <!-- Поле ввода пароля -->
                  <v-text-field
                    label="Пароль"
                    prepend-icon="mdi-lock"
                    :rules="passwordRules"
                  ></v-text-field>
                </v-form>
                <!-- Кнопка для совершения авторизации или регистрации -->
                <v-btn
                  color="red darken-3"
                  block
                  class="mt-3"
                  type="submit"
                  v-on:click="$router.push('work-space')"
                  >{{ currentAuth }}</v-btn
                >
              </v-card-text>
            </v-card>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data: () => ({
    items: ["Вход", "Регистрация"],
    currentAuth: "",
    // Правила заполнения полей
    nameRules: [
      (value) => !!value || "Name is required",
      (value) =>
        (value && value.length >= 5) || "Name must be more than 5 characters",
    ],
    passwordRules: [
      (value) => !!value || "Password is required",
      (value) =>
        (value && value.length >= 5) || "Password must be than 4 symbols",
    ],
  }),

  methods: {
    // Автризация пользователя
    authorization() {
      // Открытие нововй страницы
      $router.push("work-space");
    },
  },

  watch: {},

  created() {
    // Формирвоание параметров при предварительном создании страницы
    if (this.items.length > 0) {
      this.currentAuth = this.items[0];
    }
    this.$vuetify.theme.dark = true;
  },
};
</script>
