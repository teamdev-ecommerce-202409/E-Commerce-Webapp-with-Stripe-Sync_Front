import { useEffect, useState } from "react";
import Layout from "../component/shared/Layout";
import { useNavigate, useParams } from "react-router-dom";
import "../style/DetailPage.css";
import "../style/AdminProductDetailPage.css";
import PrimaryButton from "../component/shared/PrimaryButton";
import { TextField, Box, MenuItem } from "@mui/material";
import { getAllCategories, getProductDetailById, updateProductDetail } from "../lib/database/Product";
import { CatgoryType } from "../lib/type/ProductType";

const AdminProductDetailPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [releaseDate, setReleaseDate] = useState<string>('');
  const [stockQuantity, setStockQuantity] = useState<number>(0);
  const [brandId, setBrandId] = useState<number>(0);
  const [clothesTypeId, setClothesTypeId] = useState<number>(0);
  const [sizeId, setSizeId] = useState<number>(0);
  const [targetId, setTargetId] = useState<number>(0);
  const [categories, setCategories] =
    useState<CatgoryType | null>({
      sizeCatgory: [],
      targetCatgory: [],
      typeCatgory: [],
      brandCatgory: [],
    });

  const setProductDetailInfo = async () => {
    if (productId == undefined) {
      return;
    }
    const productDetail = await getProductDetailById(Number(productId));
    console.log({ productDetail });
    if (productDetail === null) {
      return;
    }
    setName(productDetail.name);
    setDescription(productDetail.description);
    setPrice(productDetail.price);
    setReleaseDate(productDetail.release_date.substring(0, 10));
    setStockQuantity(productDetail.stock_quantity);
    setBrandId(productDetail.brand.id);
    setClothesTypeId(productDetail.clothes_type.id);
    setSizeId(productDetail.size.id);
    setTargetId(productDetail.target.id);
  }

  const fetchCategories = async () => {
    const allCategories = await getAllCategories();
    setCategories(allCategories);
  };

  const updateProduct = async () => {
    try {
      await updateProductDetail(
        {
          productId: Number(productId),
          name: name,
          description: description,
          price: price,
          releaseDate: releaseDate,
          stockQuantity: stockQuantity,
          brandId: brandId,
          clothTypeId: clothesTypeId,
          sizeId: sizeId,
          targetId: targetId,
          isDeleted: false
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(String(error));
      }
    }
  };

  const deleteProduct = async () => {
    try {
      await updateProductDetail(
        {
          productId: Number(productId),
          name: name,
          description: description,
          price: price,
          releaseDate: releaseDate,
          stockQuantity: stockQuantity,
          brandId: brandId,
          clothTypeId: clothesTypeId,
          sizeId: sizeId,
          targetId: targetId,
          isDeleted: true
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(String(error));
      }
    }
  };

  useEffect(() => {
    setProductDetailInfo();
    fetchCategories();
  }, []);

  const handleUpdate = async () => {
    await updateProduct();
    navigate(`/admin/product`);
  };

  const handleDelete = async () => {
    await deleteProduct();
    navigate(`/admin/product`);
  };

  return (
    <Layout>
      <div className="adminProductDetailPage_actions_container">
        <div className="adminProductDetailPage_button_container">
          <PrimaryButton onClick={handleUpdate} loading={false} text={"更新"} />
        </div>
        <div className="adminProductDetailPage_button_container">
          <PrimaryButton onClick={handleDelete} loading={false} text={"削除"} />
        </div>
      </div>
      <Box>
        製品名
        <TextField
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="filled"
          margin="normal"
          inputProps={{ minLength: 1, maxLength: 255 }}
        />
        説明
        <TextField
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="filled"
          margin="normal"
          multiline
          rows={4}
        />
        価格
        <TextField
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          variant="filled"
          margin="normal"
          InputProps={{ inputProps: { min: 0 } }}
        />
        発売日
        <TextField
          fullWidth
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          variant="filled"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        在庫数
        <TextField
          fullWidth
          type="number"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(Number(e.target.value))}
          variant="filled"
          margin="normal"
          InputProps={{ inputProps: { min: 0 } }}
        />
        ブランド
        <TextField
          fullWidth
          value={brandId}
          onChange={(e) => setBrandId(Number(e.target.value))}
          variant="filled"
          margin="normal"
          select
        >
          {categories?.brandCatgory.map((brand) => (
            <MenuItem key={brand.id} value={brand.id}>
              {brand.name}
            </MenuItem>
          ))}
        </TextField>
        服のタイプ
        <TextField
          fullWidth
          value={clothesTypeId}
          onChange={(e) => setClothesTypeId(Number(e.target.value))}
          variant="filled"
          margin="normal"
          select
        >
          {categories?.typeCatgory.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </TextField>
        サイズ
        <TextField
          fullWidth
          value={sizeId}
          onChange={(e) => setSizeId(Number(e.target.value))}
          variant="filled"
          margin="normal"
          select
        >
          {categories?.sizeCatgory.map((size) => (
            <MenuItem key={size.id} value={size.id}>
              {size.name}
            </MenuItem>
          ))}
        </TextField>
        ターゲット
        <TextField
          fullWidth
          value={targetId}
          onChange={(e) => setTargetId(Number(e.target.value))}
          variant="filled"
          margin="normal"
          select
        >
          {categories?.targetCatgory.map((target) => (
            <MenuItem key={target.id} value={target.id}>
              {target.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Layout>
  );
};

export default AdminProductDetailPage;
