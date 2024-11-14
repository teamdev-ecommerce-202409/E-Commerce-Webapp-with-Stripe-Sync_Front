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
import "../style/UserFavListPage.css";
import FavList from "../component/featured/UserFavListPage/FavList";

const UserFavListPage = () => {
  const [userInfoJotai] = useAtom(userInfoAtom);
  const { checkLogin } = useLogin();
  const [favList, setFavList] = useState<ProductInfoType[]>([]);
  const [page, setPage] = useState(1);
  const [allPageCount, setAllPageCount] = useState(1);

  const navigate = useNavigate();

  const fetchFavs = async (currentPage = page) => {
    const favs = await getFavListByUser(
      currentPage,
      userInfoJotai && userInfoJotai.access,
    );
    console.log({ favs });
    const newFavs = [];
    if (favs) {
      for (const res of favs.results) {
        newFavs.push(res.product);
      }
    }
    // いいねリストを更新
    setFavList(newFavs);

    // ページネーション設定
    if (favs?.count) {
      setAllPageCount(Math.ceil(favs?.count / loadNumPerPage));
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
              <FavList productList={favList} />
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
