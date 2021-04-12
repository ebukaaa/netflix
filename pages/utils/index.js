// import SWR, { SWRConfig } from "swr";
import { useEffect, useState } from "react";
import { useBanner } from "./banner";
import { useHeader } from "./header";
import { useRow } from "./row";
import { request } from "./store/request.store";
import rows from "./store/rows.json";
import { homeStyles } from "./style.module.scss";

let initProps;
let putProps;
// let initError;
// let putError;

// async function fetcher(...args) {
//   return fetch(...args).then((response) => response?.json());
// }

function unmount({ set, value }) {
  return () => set(value);
}

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
    Header: useHeader,
    Banner: useBanner,
    Row: useRow,
  };
}
// export function useAppStore() {
//   return {
//     SWRConfig,
//     fetcher,
//   };
// }
export function useProps() {
  return {
    initProps,
    putProps,
    request,
    unmount,
  };
}
