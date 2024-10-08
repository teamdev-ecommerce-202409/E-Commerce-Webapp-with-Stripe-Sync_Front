import { useEffect, useState } from "react";
import "../style/DetailPage.css";
import Layout from "../component/shared/Layout";
import { useParams } from "react-router-dom";
import ShoppingCartButton from "../component/shared/ShoppingCartButton";
import FavoriteButton from "../component/shared/FavoriteButton";
import Rating from "@mui/material/Rating";
import CommentCard from "../component/featured/DetailPage/CommentCard";
import { ProductInfoType } from "../lib/type/ProductType";
import { getProductDetailById } from "../lib/database/Product";

const DetailPage = () => {
  const [product, setProduct] = useState<ProductInfoType | null>(null);
  const { productId } = useParams<{ productId: string }>();

  // id を数値に変換
  const id = Number(productId);

  useEffect(() => {
    // `id` の変更に基づいて、データを取得する
    if (!isNaN(id)) {
      const setProductDetailInfo = async () => {
        const productDetail = await getProductDetailById(id);
        console.log({ productDetail });
        setProduct(productDetail);
      };
      setProductDetailInfo();
    }
  }, [id]);

  return (
    <Layout>
      <div className="detailpage_container">
        <div className="detailpage_content">
          <div className="detailpage_image">
            <img
              src={
                product?.imgUrl ? product.imgUrl : "public/no_image_square.jpg"
              }
              alt={product?.title}
            />
          </div>
          <div className="detailpage_info_container">
            <div className="detailpage_info">
              <h2>{product?.title}</h2>
              <p>Price: ${product?.price.toFixed(2)}</p>
              <p>Target: {product?.target.name}</p>
              <p>Type: {product?.clothes_type.name}</p>

              <p>{product?.description}</p>
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
