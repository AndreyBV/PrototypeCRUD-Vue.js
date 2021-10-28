<template>
  <!-- Окно создание новой записи таблицы или редактирование имеющейся  -->
  <v-dialog v-model="dialogNewEdit" max-width="500px" persistent>
    <!-- Кнопка добавления нового элемента в таблицу -->
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="red darken-3"
        v-bind="attrs"
        v-on="on"
        v-on:click="$emit('type-dialog')"
      >
        Новый элемент
      </v-btn>
    </template>
    <!-- Окно создания новой записи таблицы или редактирование имеющейся  -->
    <v-card>
      <!-- Заголовок окна, отображающий тип взаимодействи (создание или редактирование) -->
      <v-card-title>
        <span class="headline">{{ titleDialog }}</span>
      </v-card-title>
      <!-- Поля, которые необходимо заполнить для добавления или редактирвоания записи (генерируются автоматически) -->
      <v-card-text>
        <v-container>
          <!-- :key="field" -->
          <v-row v-for="(field, i) in headers" :key="field.text">
            <!-- В зависимости от типа полей объекта генерируется необходимый вид поля ввода -->
            <v-col v-if="field.text != 'Действие'">
              <!-- Текстовое поле ввода (присутствует валидация вводимых значений) -->
              <v-text-field
                v-if="field.type != 'object'"
                prepend-inner-icon="mdi-border-color"
                color="light-green darken-3"
                :label="field.text"
                :type="field.type"
                @input="
                  pattern(
                    dataFieldsLocal[field.value],
                    field.regularExp,
                    field.regularExpMessage,
                    field.value
                  )
                "
                :error-messages="errorMessage[field.value]"
                v-model.trim="dataFieldsLocal[field.value]"
              ></v-text-field>
              <!-- :value="dataFieldsLocal[field.value]" -->
              <!-- Поле выбора элементов для сложных объектов (присутсвует валидация выбранного элемента) -->
              <v-autocomplete
                v-else
                filled
                dense
                :label="field.text"
                :items="hardObjs[field.value]"
                item-text="infoField"
                item-value="id"
                item-color="light-green darken-3"
                color="light-green darken-3"
                v-model.trim="selectedItemHO[field.value]"
                :error-messages="errorMessage[field.value]"
                @input="testSelected($event, field.value)"
              ></v-autocomplete>
              <!-- :auto-select-first="autoselectFirstItem" -->
              <!-- hardObjs[field.value][0] -->
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <!-- Группа кнопок для выолнения основного действия -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- Закрытие окна без изменений -->
        <v-btn color="red darken-1" text v-on:click="close()"> Закрыть </v-btn>
        <!-- Принятие изменений (кнопка активируется в зависимости от результатов валидации всех полей) -->
        <v-btn
          color="red darken-1"
          text
          :disabled="fieldsInvalidRes"
          v-on:click="save()"
        >
          Принять
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- Диалоговое окно создания нового элемента -->
  </v-dialog>
  <!-- Диалоговое окно создания нового элемента -->
</template>


<script>
export default {
  props: ["headers", "item", "hardObjs", "dialogNewEdit", "typeDialog"],
  data: () => ({
    dataFieldsLocal: {}, // данные из полей
    fieldsInvalid: {}, // список, содержащий информацию о валидности полей
    fieldsInvalidRes: true, // итоговый результат валидности всех полей вместе (если хотя бы одно поле не валидно, то данная переменная принимает значение false)
    errorMessage: {}, // список ошибок, отображаемый для каждого невалидного поля
    autoselectFirstItem: false,
    selectedItemHO: {},
    titleDialog: {},
  }),

  // updated() {
  //   console.log("Update()");
  //   // if (Object.keys(this.errorMessage).length > 0) this.errorMessage = {}
  //   this.startTestPattern();
  // },
  watch: {
    typeDialog: function () {
      this.titleDialog = this.formTitle();
      this.startTestPattern();
    },
  },

  computed: {
    // метод формирования содержимого диалогового окна в зависимсоти от его типа (создаине или редактирование)
  },
  // updated: function() {
  //   console.log("MMMM")
  //   this.startTestPattern()
  // },

  methods: {
    formTitle() {
      var titleDialog = "";
      console.log("DDDDDDDDDDDDDDDDD");
      console.log(this.typeDialog);
      if (this.typeDialog == "create") {
        this.dataFieldsLocal = {};
        titleDialog = "Создание элемента";

        for (const key in this.hardObjs) {
          console.log(key);
          console.log(this.hardObjs);
          if (this.hardObjs[key].length > 0)
            this.selectedItemHO[key] = this.hardObjs[key][0].id;
        }

        // console.log(this.item)
        // console.log(this.hardObjs)
        // for (const key in this.hardObjs) {
        //   if (this.hardObjs[key])
        //     this.selectedItemHO[key] = this.item[
        //       "id" + key.charAt(0).toUpperCase() + key.slice(1)
        //     ];
        // }
        // console.log("this.selectedItemHO");
        // console.log(this.selectedItemHO);
      } else if (this.typeDialog == "update") {
        titleDialog = "Редактирование элемента";
        console.log("this.item");
        console.log(this.item);
        console.log(this.hardObjs);
        for (const key in this.item) {
          console.log(key);
          if (Object.keys(this.hardObjs).includes(key))
            this.selectedItemHO[key] = this.item[
              "id" + key.charAt(0).toUpperCase() + key.slice(1)
            ];
        }
        console.log("this.selectedItemHO");
        console.log(this.selectedItemHO);

        this.dataFieldsLocal = Object.assign({}, this.item);
      }
      console.log("this.dataFieldsLocal");
      console.log(this.dataFieldsLocal);
      return titleDialog;
    },
    // начальная проверка полей по паттернам
    startTestPattern() {
      console.log("this.typeDialog AAAAAAAAAAAAAA");
      console.log(this.typeDialog);
      console.log(this.errorMessage);
      if (this.typeDialog == "update") {
        for (const key in this.headers) {
          var field = this.headers[key];
          if (field.text != "Действие") {
            if (field.type != "object") {
              this.pattern(
                this.dataFieldsLocal[field.value],
                field.regularExp,
                field.regularExpMessage,
                field.value
              );
              console.log("AAAAAAAAAAAAAA");
              console.log(this.fieldsInvalid);
              console.log(this.fieldsInvalidRes);
            } else {
              this.testSelected(this.selectedItemHO[field.value], field.value);
            }
          }
        }
      } else if (this.typeDialog == "create") {
        for (const key in this.headers) {
          //    console.log(i)
          console.log("i");
          console.log(key);
          var field = this.headers[key];
          if (field.text != "Действие") {
            if (field.type == "object") {
              console.log(this.selectedItemHO);
              this.testSelected(this.selectedItemHO[field.value], field.value);
            }
          }
        }
      }
    },
    // получение количества невалидных полей
    getCountInvalid() {
      var countInvalid = 0;
      console.log(this.fieldsInvalid);
      // наполнение счетчика не валидных полей
      for (const key in this.fieldsInvalid) {
        var element = this.fieldsInvalid[key];
        console.log("element -=====");
        console.log(element);
        if (element == true) countInvalid++;
      }
      // формирование итогового решения о валидности всех введенных данных
      if (
        Object.keys(this.fieldsInvalid).length ==
          Object.keys(this.headers).length - 1 &&
        countInvalid > 0
      ) {
        this.fieldsInvalidRes = true;
      } else if (
        Object.keys(this.fieldsInvalid).length ==
          Object.keys(this.headers).length - 1 &&
        countInvalid == 0
      ) {
        this.fieldsInvalidRes = false;
      } else this.fieldsInvalidRes = true;
    },
    // шаблон для валидации полей в реальном времени
    pattern: function (value, strRegExp, regExpMsg, key) {
      console.log("PATTERN -----------");
      // убрать сообщение об ошибке для вводимого в данный момент поля
      delete this.errorMessage[key];
      // если тип поля неопределен, то выводим сообщение о пустоте строки
      if (typeof value == "undefined") {
        this.fieldsInvalid[key] = true;
        this.getCountInvalid();
        const message = "Строка не должна быть пустой";

        this.errorMessage[key] = message;
        return message;
        // если количество регулярных выражений и сообщений для них совпадает и строка регулярного выражения не пуста, то выполнить проверку
      } else if (
        strRegExp.length == regExpMsg.length &&
        strRegExp.length != 0
      ) {
        // переменная, определяющая результат теста поля на валидацию
        var resTest;
        // console.log("value---------------------");
        // console.log(value);
        // перебор паттернов (регулярных выражений) для текущего поля
        for (var i = 0; i < strRegExp.length; i++) {
          console.log(`REG EXP: ${strRegExp[i]}`);
          var re = new RegExp(strRegExp[i]);
          resTest = re.test(String(value));
          console.log(`RES TEST: ${resTest}`);
          // если поле не валидно, то установить для поля состояние невалидности, а также добавить соответсвующеее сообщение об ошибке
          if (!resTest) {
            this.fieldsInvalid[key] = true;
            console.log("this.errorMessage ==========");
            console.log(this.errorMessage);

            this.errorMessage[key] = regExpMsg[i];
            // произвести перерасчет количества валидных полей
            this.getCountInvalid();
            return regExpMsg[i];
          }
        }
        // если текущее поле ввода соответсвует всем паттернам, то установить статус его валидности
        this.fieldsInvalid[key] = false;
        // произвести перерасчет количества валидных полей
        this.getCountInvalid();
        return resTest;
        // в случае если количество регулярных сообщений и сообщений ошибок для них не совпадает, то то вывести соотвествующее собщение и сделать поле не валидным
      } else {
        const message =
          "Количество регулярных выражений и сообщений для них не совпадает!";
        this.errorMessage[key] = message;
        console.log(message);
        this.fieldsInvalid[key] = false;
        this.getCountInvalid();
        return message;
      }
    },
    // проверка выпадающего элемента на выделенный элемент (для сложных объектов)
    testSelected(selectedValue, key) {
      console.log("selectedValue ----------------------");

      console.log(selectedValue);
      console.log(key);
      if (selectedValue) {
        this.fieldsInvalid[key] = false;
        delete this.errorMessage[key];
      } else {
        this.fieldsInvalid[key] = true;
        this.errorMessage[key] = message;
      }
    },
    // объединене полей на выходе
    concatDataFields(baseJson, hardJson) {
      if (Object.keys(hardJson).length > 0) {
        for (const key in hardJson) {
          baseJson[key] = hardJson[key];
        }
      }
      // console.log(baseJson);
    },
    // Обработка события закрытия окна

    // dataFieldsLocal: {}, // данные из полей
    // fieldsInvalid: {}, // список, содержащий информацию о валидности полей
    // fieldsInvalidRes: true, // итоговый результат валидности всех полей вместе (если хотя бы одно поле не валидно, то данная переменная принимает значение false)
    // errorMessage: {}, // список ошибок, отображаемый для каждого невалидного поля
    // autoselectFirstItem: false,
    // selectedItemHO: {},
    close() {
      this.errorMessage = {};
      this.fieldsInvalid = {};
      this.fieldsInvalidRes = true;
      this.dataFieldsLocal = {};
      this.$emit("dialog-newedit");
    },
    // Обработка события открытия окна
    save() {
      if (!this.fieldsInvalidRes) {
        this.errorMessage = {};
        this.fieldsInvalid = {};
        this.fieldsInvalidRes = true;
        // this.dataFieldsLocal = {};
        console.log("this.dataFieldsLocal");
        console.log(this.dataFieldsLocal);
        this.concatDataFields(this.dataFieldsLocal, this.selectedItemHO);
        console.log(this.dataFieldsLocal);
        this.$emit("get-data-fields", this.dataFieldsLocal, this.typeDialog);
        this.$emit("dialog-newedit");
      }
    },
    // init() {
    //   this.dataFieldsLocal = {}; // данные из полей
    //   this.fieldsInvalid = {}; // список, содержащий информацию о валидности полей
    //   this.fieldsInvalidRes = true; // итоговый результат валидности всех полей вместе (если хотя бы одно поле не валидно, то данная переменная принимает значение false)
    //   this.errorMessage = {}; // список ошибок, отображаемый для каждого невалидного поля
    //   this.autoselectFirstItem = false;
    //   this.selectedItemHO = {};
    // },
    // mounted: function () {
    //   this.init();
    // },
  },
};
</script>


   <!-- SelectedItemHardObject(value, field) {
    //   console.log(value);
    //   console.log(field);
    //   this.dataFieldsLocal[field] = value;
    // }, -->

              <!-- @change="SelectedItemHardObject($event, field.value)" -->
              <!-- v-model.trim="dataFieldsLocal[field.value]" -->
              <!-- v-else
                :label="field.text"
                v-for="obj in hardObjs[field.value]"
                :key="obj.id"
                :items="obj.infoField" -->