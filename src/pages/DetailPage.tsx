import { useEffect, useState } from "react";
import "../style/DetailPage.css";
import Layout from "../component/shared/Layout";
import { useParams } from "react-router-dom";
import ShoppingCartButton from "../component/shared/ShoppingCartButton";
import FavoriteButton from "../component/shared/FavoriteButton";
import Rating from "@mui/material/Rating";
import CommentCard from "../component/featured/DetailPage/CommentCard";
import { CommentInfoType, ProductInfoType } from "../lib/type/ProductType";
import {
  getProductDetailById,
  getProductRatings,
} from "../lib/database/Product";
import { IconButton } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { useAtom } from "jotai";
import ModalPopup from "../component/shared/ModalPopup";
import CommentForm from "../component/featured/DetailPage/CommentForm";
import { PaginationInfoType } from "../lib/type/GenericType";

const DetailPage = () => {
  const [userInfoJotai] = useAtom(userInfoAtom);
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductInfoType | null>(null);
  const [rating, setRating] =
    useState<PaginationInfoType<CommentInfoType> | null>(null);
  const [openCommentForm, setOpenCommentForm] = useState(false);

  const id = Number(productId);

  useEffect(() => {
    if (!isNaN(id)) {
      const setProductDetailInfo = async () => {
        const productDetail = await getProductDetailById(id);
        console.log({ productDetail });
        setProduct(productDetail);

        const ratings = await getProductRatings(
          id,
          userInfoJotai && userInfoJotai.access,
        );
        console.log({ ratings });
        setRating(ratings);
      };
      setProductDetailInfo();
    }
  }, [id]);

  return (
    <>
      <Layout>
        <div className="detailpage_container">
          <div className="detailpage_content">
            <div className="detailpage_image">
              <img
                src={
                  product?.img_url ? product.img_url : "/no_image_square.jpg"
                }
                alt={product?.name}
              />
            </div>
            <div className="detailpage_info_container">
              <div className="detailpage_info">
                <h2>{product?.name}</h2>

                <div className="detailpage_info_product_detail_container">
                  <p>
                    <span className="detailpage_info_product_detail_title">
                      Price:
                    </span>
                    ￥{product?.price.toLocaleString()}
                  </p>
                  <p>
                    <span className="detailpage_info_product_detail_title">
                      Target:
                    </span>
                    {product?.target.name}
                  </p>
                  <p>
                    <span className="detailpage_info_product_detail_title">
                      Type:
                    </span>
                    {product?.clothes_type.name}
                  </p>
                  <p>
                    <span className="detailpage_info_product_detail_title">
                      Size:
                    </span>
                    {product?.size.name}
                  </p>

                  <p className="detailpage_info_product_description">
                    {product?.description}
                  </p>
                </div>
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
                <div className="detailpage_itemReviews_title_container">
                  <h4>レビュー</h4>
                  {/* 購入したことがある商品のみコメント可能 */}
                  {rating?.is_ordered && (
                    <IconButton onClick={() => setOpenCommentForm(true)}>
                      <ChatBubbleOutlineIcon />
                    </IconButton>
                  )}
                </div>
                <div className="detailpage_allReviews_container">
                  <Rating
                    name="read-only"
                    value={rating?.average_rating || 0}
                    readOnly
                    defaultValue={0}
                  />
                  <span className="detailpage_allReviews_count">{`(${rating?.count})`}</span>
                </div>
                {rating?.results?.map((comment) => {
                  return <CommentCard key={comment.id} comment={comment} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
      {product && (
        <ModalPopup
          open={openCommentForm}
          handleClose={() => {
            setOpenCommentForm(false);
          }}
        >
          <CommentForm product={product} />
        </ModalPopup>
      )}
    </>
  );
};

export default DetailPage;
