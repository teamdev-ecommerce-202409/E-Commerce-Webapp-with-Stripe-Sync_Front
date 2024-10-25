import FavoriteButton from "../../shared/FavoriteButton";
import ShoppingCartButton from "../../shared/ShoppingCartButton";
import "../../../style/ProductCard.css";
import { useNavigate } from "react-router-dom";
import { ProductInfoType } from "../../../lib/type/ProductType";
type Props = {
  product: ProductInfoType;
};
const ProductCard = ({ product }: Props) => {
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
        src={product.imgUrl ? product.imgUrl : "public/no_image_square.jpg"}
        alt={product.name}
        className="productImage"
      />
      <h3>{product.name}</h3>
      <p> ¥{product.price.toLocaleString()}</p>
      <div className="productActions_container">
        <FavoriteButton product={product} />
        <ShoppingCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
