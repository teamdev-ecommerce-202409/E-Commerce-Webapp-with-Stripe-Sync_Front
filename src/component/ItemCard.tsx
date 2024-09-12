import { ItemInfo } from "../lib/type/ItemType";
import FavoriteButton from "./FavoriteButton";
import ShoppingCartButton from "./ShoppingCartButton";
import "../style/ItemCard.css";
import { useNavigate } from "react-router-dom";
type Props = {
  item: ItemInfo;
};
const ItemCard = ({ item }: Props) => {
  const navigate = useNavigate();

  // カードクリック時に詳細ページに遷移
  const handleCardClick = () => {
    navigate(`/item/${item.id}`);
  };
  return (
    <div key={item.id} className="itemCard_container" onClick={handleCardClick}>
      <img src={item.imageUrl} alt={item.name} className="itemImage" />
      <h3>{item.name}</h3>
      <p>Price: ${item.price.toFixed(2)}</p>
      <div className="itemActions_container">
        <FavoriteButton />
        <ShoppingCartButton />
      </div>
    </div>
  );
};

export default ItemCard;
