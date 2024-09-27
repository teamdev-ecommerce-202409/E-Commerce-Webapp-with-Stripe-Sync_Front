import { ProductInfoType } from "../../../lib/type/ProductType";
import "../../../style/ItemList.css";
import ItemCard from "./ItemCard";

type Props = {
  itemList: ProductInfoType[];
};

const ItemList = ({ itemList }: Props) => {
  return (
    <div className="itemList_container">
      {itemList.map((item) => (
        <ItemCard item={item} key={item.id} />
      ))}
    </div>
  );
};

export default ItemList;
