import { page } from "./style.module.scss";

let init;
let put;

// function update({ value, set }) {
//   if (init !== value) {
//     init = value;
//   }
//   if (set && put !== set) {
//     put = set;
//   }
// }

export function useStore() {
  // const [value, set] = useState(false);
  // update({ value, set });
  // useEffect(() => unmount({ set: set }), [unmount]);
  // useEffect(() => update({ value }), [value]);

  return { page };
}
export function useProps() {
  return {
    init,
    put,
  };
}
