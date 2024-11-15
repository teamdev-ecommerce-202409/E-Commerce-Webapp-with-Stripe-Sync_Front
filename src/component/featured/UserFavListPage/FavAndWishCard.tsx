import ShoppingCartButton from "../../shared/ShoppingCartButton";
import "../../../style/ProductCard.css";
import { useNavigate } from "react-router-dom";
import { ProductInfoType } from "../../../lib/type/ProductType";
type Props = {
  product: ProductInfoType;
};
const FavAndWishCard = ({ product }: Props) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <div
      key={product.id}
      className="productCard_container"
      onClick={handleCardClick}
    >
      <img
        src={product.img_url ? product.img_url : "public/no_image_square.jpg"}
        alt={product.name}
        className="productImage"
      />
      <h3>{product.name}</h3>
      <p> ¥{product.price.toLocaleString()}</p>
      <div className="productActions_container">
        <ShoppingCartButton product={product} />
      </div>
    </div>
  );
};

export default FavAndWishCard;
