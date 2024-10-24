import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user"; // Jotaiからユーザー情報を取得
import { getOrderHistoryByUserId } from "../lib/database/Order";
import { OrderInfoType } from "../lib/type/OrderType";
import Layout from "../component/shared/Layout";
import "../style/MyPage.css";

const MyPage = () => {
//   const user = useAtomValue(userInfoAtom); // グローバルステートからユーザー情報を取得
  const [orderHistories, setOrderHistories] = useState<OrderInfoType[]>([]);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrderHistories = async () => {
//       if (user.id) { // ユーザーIDが存在する場合のみ実行
//         setLoading(true);
//         const data = await getOrderHistoryByUserId(user.id);
//         console.log("Fetched order data:", data); // ログを追加
//         if (data) {
//           setOrderHistories(data);
//         }
//         setLoading(false);
//       }
//     };

//     fetchOrderHistories();
//   }, [user.id]); // user.idが変更される度に注文履歴を取得

  const userId = 1; // 仮のユーザーIDを設定

  useEffect(() => {
    const fetchOrderHistories = async () => {
      console.log("Fetching order histories..."); // useEffectが実行されているか確認
      setLoading(true);
      const data = await getOrderHistoryByUserId(userId);
      console.log("Fetched order data:", data); // APIからのデータをログに出力
      if (data) {
        setOrderHistories(data);
      }
      setLoading(false);
    };

    fetchOrderHistories();
  }, [userId]); // 仮のuserIdを依存に設定

  return (
    <Layout>
      <div className="mypage_container">
        <h2>注文履歴</h2>
        {loading ? (
          <p>読み込み中...</p>
        ) : (
          <div className="orderHistories_container">
            {orderHistories.length === 0 ? (
              <p>注文履歴がありません。</p>
            ) : (
              orderHistories.map((order) => (
                <div key={order.id} className="order_card">
                  <h3>注文番号: {order.id}</h3>
                  <p>注文日: {new Date(order.order_date).toLocaleDateString()}</p>
                  <p>ステータス: {order.order_status}</p>
                  <div className="order_items">
                    {order.order_items.map((item) => (
                      <div key={item.id} className="order_item">
                        <p>商品名: {item.product.name}</p>
                        <p>数量: {item.quantity}</p>
                        <p>価格: ${item.unit_price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <h4>合計金額: ${order.total_price.toFixed(2)}</h4>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyPage;
