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
    const params: { [key: string]: unknown } = {};
    if (!productId) {
      throw new Error("productId is required");
    }
    const response = await apiClient.put(`/products/${productId}/`, {
      name: name,
      description: description,
      price: price,
      release_date: releaseDate,
      stock_quantity: stockQuantity,
      brand_pk: brandId,
      clothes_type_pk: clothTypeId,
      size_pk: sizeId,
      target_pk: targetId
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return response.data as ProductInfoType;
  } catch (error) {
    console.error("Error fetching data:", error);
    alert('製品情報の更新に失敗しました。');
    return null;
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
