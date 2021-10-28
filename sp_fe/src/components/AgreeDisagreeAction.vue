
<!-- Вспывающее окно для подтверждения удаления записи -->
<template>
  <!-- Если флаг dialogRemove активен, то появляется окно -->
  <v-dialog v-model="dialogRemove" max-width="460">
    <v-card>
      <!-- Текст отображаемый в диалоговом окне -->
      <v-card-title class="headline"
        >Вы действительно желаете удалить данную запись?
      </v-card-title>
      <v-card-text>
        После удаления данной записи вы больше не сможете ее просматривать!
      </v-card-text>
      <!-- Кнопки выбора действия - согласится с удалением или нет -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- Отмена удаления записи -->
        <v-btn color="red darken-1" text v-on:click="$emit('dialog-remove')">
          Нет
        </v-btn>
        <!-- Удаление записи -->
        <v-btn color="green darken-1" text v-on:click="$emit('remove-item')">
          Да
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialogRemove"], // переменная активации диалогового окна принятия о соглашении/отказе удаления элемента
  data: () => ({}),
};
</script>