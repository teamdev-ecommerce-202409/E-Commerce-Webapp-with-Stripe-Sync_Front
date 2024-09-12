import { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { CategoryInfo } from "../lib/type/CategoryType";
type Props = {
  categoryInfo: CategoryInfo;
};
const CategorySelectBox = ({ categoryInfo }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">
        {categoryInfo.categoryName}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedOption}
        label="Select an option"
        onChange={handleChange}
      >
        {categoryInfo.categoryChoices.map((categoryChoice) => {
          return (
            <MenuItem key={categoryChoice.id} value={categoryChoice.id}>
              {categoryChoice.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CategorySelectBox;
