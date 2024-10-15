import { useEffect, useState } from "react";
import Layout from "../component/shared/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/DetailPage.css";
import "../style/AdminProductDetailPage.css";
import PrimaryButton from "../component/shared/PrimaryButton";
import { TextField, Box } from "@mui/material";
import { getProductDetailById } from "../lib/database/Product";

const AdminProductDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productId = Number(location.state);
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [releaseDate, setReleaseDate] = useState<string>();
  const [stockQuantity, setStockQuantity] = useState<number>();
  const [brand, setBrand] = useState<string>();
  const [clothesType, setClothesType] = useState<string>();
  const [size, setSize] = useState<string>();
  const [target, setTarget] = useState<string>();

  const setProductDetailInfo = async () => {
    const productDetail = await getProductDetailById(productId);
    console.log({ productDetail });
    setName(productDetail?.name);
    setDescription(productDetail?.description);
    setPrice(productDetail?.price);
    setReleaseDate(productDetail?.release_date.substring(0, 10));
    setStockQuantity(productDetail?.stock_quantity);
    setBrand(productDetail?.brand.name);
    setClothesType(productDetail?.clothes_type.name);
    setSize(productDetail?.size.name);
    setTarget(productDetail?.target.name);
  }

  useEffect(() => {
    if (isNaN(productId)) {
      return;
    }
    setProductDetailInfo();
  }, []);

  const handleUpdate = () => {
    
    navigate(`/admin/product`);
  };

  const handleDelete = () => {
    // バックエンドにリクエスト送る
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
        ID
        <TextField
          fullWidth
          value={productId}
          InputProps={{ readOnly: true }}
          variant="filled"
          margin="normal"
        />
        製品名
        <TextField
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="filled"
          margin="normal"
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
        />
        ブランド
        <TextField
          fullWidth
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          variant="filled"
          margin="normal"
        />
        服のタイプ
        <TextField
          fullWidth
          value={clothesType}
          onChange={(e) => setClothesType(e.target.value)}
          variant="filled"
          margin="normal"
        />
        サイズ
        <TextField
          fullWidth
          value={size}
          onChange={(e) => setSize(e.target.value)}
          variant="filled"
          margin="normal"
        />
        ターゲット
        <TextField
          fullWidth
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          variant="filled"
          margin="normal"
        />
      </Box>
    </Layout>
  );
};

export default AdminProductDetailPage;
