import { useEffect, useMemo, useState } from "react";
import { useSVGs } from "../../svgs";
import { useProps as useAppProps } from "../..";
import {
  headerStyles,
  contentsStyles,
  show as showHeader,
} from "./style.module.scss";

let initShow;
let putShown;

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
  const { unmount } = useAppProps();
  const [isShown, show] = useState(false);
  updateShown({ isShown, show });
  useEffect(() => unmount({ set: show }), [unmount]);
  useEffect(() => updateShown({ isShown }), [isShown]);

  const { useLogo, useAvatar } = useSVGs();

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
    Avatar: useAvatar,
    Logo: useLogo,
  };
}
