import { useRef } from "react";

function onChange(setValue, name, { target: { value } }) {
  if (!name) {
    setValue(value);
    return;
  }
  setValue((old) => ({
    ...old,
    [name]: value,
  }));
}

export function useStore() {
  return {
    onChange,
  };
}
