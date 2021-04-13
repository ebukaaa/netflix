import { useStore } from "./utils";

export function useInput({ type, placeholder, name, value, setValue }) {
  const { onChange } = useStore();

  return (
    <input
      type={type}
      name={name}
      security={type === "password" ? "true" : "false"}
      placeholder={placeholder}
      defaultValue={value}
      onChange={onChange.bind(this, setValue, name)}
    />
  );
}
