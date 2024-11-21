import { useEffect, useState } from "react";
import Layout from "../component/shared/Layout";
import { useParams } from "react-router-dom";

import { ProductInfoType } from "../lib/type/ProductType";
import { getPublicWishListById } from "../lib/database/Product";
import { loadNumPerPage } from "../lib/constants";
import PaginationControl from "../component/shared/PaginationControl";
import "../style/UserWishListPage.css";
import FavAndWishList from "../component/featured/UserFavListPage/FavAndWishList";

const PublicWishListPage = () => {
  const { id } = useParams();

  const [wishList, setWishList] = useState<ProductInfoType[]>([]);
  const [page, setPage] = useState(1);
  const [allPageCount, setAllPageCount] = useState(1);

  const fetchWishList = async (currentPage = page) => {
    const wishes = await getPublicWishListById(currentPage, id);
    console.log({ favs: wishes });
    const newWishes = [];
    if (wishes) {
      for (const res of wishes.results) {
        newWishes.push(res.product);
      }
    }
    setWishList(newWishes);

    if (wishes?.count) {
      setAllPageCount(Math.ceil(wishes?.count / loadNumPerPage));
    } else {
      setAllPageCount(0);
    }
  };
  useEffect(() => {
    fetchWishList(page);
  }, [page]);

  return (
    <Layout>
      <div className="userWishListPage_container">
        <div className="userWishListPage_title_container">
          {/* <h2>{userInfoJotai.userInfo?.name} 様のWishList</h2>{" "} */}
        </div>
        <div className="userWishListPage_favList_container">
          {wishList && wishList.length > 0 ? (
            <>
              <FavAndWishList productList={wishList} />
              <PaginationControl
                allPageCount={allPageCount} //総ページ数
                handlePageChange={setPage} //変更されたときに走る関数。第2引数にページ番号が入る
                page={page} //現在のページ番号
              />
            </>
          ) : (
            <div>ウィッシュリストした商品はまだないようです。</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PublicWishListPage;
