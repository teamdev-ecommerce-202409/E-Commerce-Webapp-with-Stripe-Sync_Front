import { useEffect, useState } from "react";
import "../style/DetailPage.css";
import Layout from "../component/shared/Layout";
import { useParams } from "react-router-dom";
import { testItems } from "../lib/testData/testData";
// import CategorySelectBox from "../component/featured/DetailPage/CategorySelectBox";
import ShoppingCartButton from "../component/shared/ShoppingCartButton";
import FavoriteButton from "../component/shared/FavoriteButton";
import Rating from "@mui/material/Rating";
import CommentCard from "../component/featured/DetailPage/CommentCard";
import { ProductInfoType } from "../lib/type/ProductType";

const DetailPage = () => {
  const [product, setProduct] = useState<ProductInfoType | undefined>(
    undefined,
  );
  const { productId } = useParams<{ productId: string }>();

  // id を数値に変換
  const id = Number(productId);

  useEffect(() => {
    // `id` の変更に基づいて、データを取得する
    if (!isNaN(id)) {
      const testItem = testItems.find((item) => item.id === id);
      if (testItem) {
        setProduct(testItem);
      }
    }
  }, [id]); // `id` を依存配列に追加

  return (
    <Layout>
      <div className="detailpage_container">
        <div className="detailpage_content">
          <div className="detailpage_image">
            <img src={product?.imgUrl} alt={product?.title} />
          </div>
          <div className="detailpage_info_container">
            <div className="detailpage_info">
              <h2>{product?.title}</h2>
              <p>Price: ${product?.price.toFixed(2)}</p>
              <p>メンズ</p>
              <p>トップス</p>

              {/* <CategorySelectBox categoryInfo={testCategories.sizeCatgory} /> */}

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
