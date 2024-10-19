import apiClient from "./apiClient";
import {
  CatgoryType,
  ProductInfoType,
  RatingInfoType,
} from "../type/ProductType";
import { PaginationInfoType } from "../type/GenericType";

export async function getAllCategories() {
  try {
    const params: { [key: string]: unknown } = {};
    const headers = {};
    const response = await apiClient.get("/categories", {
      headers,
      params,
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return response.data as CatgoryType;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function getProducts(
  page: number = 1,
  sizeId?: number[],
  targetId?: number[],
  clothesTypeId?: number[],
  brandId?: number[],
  keyword?: string,
  isDeleted?: string,
  releaseDate?: string,
) {
  try {
    const params: { [key: string]: unknown } = { page };
    if (sizeId && sizeId.length > 0) {
      params.size = sizeId;
    }
    if (targetId && targetId.length > 0) {
      params.target = targetId;
    }
    if (clothesTypeId && clothesTypeId.length > 0) {
      params.clothes_type = clothesTypeId;
    }
    if (brandId && brandId.length > 0) {
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
    const headers = {};
    const response = await apiClient.get("/products/", {
      headers,
      params,
      paramsSerializer: { indexes: false },
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    console.log(response.data);
    return response.data as PaginationInfoType<ProductInfoType>;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function getProductDetailById(productId: number) {
  try {
    const params: { [key: string]: unknown } = {};
    if (!productId) {
      throw new Error("productId is required");
    } else {
      params.productId = productId;
    }
    const headers = {};
    const response = await apiClient.get("/products/" + productId.toString(), {
      headers,
      params,
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return response.data as ProductInfoType;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function updateProductDetail(
  productId: number,
  name: string,
  description: string,
  price: number,
  releaseDate: string,
  stockQuantity: number,
  brandId: number,
  clothTypeId: number,
  sizeId: number,
  targetId: number
) {
  try {
    if (!productId) {
      throw new Error("productId is required");
    }
    const data = {
      name: name,
      description: description,
      price: price,
      release_date: releaseDate,
      stock_quantity: stockQuantity,
      brand_pk: brandId,
      clothes_type_pk: clothTypeId,
      size_pk: sizeId,
      target_pk: targetId
    };
    checkProductUpdateParam(data);
    const response = await apiClient.put(`/products/${productId}/`, data);
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return response.data as ProductInfoType;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getProductRatings(productId?: number, userId?: number) {
  try {
    const params: { [key: string]: unknown } = {};
    if (productId) {
      params.productId = productId;
    }
    if (userId) {
      params.userId = userId;
    }
    const headers = {};
    const response = await apiClient.get("/ratings/", {
      headers,
      params,
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    console.log("ratings", response.data);
    return response.data as RatingInfoType;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function checkProductUpdateParam(params: { [key: string]: unknown }) {
  checkStringParam('製品名', params.name, 1, 255);
  checkStringParam('説明', params.description, null, null);
  checkNumberParam('価格', params.price, 0, null);
  checkNumberParam('在庫数', params.stock_quantity, 0, null);
  checkNumberParam('ブランドID', params.brand_pk, 1, null);
  checkNumberParam('タイプID', params.clothes_type_pk, 1, null);
  checkNumberParam('サイズID', params.size_pk, 1, null);
  checkNumberParam('ターゲットID', params.target_pk, 1, null);
}

function checkStringParam(
  paramName: string, value: any, minLength: number | null, maxLength: number | null
) {
  if (value === null || typeof value !== 'string') {
    throw new Error(`${paramName}を文字列で指定してください。`);
  }
  const valueString = value as string;
  if (minLength !== null && valueString.length < minLength) {
    throw new Error(`${paramName}の最小文字数(${minLength})を下回っています。`);
  }
  if (maxLength !== null && valueString.length > maxLength) {
    throw new Error(`${paramName}の最大文字数(${maxLength})を超えています。`);
  }
}

function checkNumberParam(
  paramName: string, value: any, minNumber: number | null, maxNumber: number | null
) {
  if (value === null || typeof value !== 'number') {
    throw new Error(`${paramName}を数値で指定してください。`);
  }
  const valueNumber = value as number;
  if (minNumber !== null && valueNumber < minNumber) {
    throw new Error(`${paramName}の最小値(${minNumber})を下回っています。`);
  }
  if (maxNumber !== null && valueNumber > maxNumber) {
    throw new Error(`${paramName}の最大値(${maxNumber})を超えています。`);
  }
}