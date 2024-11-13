import { useEffect, useState } from "react";
import Layout from "../component/shared/Layout";
import { useNavigate, useParams } from "react-router-dom";
import "../style/AdminProductDetailPage.css";
import PrimaryButton from "../component/shared/PrimaryButton";
import { TextField, Box, MenuItem, IconButton, Button } from "@mui/material";
import {
  getAllCategories,
  getProductDetailById,
  updateProductDetail,
} from "../lib/database/Product";
import { CatgoryType, validProductImgTypes } from "../lib/type/ProductType";
import useLogin from "../hook/useLogin";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { useAtom } from "jotai";
import CloseIcon from "@mui/icons-material/Close";
import { PhotoCamera } from "@mui/icons-material";

const AdminProductDetailPage = () => {
  const [userInfoJotai] = useAtom(userInfoAtom);
  const { checkLogin } = useLogin();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [stockQuantity, setStockQuantity] = useState<number>(0);
  const [brandId, setBrandId] = useState<number>(0);
  const [clothesTypeId, setClothesTypeId] = useState<number>(0);
  const [sizeId, setSizeId] = useState<number>(0);
  const [targetId, setTargetId] = useState<number>(0);
  const [categories, setCategories] = useState<CatgoryType | null>({
    sizeCatgory: [],
    targetCatgory: [],
    typeCatgory: [],
    brandCatgory: [],
  });
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const setProductDetailInfo = async () => {
    if (productId == undefined) {
      return;
    }
    const productDetail = await getProductDetailById(Number(productId));

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
    setImagePreviewUrl(productDetail.img_url);
  };

  const fetchCategories = async () => {
    const allCategories = await getAllCategories();
    setCategories(allCategories);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImgFile(file);

      if (!Object.keys(validProductImgTypes).includes(file.type)) {
        alert("File must be a JPEG, PNG image.");
        return; // ファイルが許可された形式でない場合は処理を中止
      }

      const reader = new FileReader();

      reader.onload = () => {
        const previewUrl = reader.result as string;
        setImagePreviewUrl(previewUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreviewUrl(""); // 画像URLをクリアしてプレビューを削除
    setImgFile(null);
  };

  const updateProduct = async () => {
    try {
      await updateProductDetail(
        {
          productId: Number(productId),
          imgFile: imgFile,
          name: name,
          description: description,
          price: price,
          releaseDate: releaseDate,
          stockQuantity: stockQuantity,
          brandId: brandId,
          clothTypeId: clothesTypeId,
          sizeId: sizeId,
          targetId: targetId,
          isDeleted: false,
        },
        userInfoJotai.access,
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
          imgFile,
          name: name,
          description: description,
          price: price,
          releaseDate: releaseDate,
          stockQuantity: stockQuantity,
          brandId: brandId,
          clothTypeId: clothesTypeId,
          sizeId: sizeId,
          targetId: targetId,
          isDeleted: true,
        },
        userInfoJotai.access,
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
    const authCheckAdmin = async () => {
      const authResult = await checkLogin(true);
      if (!authResult) {
        navigate("/");
      }
    };
    authCheckAdmin();

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
        <Button
          component="label" // Buttonをlabelタグとして機能させる
          className="postBox_photo__button"
        >
          <PhotoCamera />
          <input
            // {...register("postImage")}
            type="file"
            hidden // ファイル入力を隠す
            accept="image/*,video/*" // 画像と動画ファイルのみ受け入れる
            onChange={handleFileChange} // ファイル選択時の処理
          />
          商品画像
        </Button>
        <div className="adminProductDeatilPage_photo__preview__container">
          {imagePreviewUrl && (
            <>
              <span className="photo__preview__close">
                <IconButton onClick={handleRemoveImage} aria-label="delete">
                  <CloseIcon />
                </IconButton>
              </span>
              <span>
                <IconButton />
              </span>

              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="adminProductCreatePage_product_img__preview"
                />
              )}
            </>
          )}
        </div>
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
