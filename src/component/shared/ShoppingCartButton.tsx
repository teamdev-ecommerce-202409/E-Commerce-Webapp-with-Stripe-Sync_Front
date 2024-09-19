import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
const ShoppingCartButton = () => {
  const handleAddCartClick = () => {
    console.log("カートに入れた！");
  };

  return (
    <IconButton
      color="primary"
      aria-label="add to favorites"
      onClick={handleAddCartClick}
    >
      <AddShoppingCartIcon />
    </IconButton>
  );
};

export default ShoppingCartButton;
