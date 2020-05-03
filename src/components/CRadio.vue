<template>
  <label class="crystal-radio__container" :for="anchor">
    <input
      :id="anchor"
      class="crystal-radio"
      type="radio"
      v-bind="$props"
      @change="setValue"
    />
    <span class="crystal-radio__circle"></span>
    <span class="crystal-radio__label">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  model: {
    prop: "check",
    event: "change"
  },
  props: {
    check: [String, Number],
    name: String,
    value: [String, Number],
    checked: Boolean,
    disabled: Boolean,
    id: String
  },
  created() {
    if (this.checked) {
      this.setValue();
    }
  },
  anchor() {
    return this.id || this._uid + "-crystal-radio";
  },
  methods: {
    setValue() {
      this.$emit("change", this.value);
    }
  }
};
</script>
