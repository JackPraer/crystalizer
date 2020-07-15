<template>
  <div id="app">
    <h2>CInput</h2>
    <div class="elements__container">
      <CInput v-mask="phoneMask" v-model="inputEl" />
      <CInput v-mask="phoneMask" v-model="inputEl" error="error" />
      <CInput v-mask="phoneMask" v-model="inputEl" disabled />
    </div>
    <h2>
      CSelect
    </h2>
    <div class="elements__container">
      <CSelect v-model="selectEl" :list="list" />
      <CSelect v-model="selectEl" :list="list" error="error">
        <template #label>
          error
        </template>
      </CSelect>
      <CSelect v-model="selectEl" :list="list" disabled>
        <template #label>
          disabled
        </template>
      </CSelect>
      <CSelect v-model="selectEl" :list="list" readonly>
        <template #label>
          readonly
        </template>
      </CSelect>
    </div>
    <h2>
      CCalendar
    </h2>
    <div class="elements__container">
      <CCalendar>
        <template #date> asd </template>
      </CCalendar>
    </div>
  </div>
</template>

<script>
import components from "@/components";
import { mask } from "vue-the-mask";
import "@/themes/default/main.scss";

export default {
  name: "app",
  components: {
    ...components,
  },
  directives: { mask },
  data: () => ({
    list: ["first", "second", "last"],
    inputEl: "input",
    selectEl: null,
    phoneMask: "8(###)###-##-##",
  }),
  methods: {
    search() {},
  },
};
</script>

<style scoped>
.elements__container {
  display: flex;
  justify-content: space-between;
}
</style>
