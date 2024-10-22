import Layout from "../component/shared/Layout";
import PrimaryButton from "../component/shared/PrimaryButton";
import { useNavigate } from "react-router-dom";
import "../style/AdminProductPage.css";
import "../style/HomePage.css";
import AdminProductList from "../component/featured/AdminHomePage/AdminProductList";
import { CatgoryType, ProductInfoType } from "../lib/type/ProductType";
import { useEffect, useState } from "react";
import { getAllCategories, getProducts } from "../lib/database/Product";
import { loadNumPerPage } from "../lib/constants";
import ProductFilter from "../component/featured/HomePage/ProductFilter";
import PaginationControl from "../component/shared/PaginationControl";

const AdminProductPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CatgoryType | null>(null);
  const [selectedCategories, setSelectedCategories] =
    useState<CatgoryType | null>({
      sizeCatgory: [],
      targetCatgory: [],
      typeCatgory: [],
      brandCatgory: [],
    });
  const [productList, setProductList] = useState<ProductInfoType[]>([]);
  const [page, setPage] = useState(1);
  const [allPageCount, setAllPageCount] = useState(1);
  const [filterTitle, setFilterTitle] = useState<string>("すべての商品");

  const handleCreate = () => {
    navigate(`/admin/product/new`);
  };

  const handleDelete = () => { };

  const fetchFilteredProducts = async (currentPage = page) => {
    const allCategories = await getAllCategories();
    setCategories(allCategories);
    if (
      selectedCategories &&
      (selectedCategories.brandCatgory.length > 0 ||
        selectedCategories.typeCatgory.length > 0 ||
        selectedCategories.targetCatgory.length > 0 ||
        selectedCategories.sizeCatgory.length > 0)
    ) {
      const filteredProducts = await getProducts(
        currentPage,
        selectedCategories.sizeCatgory.map((size) => size.id),
        selectedCategories.targetCatgory.map((target) => target.id),
        selectedCategories.typeCatgory.map((clothType) => clothType.id),
        selectedCategories.brandCatgory.map((brand) => brand.id),
      );
      setProductList(filteredProducts ? filteredProducts.results : []);
      if (filteredProducts?.count) {
        setAllPageCount(Math.ceil(filteredProducts?.count / loadNumPerPage));
      } else {
        setAllPageCount(0);
      }
      setFilterTitle("検索結果");
    } else {
      const allProducts = await getProducts(currentPage);
      setProductList(allProducts ? allProducts.results : []);
      if (allProducts?.count) {
        setAllPageCount(Math.ceil(allProducts?.count / loadNumPerPage));
      } else {
        setAllPageCount(0);
      }
      setFilterTitle("商品リスト(管理)");
    }
  };

  useEffect(() => {
    const newPage = 1;
    setPage(newPage);
    fetchFilteredProducts(newPage);
  }, [selectedCategories]);

  useEffect(() => {
    fetchFilteredProducts();
  }, [page]);

  return (
    <Layout>
      <div className="adminHomePage_container">
        <div className="homepage_title_container">
          <h2>{filterTitle}</h2>
        </div>

        <div className="adminHomePage_actions_container">
          <div className="adminHomePage_button_container">
            <PrimaryButton
              onClick={handleCreate}
              loading={false}
              text={"新規作成"}
            />
          </div>
          <div className="adminHomePage_button_container">
            <PrimaryButton
              onClick={handleDelete}
              loading={false}
              text={"削除"}
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
            page:{page}
            allpage:{allPageCount}
            <AdminProductList productList={productList} />
            <PaginationControl
              allPageCount={allPageCount}
              handlePageChange={setPage}
              page={page}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProductPage;
