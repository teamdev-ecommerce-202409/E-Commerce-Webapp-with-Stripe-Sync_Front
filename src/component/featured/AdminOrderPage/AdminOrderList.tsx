import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { OrderInfoType } from "../../../lib/type/OrderType";
import "../../../style/AdminOrderList.css";
import { EditNotifications } from "@mui/icons-material";

type Props = {
  orderList: OrderInfoType[];
};

const AdminOrderList = ({ orderList }: Props) => {
  return (
    <div className="adminOrderList_container">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>注文日</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell>注文金額</TableCell>
              <TableCell>注文者名</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.order_date}</TableCell>
                <TableCell>{order.order_status}</TableCell>
                <TableCell>{`${order.total_price.toFixed(2)}`}</TableCell>
                <TableCell>{order.user.name}</TableCell>

                <TableCell>
                  <IconButton onClick={() => alert("edit")}>
                    <EditNotifications />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminOrderList;
