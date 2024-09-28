import { useState } from "react";
import Layout from "../component/shared/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/DetailPage.css";
import "../style/AdminItemDetailPage.css";
import PrimaryButton from "../component/shared/PrimaryButton";
import { TextField, Box } from "@mui/material";

const AdminItemDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state;

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [releaseDate, setReleaseDate] = useState(item.release_date);
  const [stockQuantity, setStockQuantity] = useState(item.stock_quantity);
  const [brand, setBrand] = useState(item.brand);
  const [clothesType, setClothesType] = useState(item.clothes_type);
  const [size, setSize] = useState(item.size);
  const [target, setTarget] = useState(item.target);

  const handleUpdate = () => {
    // バックエンドにリクエスト送る
    navigate(`/admin/item`);
  };

  const handleDelete = () => {
    // バックエンドにリクエスト送る
    navigate(`/admin/item`);
  };

  return (
    <Layout>
      <div className="adminItemDetailPage_actions_container">
        <div className="adminItemDetailPage_button_container">
          <PrimaryButton
            onClick={handleUpdate}
            loading={false}
            text={"更新"}
          />
        </div>
        <div className="adminItemDetailPage_button_container">
          <PrimaryButton
            onClick={handleDelete}
            loading={false}
            text={"削除"}
          />
        </div>
      </div>
      <Box>
        <TextField
          fullWidth
          label="ID"
          value={item.id}
          InputProps={{ readOnly: true }}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="説明"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="価格"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="発売日"
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="在庫数"
          type="number"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="ブランド"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="服のタイプ"
          value={clothesType}
          onChange={(e) => setClothesType(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="サイズ"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="ターゲット"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          variant="outlined"
          margin="normal"
        />
      </Box>
    </Layout>
  );
};

export default AdminItemDetailPage;
