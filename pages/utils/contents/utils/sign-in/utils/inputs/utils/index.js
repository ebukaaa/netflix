import { useEffect, useState } from "react";
import { useInput, unmount } from "tools";
import { inputsStyles } from "./style.module.scss";

let initInputs;
let putInputs;

const defaultInputs = {
  email: null,
  password: null,
};

function updateInputs({ inputs, setInputs }) {
  if (initInputs !== inputs) {
    initInputs = inputs;
  }
  if (setInputs && putInputs !== setInputs) {
    putInputs = setInputs;
  }
}

export function useStore() {
  const [inputs, setInputs] = useState(defaultInputs);
  updateInputs({ inputs, setInputs });
  useEffect(() => unmount({ setInputs }), []);
  useEffect(() => updateInputs({ inputs }), [inputs]);

  const { email, password } = inputs;

  return {
    inputsStyles,
    email,
    password,
    Input: useInput,
    setInputs,
  };
}
export function useProps() {
  return {
    initInputs,
    putInputs,
  };
}
