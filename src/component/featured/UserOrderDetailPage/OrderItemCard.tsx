import "../../../style/OrderItemCard.css";

import { OrderItemInfoType } from "../../../lib/type/OrderType";
import { useNavigate } from "react-router-dom";
type Props = {
  orderItem: OrderItemInfoType;
};
const OrderItemCard = ({ orderItem }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className="orderItemCard_container"
      onClick={() => navigate(`/product/${orderItem.product.id}`)}
    >
      <div className="orderItemCard_image_container">
        <img
          src={orderItem.product.imgUrl || "/no_image_square.jpg"}
          alt="商品画像"
        />
      </div>
      <div className="orderItemCard_details_container">
        <div className="orderItemCard_productInfo_container">
          <h3 className="orderItemCard_productInfo_name">
            {orderItem.product.name}
          </h3>
          <p className="orderItemCard_productInfo_content">
            サイズ:{orderItem.product.size.name}
          </p>
          <p className="orderItemCard_productInfo_content">
            ブランド:{orderItem.product.brand.name}
          </p>

          <p className="orderItemCard_productInfo_price">
            ¥{orderItem.unit_price.toLocaleString()}
          </p>
          <p className="orderItemCard_productInfo_content">
            数量:{orderItem.quantity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
