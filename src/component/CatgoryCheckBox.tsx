import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { FormLabel } from "@mui/material";
import { CategoryInfo } from "../lib/type/CategoryType";

type Props = {
  categoryInfo: CategoryInfo;
  onCategoryChange: (categoryInfo: CategoryInfo, isChecked: boolean) => void;
};

const CategoryCheckBox = ({ categoryInfo, onCategoryChange }: Props) => {
  // 各チェックボックスの状態を動的に管理
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    console.log(name, checked);
    setChecked((prev) => ({
      ...prev,
      [name]: checked,
    }));

    // 親コンポーネントに選択されたカテゴリの状態を通知
    onCategoryChange(categoryInfo, checked);
  };

  return (
    <div>
      <FormLabel component="legend">{categoryInfo.categoryName}</FormLabel>
      <FormGroup>
        {categoryInfo.categoryChoices.map((categoryChoice) => (
          <FormControlLabel
            key={categoryChoice.name} // keyを指定してリスト項目を一意に識別
            control={
              <Checkbox
                checked={checked[categoryChoice.name] || false} // checkedの動的管理
                onChange={handleChange}
                name={categoryChoice.name} // nameにカテゴリ名を設定
              />
            }
            label={categoryChoice.name} // チェックボックスのラベル
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default CategoryCheckBox;
