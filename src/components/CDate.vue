<template>
  <VInput
    type="date"
    @change="setDate"
    :value="value"
    v-bind="$props"
    v-on="$listeners"
  >
    <template #label>
      <slot name="label"></slot>
    </template>
    <template #icon>
      <slot name="icon">
        <i class="crystal-date__icon"></i>
      </slot>
    </template>
  </VInput>
</template>

<script>
import VInput from "./VInput";

export default {
  model: {
    prop: "value",
    event: "change"
  },
  components: {
    VInput
  },
  props: {
    error: String,
    value: String,
    disabled: Boolean
  },
  methods: {
    setDate(e) {
      this.$emit("change", e.target.value);
    }
  }
};
</script>
