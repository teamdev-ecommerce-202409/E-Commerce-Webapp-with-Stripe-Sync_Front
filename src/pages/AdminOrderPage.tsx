import { useEffect, useState } from "react";
import useLogin from "../hook/useLogin";
import { useNavigate } from "react-router-dom";
import Layout from "../component/shared/Layout";
import "../style/AdminOrderPage.css";
import { OrderInfoType } from "../lib/type/OrderType";
import { loadNumPerPage } from "../lib/constants";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { useAtom } from "jotai";
import { getOrders } from "../lib/database/Order";
import PaginationControl from "../component/shared/PaginationControl";
import AdminOrderList from "../component/featured/AdminOrderPage/AdminOrderList";

const AdminOrderPage = () => {
  const [userInfoJotai] = useAtom(userInfoAtom);
  const { checkLogin } = useLogin();
  const navigate = useNavigate();

  const [orderList, setOrderList] = useState<OrderInfoType[]>([]);
  const [page, setPage] = useState(1);
  const [allPageCount, setAllPageCount] = useState(1);

  const fetchOrders = async (currentPage = page) => {
    const orders = await getOrders(
      {
        page: currentPage,
      },
      userInfoJotai.access,
    );
    // 注文リストを更新
    setOrderList(orders ? orders.results : []);

    // ページネーション設定
    if (orders?.count) {
      setAllPageCount(Math.ceil(orders?.count / loadNumPerPage));
    } else {
      setAllPageCount(0);
    }
  };
  useEffect(() => {
    const authCheckAdmin = async () => {
      const authResult = await checkLogin(true);
      if (!authResult) {
        navigate("/");
      }
    };
    authCheckAdmin();
    fetchOrders(page);
  }, [page]);
  //   useEffect(() => {
  //     const authCheckAdmin = async () => {
  //       const authResult = await checkLogin(true);
  //       if (!authResult) {
  //         navigate("/");
  //       }
  //     };
  //     authCheckAdmin();
  //     fetchOrders(1);
  //   }, []);
  return (
    <Layout>
      <div className="adminOrderPage_container">
        <div className="adminOrderPage_title_container">
          <h2>注文状況照会</h2>
        </div>
        <div className="adminOrderPage_orderList_container">
          {orderList && orderList.length > 0 ? (
            <>
              <AdminOrderList orderList={orderList} />
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
      </div>
    </Layout>
  );
};

export default AdminOrderPage;
