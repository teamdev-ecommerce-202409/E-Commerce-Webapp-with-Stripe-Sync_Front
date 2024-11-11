import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { OrderInfoType } from "../../../lib/type/OrderType";
import "../../../style/UserOrderList.css";
import { useNavigate } from "react-router-dom";

type Props = {
  orderList: OrderInfoType[];
};

const UserOrderList = ({ orderList }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="userOrderList_container">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">id</TableCell>
              <TableCell align="center">注文日</TableCell>
              <TableCell align="center">ステータス</TableCell>
              <TableCell align="center">注文金額</TableCell>
              <TableCell align="center">注文個数</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map((order) => (
              <TableRow
                key={order.id}
                onClick={() => navigate(`/mypage/orders/detail/${order.id}`)}
                className="userOrderList_row"
              >
                <TableCell align="center">{order.id}</TableCell>
                <TableCell align="center">{`${new Date(order.order_date).getFullYear()}年${new Date(order.order_date).getMonth() + 1}月${new Date(order.order_date).getDate()}日`}</TableCell>
                <TableCell align="center">{order.order_status}</TableCell>
                <TableCell align="center">{`￥${order.total_price}`}</TableCell>
                <TableCell align="center">{order.order_items.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserOrderList;
