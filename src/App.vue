<template>
  <div id="app">
    <h2>CInput</h2>
    <div class="elements__container">
      <CInput v-model="inputEl" />
      <CInput v-model="inputEl" error="error" />
      <CInput v-model="inputEl" disabled />
    </div>
    <h2>
      CSelect
    </h2>
    <div class="elements__container">
      <CSelect v-model="selectEl" :list="list" />
      <CSelect v-model="selectEl" :list="list" error="error" />
      <CSelect v-model="selectEl" :list="list" disabled />
    </div>
  </div>
</template>

<script>
import components from "@/components";
import "@/themes/default/main.scss";

export default {
  name: "app",
  components: {
    ...components
  },
  data: () => ({
    list: ["first", "second", "last"],
    inputEl: "input",
    selectEl: null
  }),
  methods: {
    search() {}
  }
};
</script>

<style scoped>
.elements__container {
  display: flex;
  justify-content: space-between;
}
</style>
