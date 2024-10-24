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

// export const jotaiInitialValue: UserInfoTypeJotai = {};
// export const jotaiInitialValue: UserInfoTypeJotai = {
//   id: 1,
//   uid: "sample-uid",
//   nickname: "sample-nickname",
//   userImg: "sample-image",
//   email: "sample@example.com",
//   isAuth: true,
//   isAdmin: false,
// };
export const jotaiInitialValue: UserInfoTypeJotai = {
  userInfo: {
    id: 1,
    username: "guest",
    email: "",
    role: "user",
    is_active: false,
    is_staff: false,
    is_superuser: false,
    date_joined: "",
    last_login: null,
    authtoken: "sample-token", 
    created_at: new Date().toISOString(), // 仮の日付
    updated_at: new Date().toISOString(), // 仮の日付
  },
  authtoken: "sample-token", // グローバルなauthtoken
};
const userInfoAtom = atomWithLocalStorage("userInfo", jotaiInitialValue);
export { userInfoAtom };
