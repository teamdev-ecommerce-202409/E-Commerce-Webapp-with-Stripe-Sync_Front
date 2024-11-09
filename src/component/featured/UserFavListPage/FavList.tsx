import { ProductInfoType } from "../../../lib/type/ProductType";
import "../../../style/FavList.css";
import FavCard from "./FavCard";

type Props = {
  productList: ProductInfoType[];
};

const FavList = ({ productList }: Props) => {
  return (
    <div className="favList_container">
      {productList.map((product) => (
        <FavCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default FavList;
