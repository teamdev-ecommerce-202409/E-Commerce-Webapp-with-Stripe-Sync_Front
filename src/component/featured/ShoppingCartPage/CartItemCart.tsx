import { useState } from "react";
import { CartInfoType } from "../../../lib/type/ProductType";
import "../../../style/CartItemCard.css";
import PrimaryButton from "../../shared/PrimaryButton";
type Props = {
  cartItem: CartInfoType;
  handleChangeQuantity: (
    productId: number,
    quantity: number,
    userId?: number,
  ) => void;
  handleDeleteCartItem: (productId: number, userId?: number) => void;
};
const CartItemCard = ({
  cartItem,
  handleChangeQuantity,
  handleDeleteCartItem,
}: Props) => {
  const [itemQuantity, setItemQuantity] = useState(cartItem.quantity);
  return (
    <div className="cartItemCard_container" key={cartItem.product.id}>
      <div className="cartItemCard_image_container">
        <img
          src={cartItem.product.imgUrl || "/no_image_square.jpg"}
          alt="商品画像"
        />
      </div>
      <div className="cartItemCard_details_container">
        <div className="cartItemCard_productInfo_container">
          <h3 className="cartItemCard_productInfo_name">
            {cartItem.product.name}
          </h3>
          <p className="cartItemCard_productInfo_content">
            サイズ:{cartItem.product.size.name}
          </p>
          <p className="cartItemCard_productInfo_content">
            ブランド:{cartItem.product.brand.name}
          </p>

          <p className="cartItemCard_productInfo_price">
            ¥{cartItem.product.price.toLocaleString()}
          </p>
        </div>
        <div className="cartItemCard_quantity_control_container">
          <div className="cartItemCard_quantity_control">
            <button
              className="cartItemCard_quantity_button"
              onClick={() => {
                if (itemQuantity - 1 === 0) {
                  handleDeleteCartItem(cartItem.product.id);
                } else {
                  setItemQuantity(itemQuantity - 1);
                  handleChangeQuantity(cartItem.product.id, itemQuantity - 1);
                }
              }}
            >
              -
            </button>
            <input
              type="text"
              value={itemQuantity}
              className="cartItemCard_quantity_input"
            />
            <button
              className="cartItemCard_quantity_button"
              onClick={() => {
                setItemQuantity(itemQuantity + 1);
                handleChangeQuantity(cartItem.product.id, itemQuantity + 1);
              }}
            >
              +
            </button>
          </div>
          <div className="cartItemCard_delete_button_container">
            <PrimaryButton
              onClick={() => handleDeleteCartItem(cartItem.product.id)}
              loading={false}
              text={"削除"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
