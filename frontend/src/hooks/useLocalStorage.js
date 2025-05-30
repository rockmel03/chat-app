import { useEffect, useState } from "react";

const getValue = (key, initialValue) => {
  if (typeof window === "undefined") return initialValue;

  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) return localValue;

  if (initialValue instanceof Function) return initialValue();
  return initialValue;
};

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(getValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
