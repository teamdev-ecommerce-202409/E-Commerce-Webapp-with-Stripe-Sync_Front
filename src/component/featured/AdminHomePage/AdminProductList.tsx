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
import { ProductInfoType } from "../../../lib/type/ProductType";

type Props = {
  productList: ProductInfoType[];
};

const AdminProductList = ({ productList }: Props) => {
  const [checkedProducts, setCheckedProducts] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleToggle = (id: number) => {
    const currentIndex = checkedProducts.indexOf(id);
    const newChecked = [...checkedProducts];
    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedProducts(newChecked);
  };

  const handleEdit = (product: ProductInfoType) => {
    const productId = product.id;
    navigate(`/admin/product/${productId}`, { state: productId });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>製品名</TableCell>
            <TableCell>説明</TableCell>
            <TableCell>価格</TableCell>
            <TableCell>発売日</TableCell>
            <TableCell>在庫数</TableCell>
            <TableCell>サイズ</TableCell>
            <TableCell>ブランド</TableCell>
            <TableCell>対象</TableCell>
            <TableCell>タイプ</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList.map((product) => (
            <TableRow key={product.id}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={checkedProducts.indexOf(product.id) !== -1}
                  onChange={() => handleToggle(product.id)}
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {" "}
                {product.description.length > 10
                  ? product.description.slice(0, 10) + "..."
                  : product.description}
              </TableCell>
              <TableCell>{`$${product.price.toFixed(2)}`}</TableCell>
              <TableCell>{product.release_date}</TableCell>
              <TableCell>{product.stock_quantity}</TableCell>
              <TableCell>{product.size.name}</TableCell>
              <TableCell>{product.brand.name}</TableCell>
              <TableCell>{product.target.name}</TableCell>
              <TableCell>{product.clothes_type.name}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(product)}>
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
