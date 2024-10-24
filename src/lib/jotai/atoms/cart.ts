import { atom } from "jotai";
import { CartInfoJotai } from "../JotaiType";

const atomWithLocalStorage = (key: string, initialValue: CartInfoJotai) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item) as CartInfoJotai;
    }
    return initialValue;
  };
  const baseAtom = atom(getInitialValue());
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === "function" ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      localStorage.setItem(key, JSON.stringify(nextValue));
    },
  );
  return derivedAtom;
};

export const jotaiInitialValue: CartInfoJotai = { cartItems: [] };
const cartInfoAtom = atomWithLocalStorage("cartInfo", jotaiInitialValue);
export { cartInfoAtom };
