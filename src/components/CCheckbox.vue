<template>
  <label class="crystal-checkbox__container" :for="anchor">
    <input
      :id="anchor"
      class="crystal-checkbox"
      type="checkbox"
      v-bind="$props"
      @change="setValue"
    />
    <span class="crystal-checkbox__box"></span>
    <span class="crystal-checkbox__label">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    checked: Boolean,
    disabled: Boolean,
  },
  computed: {
    anchor() {
      return this.id || `${this._uid}-crystal-checkbox`;
    },
  },
  methods: {
    setValue() {
      this.$emit("change", !this.checked);
    },
  },
};
</script>
