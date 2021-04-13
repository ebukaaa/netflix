import { useEffect, useState } from "react";
import { unmount } from "tools";
import { loadingStyles } from "./style.module.scss";

let initShown;
let putShow;

function updateShown({ isShown, show }) {
  if (initShown !== isShown) {
    initShown = isShown;
  }
  if (show && putShow !== show) {
    putShow = show;
  }
}

export function useStore() {
  const [isShown, show] = useState(false);
  updateShown({ isShown, show });
  useEffect(() => unmount({ set: show }), []);
  useEffect(() => updateShown({ isShown }), [isShown]);

  return {
    loadingStyles,
    isShown,
  };
}
export function useProps() {
  return {
    initShown,
    putShow,
  };
}
