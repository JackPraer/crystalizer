export const inputProps = {
  id: String,
  value: [String, Number],
  placeholder: String,
  type: String,
  error: [String, Object],
  disabled: Boolean,
  readonly: Boolean,
};

export const selectProps = {
  ...inputProps,
  list: Array,
};
