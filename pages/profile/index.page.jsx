import { useProps as profileProps, useStore } from "./utils";

export function useProfile(props) {
  const { profileStyles, Loading, Main } = useStore({ data: props });

  return (
    <main className={profileStyles}>
      <Loading />
      <Main />
    </main>
  );
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const { db } = profileProps();
  const products = {};

  await db
    .collection("products")
    .where("active", "==", true)
    .get()
    .then((docs) =>
      docs.forEach(async (doc) => {
        products[doc.id] = doc.data();
      })
    );

  for (let i = 0; i < Object.keys(products).length; i += 1) {
    const key = Object.keys(products)[i];
    await db
      .collection("products")
      .doc(key)
      .collection("prices")
      .get()
      .then((docs) =>
        docs.forEach(async (doc) => {
          products[key].prices = {
            id: doc.id,
            data: doc.data(),
          };
        })
      );
  }

  let subscription;
  await db
    .collection("customers")
    .doc(id)
    .collection("subscriptions")
    .get()
    .then((docs) =>
      docs.forEach(async (doc) => {
        subscription = {
          role: doc.data().role,
          current_period_end: doc.data().current_period_end.seconds,
          current_period_start: doc.data().current_period_start.seconds,
        };
      })
    );

  return {
    props: { products, subscription: subscription || null },
  };
}
export default useProfile;
