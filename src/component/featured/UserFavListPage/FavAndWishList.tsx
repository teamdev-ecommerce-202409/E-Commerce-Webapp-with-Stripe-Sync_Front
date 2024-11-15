import { ProductInfoType } from "../../../lib/type/ProductType";
import "../../../style/FavList.css";
import FavAndWishCard from "./FavAndWishCard";

type Props = {
  productList: ProductInfoType[];
};

const FavAndWishList = ({ productList }: Props) => {
  return (
    <div className="favList_container">
      {productList.map((product) => (
        <FavAndWishCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default FavAndWishList;
