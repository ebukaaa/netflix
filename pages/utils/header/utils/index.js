import { useEffect, useMemo, useState } from "react";
import Router from "next/router";
import { useLogo, useAvatar, unmount } from "tools";
import dynamic from "next/dynamic";
import { useProps as appProps } from "../..";
import {
  headerStyles,
  contentsStyles,
  show as showHeader,
} from "./style.module.scss";
import { useProps as loadingProps } from "../../../profile/utils/loading/utils";
import { useProps as mainProfileProps } from "../../../profile/utils/main/utils";
// import { useProps as profileProps } from "../../../profile/utils";

let initShow;
let putShown;

const useButton = dynamic(() =>
  import("./button").then((mod) => mod.useButton)
);

function onProfile() {
  const { initUser: user } = appProps();

  Router.push({
    pathname: "/profile",
    query: user,
  });
}
function onDashboard() {
  const { initUser: user } = appProps();
  // const {
  // initProps: { subscription },
  // } = profileProps();

  // if (subscription) {
  const { putShow } = loadingProps();
  const { putOpaque } = mainProfileProps();
  putOpaque(true);
  putShow(true);
  // }
  Router.push({
    pathname: "/dashboard",
    query: { id: user.id },
  });
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
  const [isShown, show] = useState(false);
  updateShown({ isShown, show });
  useEffect(() => unmount({ set: show }), []);
  useEffect(() => updateShown({ isShown }), [isShown]);

  useEffect(() => {
    const { addEventListener, removeEventListener } = window;
    addEventListener("scroll", onScroll);

    return () => removeEventListener("scroll", onScroll);
  }, []);

  const { initUser: isUser } = appProps();

  return {
    headerStyles: useMemo(() => `${headerStyles} ${isShown && showHeader}`, [
      isShown,
    ]),
    contentsStyles,
    isUser,
    Avatar: useAvatar,
    Logo: useMemo(() => useLogo, []),
    Button: useButton,
    onProfile,
    onDashboard,
  };
}
