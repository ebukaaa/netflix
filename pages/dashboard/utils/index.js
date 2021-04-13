import { useEffect, useState } from "react";
import { auth, unmount, db } from "tools";
import { request } from "./store/request.store";
import { useBanner } from "./banner";
import { useRow } from "./row";
import rows from "./store/rows.json";
import { homeStyles } from "./style.module.scss";

let initProps;
let putProps;

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
    homeStyles,
    rows,
    Banner: useBanner,
    Row: useRow,
  };
}

export function useProps() {
  return {
    initProps,
    putProps,
    request,
    auth,
    db,
  };
}
