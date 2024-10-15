import "../../../style/CartItemCard.css";
import PrimaryButton from "../../shared/PrimaryButton";

const CartItemCard = () => {
  return (
    <div className="cartItemCard_container">
      <div className="cartItemCard_image_container">
        <img src="/no_image_square.jpg" alt="商品画像" />
      </div>
      <div className="cartItemCard_details_container">
        <div className="cartItemCard_productInfo_container">
          <h3 className="cartItemCard_productInfo_name">商品名</h3>
          <p className="cartItemCard_productInfo_content">サイズ:{}</p>
          <p className="cartItemCard_productInfo_content">ブランド:{}</p>

          <p className="cartItemCard_productInfo_price">¥1,200</p>
        </div>
        <div className="cartItemCard_quantity_control_container">
          <div className="cartItemCard_quantity_control">
            <button className="cartItemCard_quantity_button">-</button>
            <input
              type="text"
              value="1"
              className="cartItemCard_quantity_input"
            />
            <button className="cartItemCard_quantity_button">+</button>
          </div>
          <div className="cartItemCard_delete_button_container">
            <PrimaryButton
              onClick={() => console.log("delete")}
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
