import { useEffect, useState } from "react";
import Layout from "../component/shared/Layout";
import "../style/UserOrderDetailPage.css";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { useAtom } from "jotai";
import { useNavigate, useParams } from "react-router-dom";
import { OrderInfoType } from "../lib/type/OrderType";
import useLogin from "../hook/useLogin";
import OrderItemCard from "../component/featured/UserOrderDetailPage/OrderItemCard";
import { getOrderDetail } from "../lib/database/Order";

const UserOrderDetailPage = () => {
  const { checkLogin } = useLogin();

  const { orderId } = useParams();
  const [userInfoJotai] = useAtom(userInfoAtom);
  const [orderInfo, setOrderInfo] = useState<OrderInfoType>();
  const navigate = useNavigate();

  const getOrderInfo = async (orderId: string | undefined) => {
    if (!orderId) {
      alert("この注文は存在しません。");
      navigate(-1);
    }
    const orderInfoRes = await getOrderDetail(
      Number(orderId),
      userInfoJotai && userInfoJotai.access,
    );
    if (!orderInfoRes) {
      alert("この注文情報取得エラー。");
      navigate(-1);
    } else {
      setOrderInfo(orderInfoRes);
    }
  };

  useEffect(() => {
    const authCheckLogin = async () => {
      const authResult = await checkLogin();
      if (!authResult) {
        navigate("/");
      }
    };
    authCheckLogin();

    getOrderInfo(orderId);
  }, []);

  return (
    <Layout>
      <div className="userOrderDetailPage_container">
        <div className="userOrderDetailPage_title_container">
          <h2>id:{orderId}の注文詳細</h2>
        </div>
        <div className="userOrderDetailPage_content_container">
          <div className="userOrderDetailPage_cartItems_container">
            {orderInfo?.order_items.map((orderItem) => {
              return (
                <OrderItemCard
                  key={orderItem.product.id}
                  orderItem={orderItem}
                />
              );
            })}
          </div>
          <div className="userOrderDetailPage_settlement_container">
            <div className="userOrderDetailPage_settlementCard_container">
              <h3>注文内容</h3>
              <p className="settlement-item">
                <span>注文日:</span>
                <span>
                  {orderInfo &&
                    `${new Date(orderInfo.order_date).getFullYear()}年${new Date(orderInfo.order_date).getMonth() + 1}月${new Date(orderInfo.order_date).getDate()}日`}
                </span>
              </p>
              <p className="settlement-item">
                <span>注文者:</span>
                <span>{orderInfo?.user.name}</span>
              </p>
              <p className="settlement-item">
                <span>ステータス:</span>
                <span>{orderInfo?.order_status}</span>
              </p>
              <p className="settlement-total">
                <span>合計金額:</span>
                <span>{orderInfo?.total_price.toLocaleString() + "円"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserOrderDetailPage;
