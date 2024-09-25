import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { useState } from "react";
// import { CatgoryType, SizeType, TargetType, ClothesType, BrandType } from "../../../lib/type/ProductType";

type Props<T> = {
  label: string; // "サイズ", "ターゲット" など
  categories: T[];
  selectedCategories: T[];
  setSelectedCategories: (categories: T[]) => void;
};

const CategoryCheckBox = <T extends { id: number; name: string }>({
  label,
  categories,
  selectedCategories,
  setSelectedCategories,
}: Props<T>) => {
  // チェックボックスの選択状態を管理するstate
  const [checkedState, setCheckedState] = useState<{ [key: number]: boolean }>(
    {},
  );

  // チェックボックスが変更されたときの処理
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const numId = Number(name);

    // チェックボックスの状態を更新
    setCheckedState((prev) => ({
      ...prev,
      [numId]: checked,
    }));

    // 選択されたカテゴリをsetSelectedCategoriesで更新
    if (checked) {
      setSelectedCategories([
        ...selectedCategories,
        categories.find((category) => category.id === numId)!,
      ]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category.id !== numId),
      );
    }
  };

  return (
    <div>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {categories.map((categoryChoice) => (
          <FormControlLabel
            key={categoryChoice.id}
            control={
              <Checkbox
                checked={checkedState[categoryChoice.id] || false}
                onChange={handleChange}
                name={categoryChoice.id.toString()}
              />
            }
            label={categoryChoice.name}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default CategoryCheckBox;
