export const getLabelValue = (optionProp) => {
  const { label, value } =
    typeof optionProp === 'string' || typeof optionProp === 'number'
      ? {
          label: optionProp,
          value: optionProp,
        }
      : optionProp

  return {
    label,
    value,
  }
}
