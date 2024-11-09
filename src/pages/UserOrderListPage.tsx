import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user"; // Jotaiからユーザー情報を取得
import { getOrderHistoryByUserId } from "../lib/database/Order";
import { OrderInfoType } from "../lib/type/OrderType";
import Layout from "../component/shared/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "../style/MyPage.css";

const UserOrderListPage = () => {
  const userState = useAtomValue(userInfoAtom); // グローバルステートからユーザー情報を取得
  const [orderHistories, setOrderHistories] = useState<OrderInfoType[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = userState.userInfo ? userState.userInfo.id : 1;

  useEffect(() => {
    const fetchOrderHistories = async () => {
      setLoading(true);
      const data = await getOrderHistoryByUserId(userId);
      if (data) {
        setOrderHistories(data);
      }
      setLoading(false);
    };

    fetchOrderHistories();
  }, [userId]);

  return (
    <Layout>
      <div className="mypage_container">
        <h2>注文履歴</h2>
        {loading ? (
          <p>読み込み中...</p>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>注文番号</TableCell>
                  <TableCell>注文日</TableCell>
                  <TableCell>ステータス</TableCell>
                  <TableCell>商品名</TableCell>
                  <TableCell>数量</TableCell>
                  <TableCell>単価</TableCell>
                  <TableCell>合計金額</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderHistories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7}>注文履歴がありません。</TableCell>
                  </TableRow>
                ) : (
                  orderHistories.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>
                        {new Date(order.order_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{order.order_status}</TableCell>
                      <TableCell>
                        {order.order_items.map((item) => (
                          <div key={item.id}>{item.product.name}</div>
                        ))}
                      </TableCell>
                      <TableCell>
                        {order.order_items.map((item) => (
                          <div key={item.id}>{item.quantity}</div>
                        ))}
                      </TableCell>
                      <TableCell>
                        {order.order_items.map((item) => (
                          <div key={item.id}>${item.unit_price.toFixed(2)}</div>
                        ))}
                      </TableCell>
                      <TableCell>${order.total_price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </Layout>
  );
};

export default UserOrderListPage;
