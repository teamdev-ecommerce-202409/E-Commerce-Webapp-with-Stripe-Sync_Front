import { useEffect, useState } from "react";
import "../../../style/CommentForm.css";
import { TextareaAutosize } from "@mui/material";
import { ProductInfoType } from "../../../lib/type/ProductType";
import { Controller, useForm } from "react-hook-form";
import PrimaryButton from "../../shared/PrimaryButton";
import Rating from "@mui/material/Rating";
import {
  getProductReviewOfLoginUser,
  registerProductRating,
} from "../../../lib/database/Product";
import { userInfoAtom } from "../../../lib/jotai/atoms/user";
import { useAtom } from "jotai";

type FormData = {
  productComment: string;
  rating: number;
};
type Props = {
  product: ProductInfoType;
};
const CommentForm = ({ product }: Props) => {
  const [userInfoJotai] = useAtom(userInfoAtom);
  const [loading, setLoading] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    // watch,
    // setValue,
    formState: { errors },
    reset,
    // setError,
    // clearErrors,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    // バックエンドにコメントと登録
    await registerProductRating(
      product.id,
      data.rating,
      data.productComment,
      userInfoJotai && userInfoJotai.access,
    );

    reset();
    setLoading(false);
    window.location.reload();
  };
  useEffect(() => {
    //そのユーザーのコメントをバックエンドから取得
    const getPreviouReview = async () => {
      const previousReview = await getProductReviewOfLoginUser(
        product.id,
        userInfoJotai.access,
      );
      if (previousReview) {
        reset({
          rating: previousReview.rating,
          productComment: previousReview.comment,
        });
      }
    };
    getPreviouReview();
  }, []);
  return (
    <div className="commentForm__container">
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.productComment && (
          <p className="errMsg"> message is required</p>
        )}

        <div className="reviewBox__input">
          <Controller
            name="rating"
            control={control}
            defaultValue={0}
            rules={{ required: "評価を入力してください" }}
            render={({ field }) => (
              <Rating
                {...field}
                onChange={(event, newValue) => field.onChange(newValue)}
              />
            )}
          />

          {errors.rating && (
            <p style={{ color: "red" }}>{errors.rating.message}</p>
          )}
          <TextareaAutosize
            {...register("productComment", { required: true, maxLength: 200 })}
            maxRows={10}
            maxLength={200}
            placeholder={"購入した商品のレビューをしてください。"}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              padding: "10px",
              boxSizing: "border-box",
              resize: "none",
              fontFamily: "inherit",
            }}
          />
        </div>

        <div className="commentform_registerButton__container">
          <PrimaryButton
            loading={loading}
            text={"Register"}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
