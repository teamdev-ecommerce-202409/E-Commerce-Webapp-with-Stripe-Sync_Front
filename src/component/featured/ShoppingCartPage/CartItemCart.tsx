import "../../../style/CartItemCard.css";

const CartItemCard = () => {
  return (
    <div className="cart-item-card">
      <div className="cart-item-image">
        <img src="https://via.placeholder.com/100" alt="商品画像" />
      </div>
      <div className="cart-item-details">
        <h3 className="cart-item-title">商品名</h3>
        <p className="cart-item-price">¥1,200</p>
        <div className="cart-item-quantity">
          <button className="quantity-btn">-</button>
          <input type="text" value="1" className="quantity-input" />
          <button className="quantity-btn">+</button>
        </div>
        <button className="remove-btn">削除</button>
      </div>
    </div>
  );
};

export default CartItemCard;
