import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { userInfoAtom } from "../../lib/jotai/atoms/user";
import { useAtom } from "jotai";
import { registerFav } from "../../lib/database/Product";
import { ProductInfoType } from "../../lib/type/ProductType";

type Props = {
  product: ProductInfoType;
};
const FavoriteButton = ({ product }: Props) => {
  const [userInfoJotai] = useAtom(userInfoAtom);
  const [isFavorite, setIsFavorite] = useState(product.fav || false);

  const handleFavoriteClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    await registerFav(
      product.id,
      !isFavorite,
      userInfoJotai && userInfoJotai.access,
    );
    setIsFavorite(!isFavorite);
  };

  return (
    <IconButton
      color="primary"
      aria-label="add to favorites"
      onClick={(event) => handleFavoriteClick(event)}
    >
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriteButton;
