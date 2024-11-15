import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import { userInfoAtom } from "../../lib/jotai/atoms/user";
import { useAtom } from "jotai";
import { registerWish } from "../../lib/database/Product";
import { ProductInfoType } from "../../lib/type/ProductType";

type Props = {
  product: ProductInfoType;
};
const WishButton = ({ product }: Props) => {
  const [userInfoJotai] = useAtom(userInfoAtom);
  const [isWIsh, setIsWish] = useState(product.wish || false);

  const handleWishClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    await registerWish(
      product.id,
      !isWIsh,
      userInfoJotai && userInfoJotai.access,
    );
    setIsWish(!isWIsh);
  };

  return (
    <IconButton
      color="primary"
      aria-label="add to favorites"
      onClick={(event) => handleWishClick(event)}
    >
      {isWIsh ? <PlaylistAddCheckCircleIcon /> : <PlaylistAddCheckIcon />}
    </IconButton>
  );
};

export default WishButton;
