<template>
  <div>
    <div
      :class="[
        'crystal-input__container',
        { 'crystal-input_error': error },
        { 'crystal-input_icon': $slots.icon },
      ]"
    >
      <label class="crystal-input__label" v-if="$slots.label" :for="anchor">
        <slot name="label"></slot>
      </label>

      <div class="crystal-input__container">
        <input
          class="crystal-input"
          v-on="inputListeners"
          v-bind="$props"
          :id="anchor"
        />
        <span class="crystal-input__icon" v-if="$slots.icon">
          <slot name="icon"></slot>
        </span>
        <div class="crystal-input-error__container">
          <slot :error="error">
            <p class="crystal-input-error__element">
              {{ error }}
            </p>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inputProps } from "@/props";

export default {
  model: {
    prop: "value",
    event: "input",
  },
  props: inputProps,
  computed: {
    inputListeners() {
      return {
        ...this.$listeners,
        input: (e) => {
          this.$emit("input", e.target.value);
        },
      };
    },
    anchor() {
      return this.id || `${this._uid}-crystal-input`;
    },
  },
};
</script>
