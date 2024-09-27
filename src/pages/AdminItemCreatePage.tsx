import Layout from "../component/shared/Layout";
import "../style/AdminItemCreatePage.css";
import { InputLabel, MenuItem, Select, TextField, Button, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

const AdminItemCreatePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    size: '',
    target: '',
    type: '',
    brand: '',
    inventoryCount: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/clothes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Layout>
      <form className="adminItemCreatePage_container" onSubmit={handleSubmit}>
        <div>
          <TextField
            id="name"
            name="name"
            label="製品名"
            variant="filled"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="description"
            name="description"
            label="説明"
            variant="filled"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <InputLabel id="size-label">サイズ</InputLabel>
        <Select
          className="selectWrapper"
          labelId="size-label"
          id="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          autoWidth
        >
          <MenuItem value={"S"}>S</MenuItem>
          <MenuItem value={"M"}>M</MenuItem>
          <MenuItem value={"L"}>L</MenuItem>
          <MenuItem value={"XL"}>XL</MenuItem>
        </Select>

        <InputLabel id="target-label">ターゲット</InputLabel>
        <Select
          className="selectWrapper"
          labelId="target-label"
          id="target"
          name="target"
          value={formData.target}
          onChange={handleChange}
          autoWidth
        >
          <MenuItem value={"men"}>MEN</MenuItem>
          <MenuItem value={"women"}>WOMEN</MenuItem>
          <MenuItem value={"kids"}>KIDS</MenuItem>
        </Select>

        <InputLabel id="type-label">タイプ</InputLabel>
        <Select
          className="selectWrapper"
          labelId="type-label"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          autoWidth
        >
          <MenuItem value={"tops"}>トップス</MenuItem>
          <MenuItem value={"bottoms"}>ボトムス</MenuItem>
          <MenuItem value={"outer"}>アウター</MenuItem>
          <MenuItem value={"under"}>下着</MenuItem>
          <MenuItem value={"goods"}>グッズ</MenuItem>
        </Select>

        <div>
          <TextField
            id="brand"
            name="brand"
            label="ブランド"
            variant="filled"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>

        <TextField
          id="inventory-count"
          name="inventoryCount"
          label="在庫数"
          variant="outlined"
          type="number"
          value={formData.inventoryCount}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: 0,
            step: 1,
          }}
        />

        <Button type="submit" variant="contained" color="primary">
          登録
        </Button>
      </form>
    </Layout>
  );
};

export default AdminItemCreatePage;
