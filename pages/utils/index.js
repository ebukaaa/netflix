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
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (!user) {
        return;
      }
      Router.replace({
        pathname: "/dashboard",
        query: {
          id: user.uid,
        },
      });
    });
    return unsubscribe;
  }, []);

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
      if (!user) {
        setUser(null);
        Router.replace("/");
        return;
      }
      const { email, uid: id } = user;
      setUser({
        id,
        email,
      });
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
