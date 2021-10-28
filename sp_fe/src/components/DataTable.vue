
<!-- Шаблон отображения таблицы работы с данными -->
<template>
  <div>
    <!-- show-expand -->
    <!-- :single-expand="singleExpand"
      :expanded.sync="expanded" -->

    <!-- Шаблон, отображаемой таблицы -->
    <v-data-table
      :headers="headersTable"
      :items="contentTable"
      item-key="id"
      class="elevation-1"
      :loading="loadingDataTable"
      no-data-text="Данные отсутствуют"
      loading-text="Данные загружаются..."
      hide-default-footer
      :page.sync="currentPage"
      :items-per-page="limit"
      @page-count="pageCount = $event"
    >
      <!-- Заголовок таблицы и кнопка создания или редактирования элемента -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ nameTab.value }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <!-- Вызов диалогового окна по созданию или редактирования записи -->
          <NewEditCard
            v-bind:headers="headersTable"
            v-bind:item="currentItem"
            v-bind:hardObjs="hardObjs"
            v-bind:dialogNewEdit="dialogNewEdit"
            v-bind:typeDialog="typeDialog"
            v-on:get-data-fields="getDataFields"
            v-on:type-dialog="
              dialogNewEdit = true;
              typeDialog = 'create';
            "
            v-on:dialog-newedit="
              dialogNewEdit = false;
              typeDialog = '';
            "
          />
        </v-toolbar>
      </template>
      <!-- Кнопки редактирования и удаления записи в каждой строке таблицы (дополнительный фукнционал таблицы) -->
      <template v-slot:[`item.actions`]="{ item }">
        <!-- Кнопка редактирования элемента -->
        <v-icon
          class="mr-2"
          @click="
            typeDialog = 'update';
            dialogNewEdit = true;
            currentItem = item;
          "
        >
          mdi-pencil
        </v-icon>
        <!-- Кнопки удаления элемента -->
        <v-icon
          color="red darken-1"
          @click="
            dialogRemove = true;
            currentItem = item;
          "
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <!-- Элементы пагинации -->
    <v-row no-gutters v-show="paginationVisible">
      <!-- Поле настройки числа отображаемых элементов в таблице -->
      <v-col col="3">
        <v-select
          class="pa-2"
          :value="limit"
          v-model="limit"
          :items="[5, 10, 20]"
          label="Число отображаемых элементов"
        ></v-select>
      </v-col>
      <!-- Поле выбора текущей страницы -->
      <v-col col="3">
        <v-pagination
          class="pa-2"
          color="red darken-1"
          v-model="currentPage"
          :length="Math.ceil(countItems / limit)"
          :total-visible="7"
          @input="updatePage"
        ></v-pagination>
      </v-col>
    </v-row>
    <!-- ?????? - Обновление данных в таблице -->
    <div class="col-md-6">
      <router-view @refreshData="refreshList"></router-view>
    </div>
    <!-- Вызов диалогового окна удаления записи окно удаления записи -->
    <AgreeDisagreeAction
      v-bind:dialogRemove="dialogRemove"
      v-bind:contentTable="contentTable"
      v-on:remove-item="removeItem"
      v-on:dialog-remove="dialogRemove = false"
    />
  </div>
</template>


<script>
// Подключнеие необходимых файлов
import HTTP from "../http-common";
import NewEditCard from "@/components/NewEditCard";
import AgreeDisagreeAction from "@/components/AgreeDisagreeAction";

export default {
  props: ["nameTab", "attributesTab"],
  // props: ["headers", "desserts"],
  data: () => ({
    limit: 5, // число отображаемых элементов в таблице
    offset: 0, // элемент, с которого начать отображение в таблице
    countItems: 0, // общее количество элментов для выбранной таблицы
    pageCount: 0, // количество страниц необходимы для отображение текущих данных с заданными настройками пагинации
    currentPage: 1, // текущая страница для отображеия данных
    footerProps: {}, // настройка футера пагнизации
    loadingDataTable: false, // строка для отображения процесса загрузки данных
    paginationVisible: false, // визуализация строки пагинации в зависимсоти от пустоты данных в таблице
    dialogRemove: false, // переменная, определяющая открытие диалогового окна удаления выбранного элемента
    dialogNewEdit: false, // переменная, определяющая открытие диалогового окна
    typeDialog: "", // тип диалогового окна для создания/редактирования элемента
    currentItem: [], // текущий элемент для редактирвоания или удаления
    dataFields: {}, //
    headersTable: [], // заголовки таблицы
    contentTable: [], // содержимое отображаемой таблицы
    hardObjs: {}, // список сложных (вложенных) объектов
    structureTables: [], //структура текущей таблицы с информацией о заголовке полей (рус и англ.) и их типа
  }),
  components: {
    NewEditCard,
    AgreeDisagreeAction,
  },
  watch: {
    // обновелние страницы при смене количества отображаемых элементов на ней
    limit: function () {
      this.refreshList();
    },
    // отслеживание смены выбранной таблицы
    nameTab: function () {
      this.currentPage = 1;
      this.updatePage(this.currentPage);
      this.headersTable = [];
      // перебор атриббутов таблицы для формирования заголовков таблицы, а также формирвоания данных сложных структур
      this.attributesTab.forEach((element) => {
        var el = {
          text: element.rusNameAttribute,
          value: element.engNameAttribute,
          type: element.typeAttribute,
          regularExp: element.regularExp,
          regularExpMessage: element.regularExpMessage,
        };
        // формирование списка заголовков таблиц
        this.headersTable.push(el);
        // получение структуры сложного (вложеного) объекта
        if (element.typeAttribute == "object") {
          var obj = element.engNameAttribute;
          HTTP.get("/" + obj + "s/List/0/-1")
            .then((res) => {
              this.hardObjs[obj] = res.data;
            })
            .catch((err) => {
              console.log(err);
              this.loadingDataTable = false;
            });
        }
      });
      var actionBtn = { text: "Действие", value: "actions", sortable: false };
      this.headersTable.push(actionBtn);
    },
  },

  methods: {
    // метод обновления страницы
    updatePage(page) {
      console.log(page);
      this.offset = (this.currentPage - 1) * this.limit;
      this.refreshList();
    },
    // формирование данных из полей ввода из диалогового окна создания элементов или их редактирования
    getDataFields(dataFields, type) {
      this.dataFields = dataFields;
      if (type == "create") {
        this.addItem();
      } else if (type == "update") {
        this.editItem();
      }
      this.dialogNewEdit = false;
    },
    // Получение количества элемнетов таблицы
    getColuntItems() {
      HTTP.get("/" + this.nameTab.key + "/CountItems")
        .then((res) => {
          this.countItems = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // метод преподготовки данных для отображения
    prepearingDataForShow(data) {
      console.log("prepearingDataForShow");
      console.log(data);
      console.log(this.headersTable);
      // Перебор данных
      for (var i in data) {
        var item = data[i];

  
        // Перебор содержимого сложного объекта
        for (var key in item) {
          var el = item[key];

          
          if (typeof el == "object" && el != null && el.infoField) {
            console.log("                    ////////////////////////////////////////****////");
            console.log(key);
            console.log(el.infoField);
            // Смена отображаемой информации для сложных объектов
            item[key] = el.infoField;
          }
          // поиск полей дат
          for (var keyDate in this.headersTable) {
            if (
              key == this.headersTable[keyDate].value &&
              this.headersTable[keyDate].type == "date"
            ) {
              console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
              console.log(item[key]);
              var dateConvert = new Date(item[key]);
              var month = dateConvert.getUTCMonth(); //months from 1-12
              var day = dateConvert.getUTCDate();
              var year = dateConvert.getUTCFullYear();

              item[key] = year + "-" + pad(month + 1) + "-" + pad(day);
              // item[key] = new Date(year, month, day).toISOString('yyyy-dd-MM')
            }
          }
        }
      }
      function pad(number) {
        if (number < 10) {
          return "0" + number;
        }
        return number;
      }
    },
    // метод получения содерижмого таблицы
    async getList() {
      // запуск индикатора загрузки данных
      this.loadingDataTable = true;
      this.getColuntItems();
      //запрос на получение данных с учетом пагинации
      await HTTP.get(
        "/" + this.nameTab.key + "/List/" + this.offset + "/" + this.limit
      )
        .then((res) => {
                console.log("CONTENT TABLE")
          console.log(res.data)
          this.contentTableWithObj = res.data;
          this.prepearingDataForShow(res.data);
          // this.hardObjs = this.hardObjs;
          this.contentTable = res.data;
          this.loadingDataTable = false;

          // Если таблица пустая, то скрыть элементы пагинации
          if (this.contentTable.length == 0) {
            this.paginationVisible = false;
          } else {
            this.paginationVisible = true;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loadingDataTable = false;
        });
    },
    // Метод обновления содержимого таблицы
    refreshList() {
      this.getList();
    },

    // Метод добавления нового элемента в табилцу
    addItem() {
      // console.log(this.dataFields);
      HTTP.post("/" + this.nameTab.key + "/Create", this.dataFields)
        .then((res) => {
          // this.contentTable = res.data;
          console.log(res.data);
          this.refreshList();
          // this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
      this.dataFields = {};
    },
    // Получение выбраннного элемента таблицы
    getCurrentIndexRowTable(item) {
      const index = this.contentTable.indexOf(item);
      var element = this.contentTable[index];
      return element;
    },
    // Метод редактирования выбранного элемента таблицы
    editItem(item) {
      var element = this.getCurrentIndexRowTable(this.currentItem);
      var idRecord = element.id;

      // console.log("Идентификатор выделенной записи: " + idRecord);
      // console.log("/" + this.nameTab.key + "/Update/" + idRecord);

      HTTP.put("/" + this.nameTab.key + "/Update/" + idRecord, this.dataFields)
        .then((res) => {
          // this.contentTable = res.data;
          console.log(res.data);
          this.refreshList();
        })
        .catch((err) => {
          console.log(err);
        });
      this.dataFields = {};
    },
    // Метод логического удаления записи из таблицы
    removeItem() {
      this.dialogRemove = false;
      var element = this.getCurrentIndexRowTable(this.currentItem);
      var idRecord = element.id;
      var data = {
        id: idRecord,
      };
      console.log("Идентификатор выделенной записи: " + idRecord);
      console.log("/" + this.nameTab.key + "/LogicalDestroy/" + idRecord);

      HTTP.put("/" + this.nameTab.key + "/LogicalDestroy/" + idRecord, data)
        .then((res) => {
          // this.contentTable = res.data;
          console.log(res.data);
          this.refreshList();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // иницилизаця структуры таблицы
    init() {
      this.countPage = Math.ceil(this.countItems / this.limit);
      console.log("itemsLength");
      console.log(this.countItems);
      this.footerProps = {
        "items-per-page-options": [5, 10, 20],
      };
    },
  },
  mounted() {
    this.init();
  },
};
</script>