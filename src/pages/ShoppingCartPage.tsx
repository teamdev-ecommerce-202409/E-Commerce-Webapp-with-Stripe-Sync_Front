import { useEffect, useState } from "react";
import CartItemCard from "../component/featured/ShoppingCartPage/CartItemCart";
import Layout from "../component/shared/Layout";
import PrimaryButton from "../component/shared/PrimaryButton";
import "../style/ShoppingCartPage.css";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { useAtom } from "jotai";
import { cartInfoAtom } from "../lib/jotai/atoms/cart";
import { CartInfoType } from "../lib/type/ProductType";

const ShoppingCartPage = () => {
  // const cartItems = Array.from({ length: 10 }, (_, index) => index + 1);

  const [userInfoJotai] = useAtom(userInfoAtom);
  console.log("userInfoJotai", userInfoJotai);

  const [cartInfoJotai] = useAtom(cartInfoAtom);

  const [cartItems, setCartItems] = useState<CartInfoType[]>([]);
  const [sumPrice, setSumPrice] = useState<number>(0);
  const [shippingFee, setShippingFee] = useState<number>(0);

  const sumAllCartItems = (cartItems: CartInfoType[]) => {
    //カートに入っているすべての商品の合計値を算出してセットする関数
    let sum = 0;
    for (const cartItem of cartItems) {
      console.log(cartItem);
      sum += cartItem.product.price * cartItem.quantity;
    }
    setSumPrice(sum);

    setShippingFee(sum > 5000 || sum === 0 ? 0 : 500);
  };

  useEffect(() => {
    // グローバルステートからログインユーザー情報を取得
    if (userInfoJotai.userInfo) {
      // ユーザー情報が入っている場合=ログインしている→ユーザーIDをキーにバックエンドからカートの中身を取得
    } else {
      // ユーザー情報がない＝未ログインの場合→ローカルストレージからカートの中身をとってくる
      console.log("cartInfoJotai", cartInfoJotai);
      setCartItems(cartInfoJotai.cartItems);
      sumAllCartItems(cartInfoJotai.cartItems);
    }
  }, []);
  return (
    <Layout>
      <div className="shoppingCartPage_container">
        <div className="shoppingCartPage_title_container">
          <h2>ショッピングカート</h2>
        </div>
        <div className="shoppingCartPage_content_container">
          <div className="shoppingCartPage_cartItems_container">
            {cartItems.map((cartItem) => {
              return <CartItemCard key={cartItem.product.id} />;
            })}
          </div>
          <div className="shoppingCartPage_settlement_container">
            <div className="shoppingCartPage_settlementCard_container">
              <h3>注文内容</h3>
              <p className="settlement-item">
                <span>小計:</span>
                <span>{sumPrice}</span>
              </p>
              <p className="settlement-item">
                <span>送料:</span>
                <span>{shippingFee}</span>
              </p>
              <p className="settlement-total">
                <span>合計:</span>
                <span>{sumPrice + shippingFee}</span>
              </p>
              {cartItems.length > 0 && (
                <div className="shoppingCartPage_settlementButton_container">
                  <PrimaryButton
                    onClick={() => alert("settlement click")}
                    loading={false}
                    text={"レジに進む"}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShoppingCartPage;
