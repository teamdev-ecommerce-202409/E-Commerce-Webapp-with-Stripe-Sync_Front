import { OrderInfoType } from "../../../lib/type/OrderType";
import "../../../style/ProductList.css";

type Props = {
  orderList: OrderInfoType[];
};

const AdminOrderList = ({ orderList }: Props) => {
  return (
    <div className="productList_container">
      {orderList.map((order) => order.id)}
    </div>
  );
};

export default AdminOrderList;
