import { MenuItem, Select } from "@mui/material";
import { OrderInfoType, OrderStatus } from "../../../lib/type/OrderType";
import { userInfoAtom } from "../../../lib/jotai/atoms/user";
import { useAtom } from "jotai";
import { useState } from "react";
import { changeOrderStatus } from "../../../lib/database/Order";

type Props = {
  order: OrderInfoType;
};
const AdminOrderStatus = ({ order }: Props) => {
  const [userInfoJotai] = useAtom(userInfoAtom);
  const [orderStatus, setOrderStatus] = useState(order.order_status);
  const handleStatusChange = (orderId: number, statusVal: OrderStatus) => {
    console.log(orderId, statusVal);
    setOrderStatus(statusVal);
    changeOrderStatus(orderId, statusVal, userInfoJotai.access);
  };
  return (
    <Select
      value={orderStatus}
      onChange={(event) =>
        handleStatusChange(order.id, event.target.value as OrderStatus)
      }
      variant="outlined"
    >
      {Object.keys(OrderStatus).map((key) => (
        <MenuItem key={`${order.id}+${key}`} value={key}>
          {key}
        </MenuItem>
      ))}
    </Select>
  );
};

export default AdminOrderStatus;
