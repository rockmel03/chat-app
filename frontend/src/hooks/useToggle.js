import useLocalStorage from "./useLocalStorage";

export const useToggle = (key, initialValue) => {
  const [value, setValue] = useLocalStorage(key, initialValue);

  const toggleValue = (tValue) => {
    setValue((prev) => (typeof tValue === "boolean" ? tValue : !prev));
  };

  return [value, toggleValue];
};

export default useToggle;
