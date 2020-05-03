<template>
  <div>
    <label class="crystal-input__label" v-if="$slots.label" :for="anchor">
      <slot name="label"></slot>
    </label>

    <div class="crystal-input__container">
      <input
        :class="[
          'crystal-input',
          { 'crystal-input_error': error },
          { 'crystal-input_icon': $slots.icon }
        ]"
        v-mask="mask"
        v-on="inputListeners"
        v-bind="$props"
        :id="anchor"
      />
      <span class="crystal-input__icon" v-if="$slots.icon">
        <slot name="icon"></slot>
      </span>
      <div class="crystal-input-error__container">
        <p class="crystal-input-error__element">
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { IMaskDirective } from "vue-imask";

export default {
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    value: [String, Number],
    mask: Object,
    placeholder: String,
    type: String,
    error: String,
    id: String,
    disabled: Boolean
  },
  directives: {
    mask: IMaskDirective
  },
  computed: {
    inputListeners() {
      return {
        ...this.$listeners,
        input: e => {
          if (this.type !== "date") {
            this.$emit("input", e.target.value);
          }
        }
      };
    },
    anchor() {
      return this.id || this._uid + "-crystal-input";
    }
  }
};
</script>
