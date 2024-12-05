import { atom } from "jotai";
import { checkoutInfoJotai } from "../JotaiType";

const atomWithLocalStorage = (key: string, initialValue: checkoutInfoJotai) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item) as checkoutInfoJotai;
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

export const checkoutJotaiInitialValue: checkoutInfoJotai = {};
const checkoutInfoAtom = atomWithLocalStorage("checkoutInfo", checkoutJotaiInitialValue);
export { checkoutInfoAtom };
