import { UserInfoTypeJotai } from "../../type/UserInfoType";
import { atom } from "jotai";

const atomWithLocalStorage = (key: string, initialValue: UserInfoTypeJotai) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item) as UserInfoTypeJotai;
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

export const jotaiInitialValue: UserInfoTypeJotai = {
  userInfo: {
    id: 1,
    user_name: "doinkya",
    email_address: "",
    role: "guest",
    email_validated_at: new Date().toISOString(),
    address: "hogehoge1-2",
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  authtoken: "sample-token", // グローバルなauthtoken
};
const userInfoAtom = atomWithLocalStorage("userInfo", jotaiInitialValue);
export { userInfoAtom };