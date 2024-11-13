import { useEffect, useState } from "react";
import "../style/DetailPage.css";
import Layout from "../component/shared/Layout";
import { useParams } from "react-router-dom";
import ShoppingCartButton from "../component/shared/ShoppingCartButton";
import FavoriteButton from "../component/shared/FavoriteButton";
import Rating from "@mui/material/Rating";
import CommentCard from "../component/featured/DetailPage/CommentCard";
import { ProductInfoType, RatingInfoType } from "../lib/type/ProductType";
import {
  getProductDetailById,
  getProductRatings,
} from "../lib/database/Product";

const DetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductInfoType | null>(null);
  const [rating, setRating] = useState<RatingInfoType | null>(null);

  const id = Number(productId);

  useEffect(() => {
    if (!isNaN(id)) {
      const setProductDetailInfo = async () => {
        const productDetail = await getProductDetailById(id);
        console.log({ productDetail });
        setProduct(productDetail);

        const ratings = await getProductRatings(id);
        console.log({ ratings });
        setRating(ratings);
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
                product?.img_url
                  ? product.img_url
                  : "/public/no_image_square.jpg"
              }
              alt={product?.name}
            />
          </div>
          <div className="detailpage_info_container">
            <div className="detailpage_info">
              <h2>{product?.name}</h2>
              <p>Price: ${product?.price.toFixed(2)}</p>
              <p>Target: {product?.target.name}</p>
              <p>Type: {product?.clothes_type.name}</p>

              <p>{product?.description}</p>
              <div className="detailpage_info_action_container">
                {product && (
                  <>
                    <ShoppingCartButton product={product} />
                    <FavoriteButton product={product} />
                  </>
                )}
              </div>
            </div>
            <div className="detailpage_itemReviews">
              <h3>レビュー</h3>
              <Rating
                name="read-only"
                value={rating?.average_rating || 0}
                readOnly
                defaultValue={0}
              />
              {rating?.comments?.map((comment) => {
                return <CommentCard key={comment.id} comment={comment} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailPage;
