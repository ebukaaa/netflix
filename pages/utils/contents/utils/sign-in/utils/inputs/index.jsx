import { useStore } from "./utils";

export function useInputs() {
  const { inputsStyles, email, password, Input, setInputs } = useStore();

  return (
    <main className={inputsStyles}>
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        setValue={setInputs}
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        security="true"
        value={password}
        setValue={setInputs}
      />
    </main>
  );
}
