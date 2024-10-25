import { CartInfoType } from "../type/ProductType";

export type UserInfoJotai = {
  id?: number;
  uid?: string;
  nickname?: string;
  userImg?: string;
  email?: string;
  isAuth: boolean;
  isAdmin: boolean;
};

export type CartInfoJotai = {
  cartItems: CartInfoType[];
};
