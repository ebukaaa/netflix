import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { unmount } from "tools";
import { contentsStyles } from "./style.module.scss";

let initSignedIn;
let putSignIn;

const useMain = dynamic(() => import("./main").then((mod) => mod.useMain));
const useSignIn = dynamic(() =>
  import("./sign-in").then((mod) => mod.useSignIn)
);

function onSignIn() {
  putSignIn(true);
}

function updateSignedIn({ isSignedIn, signIn }) {
  if (initSignedIn !== isSignedIn) {
    initSignedIn = isSignedIn;
  }
  if (signIn && putSignIn !== signIn) {
    putSignIn = signIn;
  }
}

export function useStore() {
  const [isSignedIn, signIn] = useState(null);
  updateSignedIn({ isSignedIn, signIn });
  useEffect(() => unmount({ set: signIn }), []);
  useEffect(() => updateSignedIn({ isSignedIn }), [isSignedIn]);

  return {
    contentsStyles,
    isSignedIn,
    Main: useMain,
    SignIn: useSignIn,
  };
}
export function useProps() {
  return {
    initSignedIn,
    putSignIn,
    onSignIn,
  };
}
