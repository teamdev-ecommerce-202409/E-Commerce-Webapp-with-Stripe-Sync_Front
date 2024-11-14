import "../style/HomePage.css";
import { useEffect, useState } from "react";
import Layout from "../component/shared/Layout";
import { CatgoryType, ProductInfoType } from "../lib/type/ProductType";
import ProductFilter from "../component/featured/HomePage/ProductFilter";
import FilterCardList from "../component/featured/HomePage/FilterCardList";
import { getAllCategories, getProducts } from "../lib/database/Product";
import ProductList from "../component/featured/HomePage/ProductList";
import PaginationControl from "../component/shared/PaginationControl";
import { loadNumPerPage } from "../lib/constants";
import SearchInput from "../component/shared/SearchInput";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";

const HomePage = () => {
  const [userInfoJotai] = useAtom(userInfoAtom);
  const [categories, setCategories] = useState<CatgoryType | null>(null);
  const [selectedCategories, setSelectedCategories] =
    useState<CatgoryType | null>({
      sizeCatgory: [],
      targetCatgory: [],
      typeCatgory: [],
      brandCatgory: [],
    });
  const [keyword, setKeyword] = useState("");
  const [productList, setProductList] = useState<ProductInfoType[]>([]);
  const [page, setPage] = useState(1);
  const [allPageCount, setAllPageCount] = useState(1);
  const [filterTitle, setFilterTitle] = useState<string>("すべての商品");

  const fetchFilteredProducts = async (currentPage = page) => {
    // 全てのカテゴリを取得
    const allCategories = await getAllCategories();
    setCategories(allCategories);

    // フィルタリング条件が設定されているか
    if (
      keyword ||
      (selectedCategories &&
        (selectedCategories.brandCatgory.length > 0 ||
          selectedCategories.typeCatgory.length > 0 ||
          selectedCategories.targetCatgory.length > 0 ||
          selectedCategories.sizeCatgory.length > 0))
    ) {
      // フィルタ条件に基づいて商品リストを取得
      const filteredProducts = await getProducts(
        {
          page: currentPage,
          sizeId: selectedCategories?.sizeCatgory.map((size) => size.id),
          targetId: selectedCategories?.targetCatgory.map(
            (target) => target.id,
          ),
          clothesTypeId: selectedCategories?.typeCatgory.map(
            (clothType) => clothType.id,
          ),
          brandId: selectedCategories?.brandCatgory.map((brand) => brand.id),
          keyword: keyword,
        },
        userInfoJotai && userInfoJotai.access,
      );

      // 商品リストを更新
      setProductList(filteredProducts ? filteredProducts.results : []);

      // ページネーション設定
      if (filteredProducts?.count) {
        setAllPageCount(Math.ceil(filteredProducts?.count / loadNumPerPage));
      } else {
        setAllPageCount(0);
      }

      // タイトルを変更
      setFilterTitle("検索結果");
    } else {
      // フィルタがない場合は全ての商品を取得
      const allProducts = await getProducts(
        { page: currentPage },

        userInfoJotai && userInfoJotai.access,
      );
      setProductList(allProducts ? allProducts.results : []);
      // ページネーション設定
      if (allProducts?.count) {
        setAllPageCount(Math.ceil(allProducts?.count / loadNumPerPage));
      } else {
        setAllPageCount(0);
      }
      setFilterTitle("全商品リスト");
    }
  };

  useEffect(() => {
    // カテゴリが選択された場合orキーワードが入力された場合、製品リストを新たに取得する

    // ページを初期値に戻す
    const newPage = 1;
    setPage(newPage);

    // カテゴリでフィルタリングされたリストを取得するAPIを呼び出す
    fetchFilteredProducts(newPage);
  }, [selectedCategories, keyword]);

  useEffect(() => {
    // ページ番号が変更された時、次ページの製品リストを新たに取得する

    fetchFilteredProducts();
  }, [page]);
  return (
    <Layout>
      <div className="homepage_container">
        <div className="homepage_searchConditions_container">
          <div className="homepage_title_container">
            <h2>{filterTitle}</h2>
            <div className="homepage_keyword_container">
              <SearchInput keyword={keyword} setKeyword={setKeyword} />
            </div>
          </div>

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
            <FilterCardList
              categoryLabel="キーワード"
              selectedCategory={
                keyword
                  ? [
                      {
                        id: Math.floor(Math.random() * 1000000) + Date.now(),
                        name: keyword,
                      },
                    ]
                  : []
              }
            />
          </div>
        </div>

        <div className="homepage_product_container">
          <ProductFilter
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <div className="homepage_productList_container">
            <ProductList productList={productList} />
            <PaginationControl
              allPageCount={allPageCount} //総ページ数
              handlePageChange={setPage} //変更されたときに走る関数。第2引数にページ番号が入る
              page={page} //現在のページ番号
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
