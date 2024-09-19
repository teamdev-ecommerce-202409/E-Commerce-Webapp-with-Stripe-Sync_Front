import Layout from "../component/shared/Layout";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../style/DeatilPage.css";
// import { ItemInfo } from "../lib/type/ItemType";
import { useParams } from "react-router-dom";
import {
  adminListItems,
  TestInfoType,
} from "../component/featured/AdminHomePage/AdminItemList";
interface LocationState {
  mode: "create" | "edit";
  itemId?: number;
}
const AdminItemDetailPage = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const [item, setItem] = useState<TestInfoType | undefined>(undefined);
  const { itemId } = useParams<{ itemId: string }>();

  // id を数値に変換
  const id = Number(itemId);

  useEffect(() => {
    if (state.mode === "edit" && state.itemId) {
      // 編集モードの場合、APIなどから対象アイテムのデータを取得

      const testItems = adminListItems;
      if (!isNaN(id)) {
        const testItem = testItems.find((item) => item.id === id);
        if (testItem) {
          setItem(testItem);
        }
      }
    }
  }, [state]);
  return (
    <Layout>
      <div className="adminItemDetailPage_container">{item?.id}</div>;
    </Layout>
  );
};

export default AdminItemDetailPage;
