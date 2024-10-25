// import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ProductInfoType } from "../../lib/type/ProductType";
import { useLikeState } from "../../hook/useLikeState";
type Props = {
  product: ProductInfoType;
};
const FavoriteButton = ({ product }: Props) => {
  const {
    likeState,
    setLikeState,

    registerLikeState,
  } = useLikeState(product);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLikeState(!likeState);

    registerLikeState();
  };

  return (
    <IconButton
      color="primary"
      aria-label="add to favorites"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
        handleFavoriteClick(e)
      }
    >
      {likeState ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriteButton;
