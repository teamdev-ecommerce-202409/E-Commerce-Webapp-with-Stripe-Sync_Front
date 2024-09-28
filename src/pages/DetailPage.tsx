import { useEffect, useState } from "react";
import "../style/DetailPage.css";
import Layout from "../component/shared/Layout";
import { ItemInfo } from "../lib/type/ItemType";
import { useParams } from "react-router-dom";
import { testCategories, testItems } from "../lib/testData/testData";
import CategorySelectBox from "../component/featured/DetailPage/CategorySelectBox";
import ShoppingCartButton from "../component/shared/ShoppingCartButton";
import FavoriteButton from "../component/shared/FavoriteButton";
import Rating from "@mui/material/Rating";
import CommentCard from "../component/featured/DetailPage/CommentCard";

const DetailPage = () => {
  const [item, setItem] = useState<ItemInfo | undefined>(undefined);
  const { itemId } = useParams<{ itemId: string }>();

  // id を数値に変換
  const id = Number(itemId);

  useEffect(() => {
    // `id` の変更に基づいて、データを取得する
    if (!isNaN(id)) {
      const testItem = testItems.find((item) => item.id === id);
      if (testItem) {
        setItem(testItem);
      }
    }
  }, [id]); // `id` を依存配列に追加

  return (
    <Layout>
      <div className="detailpage_container">
        <div className="detailpage_content">
          <div className="detailpage_image">
            <img src={item?.imageUrl} alt={item?.name} />
          </div>
          <div className="detailpage_info_container">
            <div className="detailpage_info">
              <h2>{item?.name}</h2>
              <p>Price: ${item?.price.toFixed(2)}</p>
              <p>メンズ</p>
              <p>トップス</p>

              <CategorySelectBox categoryInfo={testCategories[0]} />

              <p>
                商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明
              </p>
              <div className="detailpage_info_action_container">
                <ShoppingCartButton />
                <FavoriteButton />
              </div>
              {/* 商品の詳細情報を追加 */}
            </div>
            <div className="detailpage_itemReviews">
              <h3>レビュー</h3>
              <Rating name="read-only" value={4} readOnly />
              <CommentCard />
              <CommentCard />
              <CommentCard />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailPage;
