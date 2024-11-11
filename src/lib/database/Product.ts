import apiClient from "./apiClient";
import {
  CatgoryType,
  ProductInfoType,
  RatingInfoType,
  validProductImgTypes,
} from "../type/ProductType";
import { PaginationInfoType } from "../type/GenericType";
import { format } from "date-fns";
import axios from "axios";

interface ProductUpdateParams {
  productId: number | null;
  imgFile: File | null;
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
  {
    page = 1,
    sizeId,
    targetId,
    clothesTypeId,
    brandId,
    keyword,
    isDeleted,
    releaseDate,
  }: {
    page?: number;
    sizeId?: number[];
    targetId?: number[];
    clothesTypeId?: number[];
    brandId?: number[];
    keyword?: string;
    isDeleted?: string;
    releaseDate?: string;
  } = {},
  access?: string,
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
    let headers = {};
    if (access) {
      headers = {
        Authorization: `Bearer ${access}`,
      };
    }

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

export async function deleteProducts(productIds: number[], access?: string) {
  try {
    let headers = {};
    if (access) {
      headers = {
        Authorization: `Bearer ${access}`,
      };
    } else {
      throw new Error("no access token");
    }
    const payload = { product_ids: productIds };
    await apiClient.delete(`/products/`, { headers, data: payload });
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
    console.log(response.data);
    return response.data as ProductInfoType;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function createProduct(
  productUpdateParams: ProductUpdateParams,
  access?: string,
) {
  try {
    let headers = {};
    if (access) {
      headers = {
        Authorization: `Bearer ${access}`,
      };
    } else {
      throw new Error("no access token");
    }
    const data = {
      name: productUpdateParams.name,
      imgFile: productUpdateParams.imgFile,
      description: productUpdateParams.description,
      price: productUpdateParams.price,
      release_date: productUpdateParams.releaseDate,
      stock_quantity: productUpdateParams.stockQuantity,
      brand_pk: productUpdateParams.brandId,
      clothes_type_pk: productUpdateParams.clothTypeId,
      size_pk: productUpdateParams.sizeId,
      target_pk: productUpdateParams.targetId,
      category: "服",
    };
    checkProductUpdateParam(data);
    checkImgFileParam(productUpdateParams.imgFile);
    data.release_date = formatDateWithOffset(
      new Date(data.release_date as string),
    );
    const response = await apiClient.post(`/products/`, data, {
      headers,
    });
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

export async function updateProductDetail(
  productUpdateParams: ProductUpdateParams,
  access?: string,
) {
  try {
    if (!productUpdateParams.productId) {
      throw new Error("productId is required");
    }

    let headers = {};
    if (access) {
      headers = {
        Authorization: `Bearer ${access}`,
      };
    } else {
      throw new Error("no access token");
    }
    const data = {
      name: productUpdateParams.name,
      imgFile: productUpdateParams.imgFile,
      description: productUpdateParams.description,
      price: productUpdateParams.price,
      release_date: productUpdateParams.releaseDate,
      stock_quantity: productUpdateParams.stockQuantity,
      brand_pk: productUpdateParams.brandId,
      clothes_type_pk: productUpdateParams.clothTypeId,
      size_pk: productUpdateParams.sizeId,
      target_pk: productUpdateParams.targetId,
      is_deleted: productUpdateParams.isDeleted,
    };
    if (!productUpdateParams.isDeleted) {
      checkProductUpdateParam(data);
      checkImgFileParam(productUpdateParams.imgFile);
    }
    const response = await apiClient.put(
      `/products/${productUpdateParams.productId}/`,
      data,
      { headers },
    );
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
      params.product_Id = productId;
    }
    if (userId) {
      params.userId = userId;
    }
    const headers = {};
    const response = await apiClient.get("/reviews/", {
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
  checkStringParam("製品名", params.name, 1, 255);
  checkStringParam("説明", params.description, null, null);
  checkNumberParam("価格", params.price, 0, null);
  checkNumberParam("在庫数", params.stock_quantity, 0, null);
  checkNumberParam("ブランドID", params.brand_pk, 1, null);
  checkNumberParam("タイプID", params.clothes_type_pk, 1, null);
  checkNumberParam("サイズID", params.size_pk, 1, null);
  checkNumberParam("ターゲットID", params.target_pk, 1, null);
}

function checkStringParam(
  paramName: string,
  value: unknown,
  minLength: number | null,
  maxLength: number | null,
) {
  if (value === null || typeof value !== "string") {
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

function checkImgFileParam(img: File | null) {
  if (img) {
    if (!Object.keys(validProductImgTypes).includes(img.type)) {
      throw new Error("画像の形式は JPEG, PNG に限ります。");
    }

    if (img.size > 5000000) {
      // 5MBを超える場合はエラー
      throw new Error("画像サイズは5MB以下です。");
    }
  }
}

function checkNumberParam(
  paramName: string,
  value: unknown,
  minNumber: number | null,
  maxNumber: number | null,
) {
  if (value === null || typeof value !== "number") {
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

export async function registerFav(
  productId: number,
  fav: boolean,
  access: string | undefined | null,
) {
  try {
    const params: { [key: string]: unknown } = {};

    if (!access) {
      throw new Error("access token is required");
    }

    if (productId) {
      params.product_id = productId;
    } else {
      throw new Error("productId is required.");
    }

    params.fav = fav;

    const headers = {
      Authorization: `Bearer ${access}`,
    };
    const response = await apiClient.post("/favorites/", params, {
      headers,
    });
    if (response.status !== 200) {
      throw new Error("Something wrong with registering fav state");
    }
    return response.data as number;
  } catch (error) {
    console.error("Error registering data:", error);

    return null;
  }
}

export async function getFavListByUser(
  page: number,
  access: string | undefined | null,
) {
  try {
    const params: { [key: string]: unknown } = { page };

    if (!access) {
      throw new Error("access token is required");
    }

    const headers = {
      Authorization: `Bearer ${access}`,
    };
    const response = await apiClient.get("/favorites/", {
      headers,
      params,
    });
    if (response.status !== 200) {
      throw new Error("Something wrong with getting fav list");
    }
    return response.data as PaginationInfoType<{
      user: number;
      product: ProductInfoType;
    }>;
  } catch (error) {
    console.error("Error getting fav data:", error);

    return null;
  }
}
