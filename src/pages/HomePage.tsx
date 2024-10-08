import "../style/HomePage.css";
import { useEffect, useState } from "react";
import Layout from "../component/shared/Layout";
import { CatgoryType, ProductInfoType } from "../lib/type/ProductType";
import ProductFilter from "../component/featured/HomePage/ProductFilter";
import FilterCardList from "../component/featured/HomePage/FilterCardList";
import { getAllCategories, getProducts } from "../lib/database/Product";
import ProductList from "../component/featured/HomePage/ProductList";

const HomePage = () => {
  const [categories, setCategories] = useState<CatgoryType | null>(null);
  const [selectedCategories, setSelectedCategories] =
    useState<CatgoryType | null>({
      sizeCatgory: [],
      targetCatgory: [],
      typeCatgory: [],
      brandCatgory: [],
    });
  const [productList, setProductList] = useState<ProductInfoType[]>([]);
  const [filterTitle, setFilterTitle] = useState<string>("すべての商品");

  useEffect(() => {
    // 以下、初期表示時のデータ取得→設定
    const setInitialData = async () => {
      const allCategories = await getAllCategories();
      setCategories(allCategories);

      //商品リストを取得
      const products = await getProducts();
      console.log({ products });

      setProductList(products ? products : []);
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
  }, [selectedCategories, productList]);

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

        <div className="homepage_product_container">
          <ProductFilter
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <ProductList productList={productList} />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
