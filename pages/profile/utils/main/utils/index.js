import Router from "next/router";
import { db, useAvatar, auth, unmount } from "tools";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useMemo, useState } from "react";
import { useProps as appProps } from "../../../../utils";
import {
  mainStyles,
  plansStyles,
  leftStyles,
  subscribeStyles,
  disable as disableStyles,
  opaque,
} from "./style.module.scss";
import { useProps as loadingProps } from "../../loading/utils";
import { useProps as useProfileProps } from "../..";

let initOpaque;
let putOpaque;

function onSignOut() {
  const { putUser } = appProps();
  putUser(null);
  Router.replace("/");
  auth().signOut();
}
async function onSubscribe(id, isSubscribed) {
  /* // * Test details 
    card number: 4242 4242 4242 4242
    expiry: 04/24
    cvc: 424
  */

  if (isSubscribed) {
    return;
  }
  putOpaque(true);
  const { putShow } = loadingProps();
  putShow(true);
  const { initUser: user } = appProps();
  const doc = await db
    .collection("customers")
    .doc(user?.id)
    .collection("checkout_sessions")
    .add({
      price: id,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

  doc.onSnapshot(async (snap) => {
    const { error, sessionId } = snap.data();

    if (error) {
      alert(`An error occured ${error.message}. Please try again`);
    }
    if (sessionId) {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );
      stripe.redirectToCheckout({ sessionId });
    }
  });
}

function updateOpaque({ isOpaque, setOpaque }) {
  if (initOpaque !== isOpaque) {
    initOpaque = isOpaque;
  }
  if (setOpaque && putOpaque !== setOpaque) {
    putOpaque = setOpaque;
  }
}

export function useStore() {
  const [isOpaque, setOpaque] = useState(false);
  updateOpaque({ isOpaque, setOpaque });
  useEffect(() => unmount({ set: setOpaque }), []);
  useEffect(() => updateOpaque({ isOpaque }), [isOpaque]);

  const { initUser: user } = appProps();
  const {
    initProps: { products, subscription },
  } = useProfileProps() || {};

  return {
    mainStyles: useMemo(() => `${mainStyles} ${isOpaque && opaque}`, [
      isOpaque,
    ]),
    leftStyles,
    plansStyles,
    subscribeStyles,
    disableStyles,
    email: user?.email,
    products,
    subscription,
    Avatar: useAvatar,
    onSignOut,
    onSubscribe,
  };
}
export function useProps() {
  return {
    initOpaque,
    putOpaque,
  };
}
