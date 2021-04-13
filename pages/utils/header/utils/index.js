import { useEffect, useMemo, useState } from "react";
import Router from "next/router";
import { useLogo, useAvatar, unmount } from "tools";
import { useProps as useAppProps } from "../..";
import { useButton } from "./button";
import {
  headerStyles,
  contentsStyles,
  show as showHeader,
} from "./style.module.scss";

let initShow;
let putShown;

function onProfile() {
  Router.push("/profile");
}
function onDashboard() {
  Router.push("/dashboard");
}

function updateShown({ isShown, show }) {
  if (initShow !== isShown) {
    initShow = isShown;
  }
  if (show && putShown !== show) {
    putShown = show;
  }
}

function onScroll() {
  const { scrollY } = global;

  if (scrollY > 100) {
    if (initShow) {
      return;
    }
    putShown(true);
    return;
  }
  if (!initShow) {
    return;
  }
  putShown(false);
}

export function useStore() {
  const { initUser: isUser } = useAppProps();

  const [isShown, show] = useState(false);
  updateShown({ isShown, show });
  useEffect(() => unmount({ set: show }), []);
  useEffect(() => updateShown({ isShown }), [isShown]);

  useEffect(() => {
    const { addEventListener, removeEventListener } = window;
    addEventListener("scroll", onScroll);

    return () => removeEventListener("scroll", onScroll);
  }, []);

  return {
    headerStyles: useMemo(() => `${headerStyles} ${isShown && showHeader}`, [
      isShown,
    ]),
    contentsStyles,
    isUser,
    Avatar: useAvatar,
    Logo: useLogo,
    Button: useButton,
    onProfile,
    onDashboard,
  };
}
