import { CategoryInfo } from "../../../lib/type/CategoryType";
import "../../../style/ItemFilter.css";
import CatgoryCheckBox from "./CatgoryCheckBox";
type Props = {
  categories: CategoryInfo[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<CategoryInfo[]>>;
};
const ItemFilter = ({ categories, setSelectedCategories }: Props) => {
  const handleCategoryChange = (
    categoryInfo: CategoryInfo,
    isChecked: boolean,
  ) => {
    console.log("handleCategoryChange", categoryInfo, isChecked);
    setSelectedCategories((prevCategories) => {
      if (isChecked) {
        // チェックされた場合、カテゴリを追加
        return [...prevCategories, categoryInfo];
      } else {
        // チェックが外れた場合、カテゴリを削除
        return prevCategories.filter(
          (category) => category.id !== categoryInfo.id,
        );
      }
    });
  };
  return (
    <div className="itemFilter_container">
      {categories.map((categoryInfo) => {
        return (
          <CatgoryCheckBox
            key={categoryInfo.id}
            categoryInfo={categoryInfo}
            onCategoryChange={handleCategoryChange}
          />
        );
      })}
    </div>
  );
};

export default ItemFilter;
