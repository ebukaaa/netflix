import Router from "next/router";
import { auth, db } from "tools";
import { useProps as useAppProps } from "../../../..";
import { useInputs } from "./inputs";
import { useProps as inputsProps } from "./inputs/utils";
import { signInStyles } from "./style.module.scss";

function onSignUp(event) {
  event.preventDefault();
  const { initInputs } = inputsProps();
  const { email, password } = initInputs;

  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {})
    .catch((error) => alert(error.message));
}
async function onSignIn(event) {
  event.preventDefault();
  const { initInputs } = inputsProps();
  const { email, password } = initInputs;

  await auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user: { email: userEmail, uid: id } }) => {
      const { putUser } = useAppProps();
      const newUser = {
        id,
        email: userEmail,
      };
      putUser(newUser);

      Router.replace({
        pathname: "/dashboard",
        query: { id },
      });
    })
    .catch((error) => alert(error.message));
}

export function useStore() {
  return {
    signInStyles,
    Inputs: useInputs,
    onSignIn,
    onSignUp,
  };
}
