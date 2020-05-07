<template>
  <div>
    <div class="crystal-select__container">
      <CInput
        class="crystal-select"
        @focus="show"
        v-model="privateValue"
        v-bind="$props"
        v-on="$listeners"
      >
        <template #label>
          <slot name="label"></slot>
        </template>
        <template #icon>
          <slot name="icon">
            <i class="crystal-select__icon"></i>
          </slot>
        </template>
      </CInput>
      <div class="crystal-select__list-container" v-show="isFocus">
        <ul class="crystal-select__list">
          <li
            class="crystal-select__element"
            v-for="(el, index) of list"
            :key="index"
            @click="select(el)"
          >
            <slot :el="el"> {{ el }} </slot>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { selectProps } from "@/props";

import CInput from "./CInput";

function outsideSub(fn) {
  global.addEventListener("focusin", fn);
  global.addEventListener("click", fn);
}

function outsideUnsub(fn) {
  global.removeEventListener("focusin", fn);
  global.removeEventListener("click", fn);
}

export default {
  model: {
    prop: "value",
    event: "selected",
  },
  props: selectProps,
  components: {
    CInput,
  },
  data: () => ({
    isFocus: false,
    privateValue: null,
  }),
  methods: {
    select(el) {
      this.$emit("selected", el);
      this.isFocus = false;
    },
    show() {
      this.isFocus = true;
    },
    hide(event) {
      if (!this.$el.contains(event.target)) {
        this.isFocus = false;
      }
    },
  },
  mounted() {
    outsideSub(this.hide);
  },
  beforeDestroy() {
    outsideUnsub(this.hide);
  },
  watch: {
    value(val) {
      this.privateValue = val;
    },
  },
};
</script>
