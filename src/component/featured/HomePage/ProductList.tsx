import { ProductInfoType } from "../../../lib/type/ProductType";
import "../../../style/ProductList.css";
import ProductCard from "./ProductCard";

type Props = {
  productList: ProductInfoType[];
};

const ProductList = ({ productList }: Props) => {
  return (
    <div className="productList_container">
      {productList.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
