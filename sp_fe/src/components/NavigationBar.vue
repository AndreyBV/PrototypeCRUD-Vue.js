
<!-- Левая навигационная панель -->
<template>
  <v-navigation-drawer app clipped permanent expand-on-hover>
    <!-- Отображение списка  видов таблиц, с которыми осуществляется работа -->
    <v-list-item-group dense color="red darken-1" v-model="selectedItem">
      <!-- При выборе элемента списка вызывается метод отображения вкладок таблиц -->
      <v-list-item
       
        link
        v-for="(kind, i) in kindTables"
        :id="`#list-item-id-${i}`"
        :key="i"
        :ref="`listItemRef_${i}`"
        v-on:click="selectedKindTable(kind.name, kind.listTables)"
      >
        <!-- Иконка,отображаемая рядом с названием видов таблиц -->
        <v-list-item-action>
          <v-icon>mdi-checkbox-blank-circle-outline</v-icon>
        </v-list-item-action>
        <!-- Отображаемое имя вида таблиц -->
        <v-list-item-content>
          <v-list-item-title>{{ kind.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "", // наименование группы таблиц
  props: ["kindTables"], // список групп таблиц
  data: () => ({
    selectedItem: 0
  }),
  destroyed: function () {
    // генерирование события автоматческого выбора вкладки
    this.cli();
  },

  methods: {
    // определение выбранной (текущей) группы таблиц
    selectedKindTable(kindName, kindListTables) {
      this.$emit("select-kind-table", kindName, kindListTables);
    },
    // событие автоматческого выбора вкладки
    cli() {
      console.log("AUTO CLICK");
      var kindTableElement = document.getElementById("#list-item-id-0");
      console.log(kindTableElement);
      kindTableElement.dispatchEvent(new MouseEvent("click"));
    },
  },
};
</script>