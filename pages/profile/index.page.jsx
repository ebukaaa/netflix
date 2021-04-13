import { useStore } from "./utils";

export function useProfile() {
  const { profileStyles, email, Avatar, onSignOut } = useStore();

  return (
    <main className={profileStyles}>
      <h1>Edit Profile</h1>

      <aside>
        <Avatar />

        <section>
          <h2>{email}</h2>

          <div>
            <h3>Plans</h3>

            <button type="button" onClick={onSignOut}>
              Sign Out
            </button>
          </div>
        </section>
      </aside>
    </main>
  );
}
export default useProfile;
