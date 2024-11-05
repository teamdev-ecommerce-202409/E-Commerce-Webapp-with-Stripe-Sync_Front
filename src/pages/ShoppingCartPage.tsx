import { useEffect, useState } from "react";
import CartItemCard from "../component/featured/ShoppingCartPage/CartItemCart";
import Layout from "../component/shared/Layout";
import PrimaryButton from "../component/shared/PrimaryButton";
import "../style/ShoppingCartPage.css";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { useAtom } from "jotai";
import { cartInfoAtom } from "../lib/jotai/atoms/cart";
import { CartInfoType } from "../lib/type/ProductType";
import {
  changeCartItemQuantity,
  deleteCartItem,
  getCartItemsByUserId,
} from "../lib/database/Cart";
import { CartInfoJotai } from "../lib/jotai/JotaiType";
import { shippingFeeFreePrice } from "../lib/constants";
import { checkout, CheckoutData } from "../lib/database/Order";

const ShoppingCartPage = () => {
  const [userInfoJotai] = useAtom(userInfoAtom);
  const [cartInfoJotai, setCartInfoJotai] = useAtom(cartInfoAtom);
  const [cartItems, setCartItems] = useState<CartInfoType[]>([]);
  const [sumPrice, setSumPrice] = useState<number>(0);
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [checkoutLoading, setCheckoutLoading] = useState<boolean>(false);

  const sumAllCartItems = (cartItems: CartInfoType[]) => {
    //カートに入っているすべての商品の合計値を算出してセットする関数
    let sum = 0;
    for (const cartItem of cartItems) {
      console.log(cartItem);
      sum += cartItem.product.price * cartItem.quantity;
    }
    setSumPrice(sum);
    setShippingFee(sum > shippingFeeFreePrice || sum === 0 ? 0 : shippingFee);
  };

  const handleChangeQuantity = async (
    productId: number,
    quantity: number,
    userId?: number,
  ) => {
    if (userId) {
      //ユーザーIDがある＝ログインしている→バックエンドとアクセス
      await changeCartItemQuantity(userId, productId, quantity);
    } else {
      // ユーザーIDがない＝ゲストモード→ローカルストレージとやりとり
      const newCartItems = cartItems.map((cartItem) => {
        const newCartItem = cartItem;
        if (newCartItem.product.id === productId) {
          newCartItem.quantity = quantity;
        }
        return newCartItem;
      });
      setCartInfoJotai({ cartItems: newCartItems } as CartInfoJotai);
      setCartItems(newCartItems);
      sumAllCartItems(newCartItems);
    }
  };

  const handleDeleteCartItem = async (productId: number, userId?: number) => {
    if (userId) {
      const result = await deleteCartItem(userId, productId);
      if (!result) {
        alert("削除失敗");
      } else {
        const newCartItems = cartItems.filter((cartItem) => {
          return cartItem.product.id !== productId;
        });
        setCartItems(newCartItems);
        sumAllCartItems(newCartItems);
      }
    } else {
      const newCartItems = cartItems.filter(
        (cartItem) => cartItem.product.id !== productId,
      );
      setCartInfoJotai({ cartItems: newCartItems } as CartInfoJotai);
      setCartItems(newCartItems);
      sumAllCartItems(newCartItems);
    }
  };

  const clearCart = () => {
    const isGuestUser = userInfoJotai.userInfo?.id === undefined;
    if (isGuestUser) {
      const newCartItems: CartInfoType[] = [];
      setCartInfoJotai({ cartItems: newCartItems } as CartInfoJotai);
      setCartItems(newCartItems);
      sumAllCartItems(newCartItems);
    } else {
      // NOP
      // ログインユーザーのカート情報はDBにあり、決済時にバックエンドで削除される
    }
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    const checkoutData: CheckoutData[] = cartItems.map((item) => ({
      product_id: item.product.id,
      amount: item.quantity,
    }));
    try {
      const redirectUrl = await checkout(checkoutData);
      clearCart();
      window.location.href = redirectUrl;
    } catch (error) {
      alert('チェックアウトに失敗しました。')
    } finally {
      setCheckoutLoading(false);
    }
  };

  const getCartItems = async (userId: number) => {
    const cartItems = await getCartItemsByUserId(userId);
    setCartItems(cartItems);
    sumAllCartItems(cartItems);
  };

  useEffect(() => {
    // グローバルステートからログインユーザー情報を取得
    if (userInfoJotai.userInfo) {
      // ユーザー情報が入っている場合=ログインしている→ユーザーIDをキーにバックエンドからカートの中身を取得
      getCartItems(userInfoJotai.userInfo.id);
    } else {
      // ユーザー情報がない＝未ログインの場合→ローカルストレージからカートの中身をとってくる
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
              return (
                <CartItemCard
                  key={cartItem.product.id}
                  cartItem={cartItem}
                  handleChangeQuantity={handleChangeQuantity}
                  handleDeleteCartItem={handleDeleteCartItem}
                />
              );
            })}
          </div>
          <div className="shoppingCartPage_settlement_container">
            <div className="shoppingCartPage_settlementCard_container">
              <h3>注文内容</h3>
              <p className="settlement-item">
                <span>小計:</span>
                <span>{sumPrice.toLocaleString() + "円"}</span>
              </p>
              <p className="settlement-item">
                <span>送料:</span>
                <span>{shippingFee.toLocaleString() + "円"}</span>
              </p>
              <p className="settlement-total">
                <span>合計:</span>
                <span>{(sumPrice + shippingFee).toLocaleString() + "円"}</span>
              </p>
              {cartItems.length > 0 && (
                <div className="shoppingCartPage_settlementButton_container">
                  <PrimaryButton
                    onClick={handleCheckout}
                    loading={checkoutLoading}
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
