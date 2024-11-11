import { useEffect, useState } from "react";
import { userInfoAtom } from "../lib/jotai/atoms/user"; // Jotaiからユーザー情報を取得
import { getOrders } from "../lib/database/Order";
import { OrderInfoType } from "../lib/type/OrderType";
import Layout from "../component/shared/Layout";
import "../style/MyPage.css";
import { loadNumPerPage } from "../lib/constants";
import { useNavigate } from "react-router-dom";
import PaginationControl from "../component/shared/PaginationControl";
import { useAtom } from "jotai";
import useLogin from "../hook/useLogin";
import UserOrderList from "../component/featured/UserOrderListPage/UserOrderList";

const UserOrderListPage = () => {
  const [loading, setLoading] = useState(true);
  const [userInfoJotai] = useAtom(userInfoAtom);
  const { checkLogin } = useLogin();
  const [orderHistories, setOrderHistories] = useState<OrderInfoType[]>([]);
  const [page, setPage] = useState(1);
  const [allPageCount, setAllPageCount] = useState(1);

  const navigate = useNavigate();

  const fetchUserOrders = async (currentPage = page) => {
    setLoading(true);
    const orders = await getOrders(
      { page: currentPage },
      userInfoJotai.access,
      true,
    );
    console.log({ orders });
    // 注文情報リストを更新
    setOrderHistories(orders ? orders.results : []);

    // ページネーション設定
    if (orders?.count) {
      setAllPageCount(Math.ceil(orders?.count / loadNumPerPage));
    } else {
      setAllPageCount(0);
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchUserOrders(page);
  }, [page]);

  useEffect(() => {
    const authCheckLogin = async () => {
      const authResult = await checkLogin();
      if (!authResult) {
        navigate("/");
      }
    };
    authCheckLogin();
  }, []);
  return (
    <Layout>
      <div className="mypage_container">
        <h2>注文履歴</h2>
        {loading ? (
          <p>読み込み中...</p>
        ) : (
          <div className="adminOrderPage_orderList_container">
            {orderHistories && orderHistories.length > 0 ? (
              <>
                <UserOrderList orderList={orderHistories} />
                <PaginationControl
                  allPageCount={allPageCount} //総ページ数
                  handlePageChange={setPage} //変更されたときに走る関数。第2引数にページ番号が入る
                  page={page} //現在のページ番号
                />
              </>
            ) : (
              <div>照会できる注文リストはありません。</div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserOrderListPage;
