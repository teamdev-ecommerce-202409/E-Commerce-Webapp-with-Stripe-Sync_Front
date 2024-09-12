import { ItemInfo } from "../lib/type/ItemType";
import "../style/ItemList.css";
import ItemCard from "./ItemCard";

type Props = {
  itemList: ItemInfo[];
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
