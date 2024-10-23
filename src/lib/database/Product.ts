import apiClient from "./apiClient";
import {
  CatgoryType,
  ProductInfoType,
  RatingInfoType,
} from "../type/ProductType";
import { PaginationInfoType } from "../type/GenericType";
import { format } from 'date-fns';
import axios from "axios";

interface ProductUpdateParams {
  productId: number | null;
  name: string | null;
  description: string | null;
  price: number | null;
  releaseDate: string | null;
  stockQuantity: number | null;
  brandId: number | null;
  clothTypeId: number | null;
  sizeId: number | null;
  targetId: number | null;
  isDeleted: boolean;
}

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

export async function createProduct(productUpdateParams: ProductUpdateParams) {
  try {
    const data = {
      name: productUpdateParams.name,
      description: productUpdateParams.description,
      price: productUpdateParams.price,
      release_date: productUpdateParams.releaseDate,
      stock_quantity: productUpdateParams.stockQuantity,
      brand_pk: productUpdateParams.brandId,
      clothes_type_pk: productUpdateParams.clothTypeId,
      size_pk: productUpdateParams.sizeId,
      target_pk: productUpdateParams.targetId,
      category: '服'
    };
    checkProductUpdateParam(data);
    data.release_date = formatDateWithOffset(new Date(data.release_date as string));
    const response = await apiClient.post(`/products/`, data);
    return response.data as ProductInfoType;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
      } else if (error.request) {
        console.error("Error Request:", error.request);
      } else {
        console.error("Error Message:", error.message);
      }
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
}

export async function updateProductDetail(productUpdateParams: ProductUpdateParams) {
  try {
    if (!productUpdateParams.productId) {
      throw new Error("productId is required");
    }
    const data = {
      name: productUpdateParams.name,
      description: productUpdateParams.description,
      price: productUpdateParams.price,
      release_date: productUpdateParams.releaseDate,
      stock_quantity: productUpdateParams.stockQuantity,
      brand_pk: productUpdateParams.brandId,
      clothes_type_pk: productUpdateParams.clothTypeId,
      size_pk: productUpdateParams.sizeId,
      target_pk: productUpdateParams.targetId,
      is_deleted: productUpdateParams.isDeleted
    };
    if (!productUpdateParams.isDeleted) {
      checkProductUpdateParam(data);
    }
    const response = await apiClient.put(`/products/${productUpdateParams.productId}/`, data);
    return response.data as ProductInfoType;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
      } else if (error.request) {
        console.error("Error Request:", error.request);
      } else {
        console.error("Error Message:", error.message);
      }
    } else {
      console.error("Unexpected Error:", error);
    }
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
  if (params.release_date !== null) {
    const date = new Date(params.release_date as string);
    if (isNaN(date.getTime())) {
      throw new Error(`正しい日付を指定してください。`);
    }
  }
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

function formatDateWithOffset(date: Date): string {
  return format(date, "yyyy-MM-dd'T'HH:mm:ssXXX");
}