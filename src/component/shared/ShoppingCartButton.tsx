import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAtom } from "jotai";
import { userInfoAtom } from "../../lib/jotai/atoms/user";
import { changeCartItemQuantity } from "../../lib/database/Cart";
import { cartInfoAtom } from "../../lib/jotai/atoms/cart";
import { CartInfoType, ProductInfoType } from "../../lib/type/ProductType";

type Props = {
  product: ProductInfoType;
};
const ShoppingCartButton = ({ product }: Props) => {
  const [userInfojotai] = useAtom(userInfoAtom); // ユーザー情報
  const [cartInfoJotai, setCartInfoJotai] = useAtom(cartInfoAtom);

  const handleAddCartClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    console.log("カートに入れた！");
    if (userInfojotai.userInfo) {
      //   // ログイン時

      await changeCartItemQuantity(userInfojotai.userInfo.id, product.id);
    } else {
      //   // ゲスト時
      const cartItems = cartInfoJotai.cartItems;
      if (cartItems.find((cartItem) => cartItem.product.id === product.id)) {
        const newCartItems = cartItems.map((cartItem) => {
          if (cartItem.product.id === product.id) {
            cartItem.quantity = cartItem.quantity + 1;
          }
          return cartItem;
        });
        setCartInfoJotai({ cartItems: newCartItems });
      } else {
        const newCartItem: CartInfoType = {
          product: product,
          quantity: 1,
        };
        const newCartItems = [...cartItems, newCartItem];
        setCartInfoJotai({ cartItems: newCartItems });
      }
    }
  };

  return (
    <IconButton
      color="primary"
      aria-label="add to favorites"
      onClick={(event) => handleAddCartClick(event)}
    >
      <AddShoppingCartIcon />
    </IconButton>
  );
};

export default ShoppingCartButton;
