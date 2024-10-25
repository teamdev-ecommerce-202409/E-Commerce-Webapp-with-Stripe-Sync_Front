// import { useAtom } from "jotai";
import { useState } from "react";
// import { userInfoAtom } from "../lib/jotai/atoms/user";
import { ProductInfoType } from "../lib/type/ProductType";
import { registerLike } from "../lib/database/Product";

export const useLikeState = (product: ProductInfoType) => {
  // const [userInfojotai] = useAtom(userInfoAtom);
  const [likeState, setLikeState] = useState(product.fav ? true : false);

  const registerLikeState = async () => {
    //サーバーにlikeの情報を登録する
    // if (userInfojotai.userInfo) {
    //   const token = userInfojotai.authtoken;
    await registerLike(
      product.id,
      // userInfojotai.userInfo.id,
      19,
      !likeState,
      // token,
      null,
    );
    // }
  };

  return {
    likeState,
    registerLikeState,
    setLikeState,
  };
};
