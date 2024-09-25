// import CategoryCheckBox from "./CategoryCheckBox";
import {
  BrandType,
  CatgoryType,
  ClothesType,
  SizeType,
  TargetType,
} from "../../../lib/type/ProductType";
import CategoryCheckBox from "./CatgoryCheckBox";

const ItemFilter = ({
  categories,
  selectedCategories,
  setSelectedCategories,
}: {
  categories: CatgoryType | null;
  selectedCategories: CatgoryType | null;
  setSelectedCategories: React.Dispatch<
    React.SetStateAction<CatgoryType | null>
  >;
}) => {
  if (!categories || !selectedCategories) return null;

  return (
    <div>
      <CategoryCheckBox<SizeType>
        label="サイズ"
        categories={categories.sizeCatgory}
        selectedCategories={selectedCategories.sizeCatgory}
        setSelectedCategories={(newSelected) =>
          setSelectedCategories({
            ...selectedCategories,
            sizeCatgory: newSelected,
          })
        }
      />

      <CategoryCheckBox<TargetType>
        label="ターゲット"
        categories={categories.targetCatgory}
        selectedCategories={selectedCategories.targetCatgory}
        setSelectedCategories={(newSelected) =>
          setSelectedCategories({
            ...selectedCategories,
            targetCatgory: newSelected,
          })
        }
      />

      <CategoryCheckBox<ClothesType>
        label="種類"
        categories={categories.typeCatgory}
        selectedCategories={selectedCategories.typeCatgory}
        setSelectedCategories={(newSelected) =>
          setSelectedCategories({
            ...selectedCategories,
            typeCatgory: newSelected,
          })
        }
      />

      <CategoryCheckBox<BrandType>
        label="ブランド"
        categories={categories.brandCatgory}
        selectedCategories={selectedCategories.brandCatgory}
        setSelectedCategories={(newSelected) =>
          setSelectedCategories({
            ...selectedCategories,
            brandCatgory: newSelected,
          })
        }
      />
    </div>
  );
};

export default ItemFilter;
