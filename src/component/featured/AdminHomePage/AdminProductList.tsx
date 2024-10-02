import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

// アイテムの型定義
export type TestInfoType = {
  id: number;
  title: string;
  description: string;
  price: number;
  release_date: string;
  stock_quantity: number;
  brand: string;
  clothes_type: string;
  size: string;
  target: string;
  is_deleted: boolean;
};

// データ例
export const adminListItems: TestInfoType[] = [
  {
    id: 1,
    title: "Nike Air T-shirt",
    description: "A lightweight and breathable t-shirt.",
    price: 50.0,
    release_date: "2024-01-01",
    stock_quantity: 100,
    brand: "Nike",
    clothes_type: "Shirt",
    size: "M",
    target: "Men",
    is_deleted: false,
  },
  {
    id: 2,
    title: "Adidas Track Pants",
    description: "Comfortable track pants.",
    price: 60.0,
    release_date: "2023-12-01",
    stock_quantity: 50,
    brand: "Adidas",
    clothes_type: "Pants",
    size: "L",
    target: "Women",
    is_deleted: false,
  },
];

const AdminProductList = () => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleToggle = (id: number) => {
    const currentIndex = checkedItems.indexOf(id);
    const newChecked = [...checkedItems];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedItems(newChecked);
  };

  const handleEdit = (item: TestInfoType) => {
    const itemId = item.id;
    navigate(`/admin/product/${itemId}`, { state: item });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>アイテム名</TableCell>
            <TableCell>説明</TableCell>
            <TableCell>価格</TableCell>
            <TableCell>在庫数</TableCell>
            <TableCell>サイズ</TableCell>
            <TableCell>ブランド</TableCell>
            <TableCell>対象</TableCell>
            <TableCell>タイプ</TableCell>
            <TableCell>発売日</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminListItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={checkedItems.indexOf(item.id) !== -1}
                  onChange={() => handleToggle(item.id)}
                />
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                {" "}
                {item.description.length > 10
                  ? item.description.slice(0, 10) + "..."
                  : item.description}
              </TableCell>
              <TableCell>{`$${item.price.toFixed(2)}`}</TableCell>
              <TableCell>{item.stock_quantity}</TableCell>
              <TableCell>{item.size}</TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>{item.target}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(item)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminProductList;
