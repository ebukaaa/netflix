import { useProps as loginProps } from "../../../../contents/utils";
import { buttonStyles } from "./style.module.scss";

function onSignIn() {
  const { putSignIn } = loginProps();
  putSignIn(true);
}

export function useStore() {
  return {
    buttonStyles,
    onSignIn,
  };
}
