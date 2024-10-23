import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    console.log("fav!");
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
