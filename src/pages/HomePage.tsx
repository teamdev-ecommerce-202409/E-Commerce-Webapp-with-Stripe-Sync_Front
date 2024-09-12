import ItemFilter from "../component/ItemFilter";
import ItemList from "../component/ItemList";
import "../style/HomePage.css";
import { useEffect, useState } from "react";
import { testCategories, testItems } from "../lib/testData/testData";
import { CategoryInfo } from "../lib/type/CategoryType";
import { ItemInfo } from "../lib/type/ItemType";
import Layout from "../component/Layout";

const HomePage = () => {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryInfo[]>(
    [],
  );
  const [itemList, setItemList] = useState<ItemInfo[]>([]);
  const [filterTitle, setFilterTitle] = useState<string>("すべての商品");

  useEffect(() => {
    // 以下、初期表示時に全件取得
    const allCategories = testCategories;
    setCategories(allCategories);

    //商品リストを取得
    const allItems = testItems;
    setItemList(allItems);
  }, []);

  useEffect(() => {
    // カテゴリが選択されたときに商品リストをフィルタリング
    // →バックエンドAPIに引数渡してリクエスト

    console.log({ selectedCategories });

    // タイトルを変更
    if (selectedCategories.find((val) => val.id == 2)) {
      const itemType = selectedCategories.find((val) => val.id == 2)
        ?.categoryChoices[0].name;
      setFilterTitle(itemType || "");
    }
  }, [selectedCategories, itemList]);

  return (
    <Layout>
      <div className="homepage_container">
        <div className="homepage_title_container">
          <h2>{selectedCategories.length > 0 ? filterTitle : filterTitle}</h2>
        </div>

        <div className="homepage_item_container">
          <ItemFilter
            categories={categories}
            setSelectedCategories={setSelectedCategories}
          />
          <ItemList itemList={itemList} />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
