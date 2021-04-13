import dynamic from "next/dynamic";
import { useAvatar, useLogo } from "./svgs";
import { auth } from "./firebase.store";

export const useInput = dynamic(() =>
  import("./input").then((mod) => mod.useInput)
);
export function unmount({ set, value }) {
  return () => set && set(value);
}

export { useAvatar, useLogo, auth };
