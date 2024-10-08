import apiClient from "./apiClient";
import { CatgoryType, ProductInfoType } from "../type/ProductType";

export async function getAllCategories() {
  try {
    // クエリパラメータを用意
    const params: { [key: string]: unknown } = {};

    // リクエストヘッダー
    const headers = {};
    // データを取得する
    const response = await apiClient.get("/categories", {
      headers,
      params,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return response.data as CatgoryType;
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}

export async function getProducts(
  count: number = 10,
  page: number = 1,
  sizeId?: number,
  targetId?: number,
  clothesTypeId?: number,
  brandId?: number,
  keyword?: string,
  isDeleted?: string,
  releaseDate?: string,
) {
  try {
    // クエリパラメータを用意
    const params: { [key: string]: unknown } = { count, page };

    // 指定されていればパラメータに設定
    if (sizeId) {
      params.size = sizeId;
    }
    if (targetId) {
      params.target = targetId;
    }
    if (clothesTypeId) {
      params.clothes_type = clothesTypeId;
    }
    if (brandId) {
      params.brand = brandId;
    }
    if (keyword) {
      params.keyword = keyword;
    }
    if (isDeleted) {
      params.is_deleted = isDeleted;
    }
    if (releaseDate) {
      params.release_date = releaseDate;
    }

    // リクエストヘッダー
    const headers = {};
    // データを取得する
    const response = await apiClient.get("/products", {
      headers,
      params,
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    console.log(response.data);
    return response.data as ProductInfoType[];
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}

// IDから製品の詳細情報を取得する
export async function getProductDetailById(productId: number) {
  try {
    // クエリパラメータを用意
    const params: { [key: string]: unknown } = {};

    //  各パラメータを設定
    if (!productId) {
      throw new Error("productId is required");
    } else {
      params.userId = productId;
    }

    // リクエストヘッダー
    const headers = {};
    // データを取得する
    const response = await apiClient.get("/products/" + productId.toString(), {
      headers,
      params,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return response.data as ProductInfoType;
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}
