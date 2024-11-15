import FavoriteButton from "../../shared/FavoriteButton";
import ShoppingCartButton from "../../shared/ShoppingCartButton";
import "../../../style/ProductCard.css";
import { useNavigate } from "react-router-dom";
import { ProductInfoType } from "../../../lib/type/ProductType";
import { useAtom } from "jotai";
import { userInfoAtom } from "../../../lib/jotai/atoms/user";
import WishButton from "../../shared/WishButton";
type Props = {
  product: ProductInfoType;
};
const ProductCard = ({ product }: Props) => {
  const [userInfoJotai] = useAtom(userInfoAtom);

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
      <p> サイズ：{product.size.name}</p>

      <div className="productActions_container">
        {userInfoJotai && userInfoJotai.access && (
          <>
            <FavoriteButton product={product} />
            <WishButton product={product} />
          </>
        )}
        <ShoppingCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
