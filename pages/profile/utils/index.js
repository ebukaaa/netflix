import { db, unmount } from "tools";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { profileStyles } from "./style.module.scss";

let initProps;
let putProps;

const useMain = dynamic(() => import("./main").then((mod) => mod.useMain));
const useLoading = dynamic(() =>
  import("./loading").then((mod) => mod.useLoading)
);

function updateProps({ props, setProps }) {
  if (initProps !== props) {
    initProps = props;
  }
  if (setProps && putProps !== setProps) {
    putProps = setProps;
  }
}

export function useStore({ data }) {
  const [props, setProps] = useState(data);
  updateProps({ props, setProps });
  useEffect(() => unmount({ set: setProps }), []);
  useEffect(() => updateProps({ props }), [props]);

  return {
    profileStyles,
    Loading: useLoading,
    Main: useMain,
  };
}
export function useProps() {
  return {
    initProps,
    putProps,
    db,
  };
}
