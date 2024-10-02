// import ItemFilter from "../component/featured/HomePage/ItemFilter";
import ItemList from "../component/featured/HomePage/ItemList";
import "../style/HomePage.css";
import { useEffect, useState } from "react";
import { testItems } from "../lib/testData/testData";
import Layout from "../component/shared/Layout";
// import { getAllCategories } from "../lib/database/Product";
import { CatgoryType, ProductInfoType } from "../lib/type/ProductType";
import ItemFilter from "../component/featured/HomePage/ItemFilter";
// import FilterCard from "../component/featured/HomePage/FilterCardList";
import FilterCardList from "../component/featured/HomePage/FilterCardList";
import { getAllCategories } from "../lib/database/Product";
// import { getProducts } from "../lib/database/Product";

const HomePage = () => {
  const [categories, setCategories] = useState<CatgoryType | null>(null);
  const [selectedCategories, setSelectedCategories] =
    useState<CatgoryType | null>({
      sizeCatgory: [],
      targetCatgory: [],
      typeCatgory: [],
      brandCatgory: [],
    }); // カテゴリ選択を管理
  const [itemList, setItemList] = useState<ProductInfoType[]>([]);
  const [filterTitle, setFilterTitle] = useState<string>("すべての商品");

  useEffect(() => {
    // 以下、初期表示時のデータ取得→設定
    const setInitialData = async () => {
      const allCategories = await getAllCategories();
      setCategories(allCategories);
      // setCategories(testCategories);

      //商品リストを取得
      // const products = await getProducts();
      // setItemList(products ? products : []);
      const allItems = testItems;
      setItemList(allItems);
    };

    setInitialData();
  }, []);

  useEffect(() => {
    // カテゴリが選択されたときに商品リストをフィルタリング
    // →バックエンドAPIに引数渡してリクエスト

    console.log({ selectedCategories });

    if (
      selectedCategories &&
      (selectedCategories.brandCatgory.length > 0 ||
        selectedCategories.typeCatgory.length > 0 ||
        selectedCategories.targetCatgory.length > 0 ||
        selectedCategories.sizeCatgory.length > 0)
    ) {
      // タイトルを変更

      setFilterTitle("検索結果");
    }
  }, [selectedCategories, itemList]);

  // フィルタリング処理
  // useEffect(() => {
  //   if (selectedCategories) {
  //     // 選択されたカテゴリに基づいて商品リストをフィルタリングするロジックをここに追加
  //     // 例: サイズやブランドなどに基づくフィルタリング
  //     const filteredItems = testItems.filter((item) => {
  //       // カテゴリに応じたフィルタリング条件をここで指定
  //       console.log(item);
  //       return true; // フィルタリング条件
  //     });
  //     setItemList(filteredItems);
  //   }
  // }, [selectedCategories]);

  return (
    <Layout>
      <div className="homepage_container">
        <div className="homepage_title_container">
          <h2>{filterTitle}</h2>

          {/* selectedCategoriesに入っている情報をカードにして表示 */}

          <div className="homepage_filterCards_container">
            <FilterCardList
              categoryLabel="ブランド"
              selectedCategory={selectedCategories?.brandCatgory || []}
            />
            <FilterCardList
              categoryLabel="サイズ"
              selectedCategory={selectedCategories?.sizeCatgory || []}
            />
            <FilterCardList
              categoryLabel="ターゲット"
              selectedCategory={selectedCategories?.targetCatgory || []}
            />
            <FilterCardList
              categoryLabel="種類"
              selectedCategory={selectedCategories?.typeCatgory || []}
            />
          </div>
        </div>

        <div className="homepage_item_container">
          <ItemFilter
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <ItemList itemList={itemList} />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
