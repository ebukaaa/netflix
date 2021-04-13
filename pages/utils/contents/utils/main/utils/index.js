import { useProps as useLoginProps } from "../..";
import { mainStyles } from "./style.module.scss";

export function useStore() {
  const { putSignIn } = useLoginProps();

  return { mainStyles, putSignIn };
}
