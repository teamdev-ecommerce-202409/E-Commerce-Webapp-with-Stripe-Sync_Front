import FavoriteButton from "../../shared/FavoriteButton";
import ShoppingCartButton from "../../shared/ShoppingCartButton";
import "../../../style/ItemCard.css";
import { useNavigate } from "react-router-dom";
import { ProductInfoType } from "../../../lib/type/ProductType";
type Props = {
  item: ProductInfoType;
};
const ItemCard = ({ item }: Props) => {
  const navigate = useNavigate();

  // カードクリック時に詳細ページに遷移
  const handleCardClick = () => {
    navigate(`/item/${item.id}`);
  };
  return (
    <div key={item.id} className="itemCard_container" onClick={handleCardClick}>
      <img src={item.imgUrl} alt={item.title} className="itemImage" />
      <h3>{item.title}</h3>
      <p>Price: ${item.price.toFixed(2)}</p>
      <div className="itemActions_container">
        <FavoriteButton />
        <ShoppingCartButton />
      </div>
    </div>
  );
};

export default ItemCard;
