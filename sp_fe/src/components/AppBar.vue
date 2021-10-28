
<template>
  <!-- Верхняя панель окна работы с таблицами -->
  <v-app-bar app dense clipped-left flat prominent>
    <!-- Название отображаемой таблицы -->
    <v-toolbar-title>{{ kindTable }}</v-toolbar-title>
    <template v-slot:extension>
      <!-- Отображаемые вкладки - таблицы -->
      <!-- При выборе вкладки вызывается соответсвующий метод, который изменяет вид отображаемой таблицы -->
      <v-tabs color="red darken-3" show-arrows v-model="selectedTab">
        <v-tab
          v-for="(tab, i) in structureTables"
          :key="i"
          :id="`#tab-id-${i}`"
          :ref="`tabRef_${i}`"
          v-on:click="
            selectTab(tab.engNameTable, tab.rusNameTable, tab.listAttributes)
          "
        >
          {{ tab.rusNameTable }}
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  props: ["kindTable", "structureTables"],
  data: () => ({
    selectedTab: 0,
  }),
  methods: {
    // Результат выбора необходимой таблицы
    selectTab(engNameTable, rusNameTable, listAttributes) {
      console.log(engNameTable);
      this.$emit(
        "select-tab",
        { key: engNameTable, value: rusNameTable },
        listAttributes
      );
    },
  },
};
</script>