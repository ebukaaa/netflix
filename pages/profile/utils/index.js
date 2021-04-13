import Router from "next/router";
import { useAvatar, auth } from "tools";
import { useProps as useAppProps } from "../../utils";
import { profileStyles } from "./style.module.scss";

let init;
let put;

function onSignOut() {
  Router.replace("/");
  auth().signOut();
}

// function update({ value, set }) {
//   if (init !== value) {
//     init = value;
//   }
//   if (set && put !== set) {
//     put = set;
//   }
// }

export function useStore() {
  const { initUser: user } = useAppProps();
  // const [value, set] = useState(false);
  // update({ value, set });
  // useEffect(() => unmount({ set: set }), [unmount]);
  // useEffect(() => update({ value }), [value]);

  return {
    profileStyles,
    email: user?.email,
    Avatar: useAvatar,
    onSignOut,
  };
}
export function useProps() {
  return {
    init,
    put,
  };
}
