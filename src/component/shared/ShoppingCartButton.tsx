import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
const ShoppingCartButton = () => {
  const handleAddCartClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    console.log("カートに入れた！");
  };

  return (
    <IconButton
      color="primary"
      aria-label="add to favorites"
      onClick={(event) => handleAddCartClick(event)}
    >
      <AddShoppingCartIcon />
    </IconButton>
  );
};

export default ShoppingCartButton;
