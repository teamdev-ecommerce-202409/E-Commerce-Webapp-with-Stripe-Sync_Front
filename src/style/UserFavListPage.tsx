import { useEffect, useState } from "react";
import Layout from "../component/shared/Layout";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import useLogin from "../hook/useLogin";
import { ProductInfoType } from "../lib/type/ProductType";
import { getFavListByUser } from "../lib/database/Product";
import { loadNumPerPage } from "../lib/constants";
import PaginationControl from "../component/shared/PaginationControl";
import ProductList from "../component/featured/HomePage/ProductList";
import "../style/UserFavListPage.css";

const UserFavListPage = () => {
  const [userInfoJotai] = useAtom(userInfoAtom);
  const { checkLogin } = useLogin();
  const [favList, setFavList] = useState<ProductInfoType[]>([]);
  const [page, setPage] = useState(1);
  const [allPageCount, setAllPageCount] = useState(1);

  const navigate = useNavigate();

  const fetchFavs = async (currentPage = page) => {
    const orders = await getFavListByUser(currentPage, userInfoJotai.access);
    // いいねリストを更新
    setFavList(orders ? orders.results : []);

    // ページネーション設定
    if (orders?.count) {
      setAllPageCount(Math.ceil(orders?.count / loadNumPerPage));
    } else {
      setAllPageCount(0);
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
    fetchFavs(page);
  }, []);
  return (
    <Layout>
      <div className="userFavListPage_container">
        <div className="userFavListPage_title_container">
          <h2>{userInfoJotai.userInfo?.name} 様のFavorites</h2>
        </div>
        <div className="userFavListPage_favList_container">
          {favList && favList.length > 0 ? (
            <>
              <ProductList productList={favList} />
              <PaginationControl
                allPageCount={allPageCount} //総ページ数
                handlePageChange={setPage} //変更されたときに走る関数。第2引数にページ番号が入る
                page={page} //現在のページ番号
              />
            </>
          ) : (
            <div>いいねした商品はまだないようです。</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserFavListPage;
