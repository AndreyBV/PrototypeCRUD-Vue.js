
<!-- Основная форма для работы с таблицами -->
<template>
  <v-app id="inspire">
    <!-- Навигационная панель слева -->
    <NavigationBar
      v-bind:kindTables="kindTables"
      v-on:select-kind-table="selectKindTable"
    />
    <!-- Шапка формы -->
    <AppBar
      v-bind:kindTable="nameKind"
      v-bind:structureTables="structureTables"
      v-on:select-tab="selectTab"
    />
    <!-- Основное тело формы -->
    <v-main class="pt-0 pl-0">
      <v-container fluid>
        <v-row align="start" justify="center">
          <v-col>
            <v-alert dense v-show="messageAction" v-bind:type="messageStyle">{{
              messageAction
            }}</v-alert>
            <!-- Основная таблица с данными -->
            <DataTable
              v-show="visibleTable"
              v-bind:nameTab="nameTab"
              v-bind:attributesTab="attributesTab"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Подвал формы -->
    <v-footer app>
      <span> &copy; {{ new Date().toISOString() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
// Импорт файлов и других VUE компонент
// import {Ax} from '@/http-common.js'
import AppBar from "@/components/AppBar";
import HTTP from "../http-common";
import DataTable from "@/components/DataTable";
import NavigationBar from "@/components/NavigationBar";

export default {
  // Наименование VUE компонента
  name: "catalogs",
  // Регистрация подключаемых компонент
  components: {
    NavigationBar,
    AppBar,
    DataTable,
  },
  // Способ передачи данных из родительского компонента ниже в дочерний (через props принимаем, а передавать можем через v-bind)
  // Также для взаимодействия между родительским и дочерними копонентами может использвоатся функция $emit
  props: [],
  // Основное приватное хранилище текущего компонента, в котором можно хранить любые данные
  data: () => ({
    nameKind: "", // выбранный вид (группа) таблиц
    nameTab: "", // выбранная таблица
    attributesTab: [], // список атрибутов выбранной таблицы
    visibleTable: false, // флаг отображения/скрытия таблицы
    messageAction: null, // форма вывода дополнительный сообщений над таблицей (не активна)
    messageStyle: "success", // тип дополнительного сообщения
    timeoutId: null, // таймаут отображения дополнительного сообщения
    kindTables: [], // список видов таблиц
    structureTables: [], // структура таблиц
  }),

  // Methods - методы реализующий основной функционал, чаще всего используется для реализации ответной реакции на клики и события
  methods: {
    // Методы отображения/скрытия дополнительных сообщений
    // hideMessage() {
    //   this.timeoutId = setTimeout(() => {
    //     this.messageAction = null;
    //     this.timeoutId = null;
    //   }, 5000);
    // },
    // destroyMessage() {
    //     this.messageAction = null;
    //     clearTimeout(this.hideTimeout);
    // },
    // getMessageChild(message, type) {
    //   this.messageAction = message;
    //   this.messageStyle = type;
    // },
    // Формирование переменной, определяющей выделенную группу таблиц
    selectKindTable(nameKind, structureTables) {
      this.nameKind = nameKind;
      this.structureTables = structureTables;
    },
    // Формирование переменной, определяющей выделенную таблицу
    selectTab(nameTab, attributesTab) {
      this.nameTab = nameTab;
      this.attributesTab = attributesTab;
      this.visibleTable = true;
    },
    // Получение списка видов (групп) таблиц
    getStructureTable() {
      // listTables
      HTTP.get("/listKindTables/ListAll")
        .then((res) => {
          this.kindTables = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getStructureTable();
    console.log("this.kindTables");
    console.log(this.kindTables);
    // this.selectTab( this.kindTables)
    // this.$refs.listItemRef_0.click();
    // this.$refs.tabRef_0.click();
  },
  // Computed - схоже с data, но также может иметь некоторую пользовательскую логику, которая кэшируется на основе его зависимостей
  // Часто используется для фильтрации уже имеющихся данных
  // Позволяет отслеживать данные data производить над ними вычисления и выводить сразу на форму
  // Запускается только в том случае если какая-либо из его зависимых прееменных измениться.
  // По умолчанию работает как геттер, но можно установить и сеттер
  // Не стоит использовать: для асинхронных операций, если ВС не содержит никаких реактивных зависимостей
  computed: {},

  // Watch - позволяют заглянуть в систему рекативности и отслеживать изменения свойств объектов
  // Просто следит за свойством для любых изменений
  // Пример - отслеживание изменений нумератора
  watch: {
    // Отсеживание измений доп. сообщений - запуск таймера для его скрытия
    messageAction: function () {
      console.log(this.timeoutId);
      if (this.timeoutId != null) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
      this.hideMessage();
    },
  },

  // В процессе работы приложение VUE проходит через ряд этапов жизненного цикла и спомощью специальных методов можно вызвать некоторые дествия на этих этапах
  // Вызывается конструктор VUE
  // Перед создание объекта вызывается метод - beforeCreate()
  // Этап инициализации объекта VUE, установка его данных и методов
  // После создания объекта VUE вызывается метод - created()
  // Выполнение компиляции шаблона
  // Поле - beforeMount()
  // Элемент html, ккоторому прикреплен объект VUE, заменятся скомпилированным шаблоном
  // Далее - mounted(), в результате шаблон прикреплен к DOM и можно с ним работать
  // Также, если обновляются данные объекта VUE, то вызываются методы - beforeUpdate() - рендеринг DOM - update()
  // При завершении работы приложения вызывается метод beforeDestroy()
  // В конце вызывается метод destroyed()
  // mounted() {
  //   this.selectKindTable(this.nameKind, this.structureTables);
  // },
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>