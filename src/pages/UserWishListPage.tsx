import { useEffect, useState } from "react";
import Layout from "../component/shared/Layout";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import useLogin from "../hook/useLogin";
import { ProductInfoType } from "../lib/type/ProductType";
import { getWishListByUser } from "../lib/database/Product";
import { loadNumPerPage } from "../lib/constants";
import PaginationControl from "../component/shared/PaginationControl";
import "../style/UserWishListPage.css";
import FavAndWishList from "../component/featured/UserFavListPage/FavAndWishList";
import LinkIcon from "@mui/icons-material/Link";
import { IconButton } from "@mui/material";

const UserWishListPage = () => {
  const [userInfoJotai] = useAtom(userInfoAtom);
  const { checkLogin } = useLogin();
  const [wishList, setWishList] = useState<ProductInfoType[]>([]);
  const [page, setPage] = useState(1);
  const [allPageCount, setAllPageCount] = useState(1);

  const navigate = useNavigate();

  const fetchWishList = async (currentPage = page) => {
    const wishes = await getWishListByUser(
      currentPage,
      userInfoJotai && userInfoJotai.access,
    );
    const newWishList = [];
    if (wishes) {
      for (const res of wishes.results) {
        newWishList.push(res.product);
      }
    }
    setWishList(newWishList);
    if (wishes?.count) {
      setAllPageCount(Math.ceil(wishes?.count / loadNumPerPage));
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
    fetchWishList(page);
  }, []);

  const handleCopy = async (access: string) => {
    try {
      if (userInfoJotai && userInfoJotai.userInfo) {
        const copyLink =
          import.meta.env.VITE_FRONT_DOMAIN +
          "/wishlist/" +
          userInfoJotai.userInfo.id +
          "/" + access;
        await navigator.clipboard.writeText(copyLink); // クリップボードにコピー
        alert(
          `${userInfoJotai.userInfo?.name}様のウィッシュリストのリンクをコピーしました。`,
        );
      } else {
        throw new Error("未ログイン");
      }
    } catch (err) {
      console.error("リンクのコピーに失敗しました:", err);
      alert("リンクのコピーに失敗しました");
    }
  };

  return (
    <Layout>
      <div className="userWishListPage_container">
        <div className="userWishListPage_title_container">
          <h2>{userInfoJotai.userInfo?.name} 様のWishList</h2>{" "}
          <IconButton onClick={() => handleCopy("public")}>
            <LinkIcon />
            <span className="linkLabel">public</span>
          </IconButton>
          <IconButton onClick={() => handleCopy("private")}>
            <LinkIcon />
            <span className="linkLabel">private</span>
          </IconButton>
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

export default UserWishListPage;
