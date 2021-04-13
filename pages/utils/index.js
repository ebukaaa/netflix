import { useEffect, useState } from "react";
import Router from "next/router";
import { auth, unmount } from "tools";
import { useHeader } from "./header";
import { useContents } from "./contents";
import { loginStyles } from "./style.module.scss";

let initUser;
let putUser;

function updateUser({ isUser, setUser }) {
  if (initUser !== isUser) {
    initUser = isUser;
  }
  if (setUser && putUser !== setUser) {
    putUser = setUser;
  }
}

export function useStore() {
  return {
    loginStyles,
    Contents: useContents,
  };
}
export function useAppStore() {
  const [isUser, setUser] = useState(null);
  updateUser({ isUser, setUser });
  useEffect(() => unmount({ set: setUser }), []);
  useEffect(() => updateUser({ isUser }), [isUser]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        const { email, uid: id } = user;

        setUser({
          id,
          email,
        });
        Router.replace("/dashboard");
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return {
    Header: useHeader,
  };
}
export function useProps() {
  return {
    initUser,
    putUser,
  };
}
