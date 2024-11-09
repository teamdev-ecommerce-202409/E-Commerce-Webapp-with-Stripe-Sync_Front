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
import {
  deleteProducts,
  // updateProductDetail,
} from "../../../lib/database/Product";
import PrimaryButton from "../../shared/PrimaryButton";
import { useAtom } from "jotai";
import { userInfoAtom } from "../../../lib/jotai/atoms/user";

type Props = {
  productList: ProductInfoType[];
  setProductList: React.Dispatch<React.SetStateAction<ProductInfoType[]>>;
};

const NUM_OF_PRODUCT_PER_PAGE = 10;

const AdminProductList = ({ productList, setProductList }: Props) => {
  const [userInfoJotai] = useAtom(userInfoAtom);

  const [checkedProductIds, setCheckedProductIds] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleToggle = (id: number) => {
    const currentIndex = checkedProductIds.indexOf(id);
    const newChecked = [...checkedProductIds];
    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedProductIds(newChecked);
  };

  const handleAllTogle = () => {
    const newChecked = [...checkedProductIds];
    if (newChecked.length === NUM_OF_PRODUCT_PER_PAGE) {
      newChecked.splice(0);
    } else {
      for (const product of productList) {
        if (checkedProductIds.indexOf(product.id) === -1) {
          newChecked.push(product.id);
        }
      }
    }
    setCheckedProductIds(newChecked);
  };

  const handleEdit = (product: ProductInfoType) => {
    const productId = product.id;
    navigate(`/admin/product/${productId}`, { state: productId });
  };

  const handleDelete = async () => {
    try {
      await deleteProducts(checkedProductIds, userInfoJotai.access);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(String(error));
      }
    }
    const newProductList = productList.filter(
      (product) => !checkedProductIds.includes(product.id),
    );
    alert(`${checkedProductIds.length}件削除しました。`);
    setCheckedProductIds([]);
    setProductList(newProductList);
  };

  return (
    <TableContainer component={Paper}>
      <div className="adminHomePage_button_container">
        <PrimaryButton onClick={handleDelete} loading={false} text={"削除"} />
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox onChange={() => handleAllTogle()} />
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
                  checked={checkedProductIds.indexOf(product.id) !== -1}
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
