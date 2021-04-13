import { useStore } from "./utils";

export function useMain() {
  const {
    mainStyles,
    leftStyles,
    plansStyles,
    subscribeStyles,
    disableStyles,
    email,
    products,
    subscription,
    Avatar,
    onSignOut,
    onSubscribe,
  } = useStore();

  return (
    <main className={mainStyles}>
      <h1>Edit Profile</h1>

      <aside className={leftStyles}>
        <Avatar />

        <section>
          <h2>{email}</h2>

          <div className={plansStyles}>
            <h3>Plans</h3>

            {subscription && (
              <>
                <br />
                <p>
                  Renewal date:{" "}
                  {new Date(
                    subscription?.current_period_end * 1000
                  ).toLocaleDateString()}
                </p>
              </>
            )}
            {Object.entries(products).map(([id, data]) => {
              const {
                name,
                description,
                prices: { id: priceID },
              } = data || {};
              const isSubscribed = name
                ?.toLowerCase()
                .includes(subscription?.role);

              return (
                <ul key={id}>
                  <li>
                    <h5>{name}</h5>
                    <h6>{description}</h6>
                  </li>

                  <button
                    className={`${subscribeStyles} ${
                      isSubscribed && disableStyles
                    }`}
                    type="button"
                    onClick={onSubscribe.bind(null, priceID, isSubscribed)}
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? "Current Packaage" : "Subscribe"}
                  </button>
                </ul>
              );
            })}

            <button type="button" onClick={onSignOut}>
              Sign Out
            </button>
          </div>
        </section>
      </aside>
    </main>
  );
}
