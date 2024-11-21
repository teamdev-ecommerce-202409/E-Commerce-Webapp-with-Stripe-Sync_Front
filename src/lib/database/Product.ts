import apiClient from "./apiClient";
import {
  CatgoryType,
  CommentInfoType,
  ProductInfoType,
  validProductImgTypes,
} from "../type/ProductType";
import { PaginationInfoType } from "../type/GenericType";
import axios from "axios";
import { formatDateWithOffset } from "../util";

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

export async function getProductDetailById(productId: number, access?: string) {
  try {
    const params: { [key: string]: unknown } = {};

    let headers = {};
    if (access) {
      headers = {
        Authorization: `Bearer ${access}`,
      };
    }
    if (!productId) {
      throw new Error("productId is required");
    } else {
      params.productId = productId;
    }
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

export async function createProduct(
  productUpdateParams: ProductUpdateParams,
  access?: string,
) {
  try {
    if (!access) {
      throw new Error("no access token");
    }

    const headers = {
      Authorization: `Bearer ${access}`,
      "Content-Type": "multipart/form-data",
    };

    // FormDataを使ってデータと画像ファイルを追加
    const formData = new FormData();
    formData.append("name", productUpdateParams.name!);
    formData.append("description", productUpdateParams.description!);
    formData.append("price", productUpdateParams.price!.toString());
    formData.append(
      "release_date",
      formatDateWithOffset(new Date(productUpdateParams.releaseDate!)),
    );
    formData.append(
      "stock_quantity",
      productUpdateParams.stockQuantity!.toString(),
    );
    formData.append("brand_pk", productUpdateParams.brandId!.toString());
    formData.append(
      "clothes_type_pk",
      productUpdateParams.clothTypeId!.toString(),
    );
    formData.append("size_pk", productUpdateParams.sizeId!.toString());
    formData.append("target_pk", productUpdateParams.targetId!.toString());
    formData.append("category", "服");

    // 画像ファイルを追加
    if (productUpdateParams.imgFile) {
      formData.append("imgFile", productUpdateParams.imgFile);
    }

    checkProductUpdateParam(formData);
    checkImgFileParam(productUpdateParams.imgFile);

    // APIリクエストを送信
    const response = await apiClient.post(`/products/`, formData, {
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
        "content-type": "multipart/form-data",
      };
    } else {
      throw new Error("no access token");
    }

    const data = new FormData();
    data.append("name", productUpdateParams.name!);
    data.append("description", productUpdateParams.description!);
    data.append("price", String(productUpdateParams.price));
    data.append("release_date", productUpdateParams.releaseDate!);
    data.append("stock_quantity", String(productUpdateParams.stockQuantity));
    data.append("brand_pk", String(productUpdateParams.brandId));
    data.append("clothes_type_pk", String(productUpdateParams.clothTypeId));
    data.append("size_pk", String(productUpdateParams.sizeId));
    data.append("target_pk", String(productUpdateParams.targetId));
    data.append("is_deleted", String(productUpdateParams.isDeleted));

    // 画像ファイルを追加
    if (productUpdateParams.imgFile) {
      data.append("imgFile", productUpdateParams.imgFile);
    }

    checkProductUpdateParam(data);
    checkImgFileParam(productUpdateParams.imgFile);

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

export async function getProductRatings(productId?: number, access?: string) {
  try {
    const params: { [key: string]: unknown } = {};
    if (productId) {
      params.product_Id = productId;
    }

    let headers = {};
    if (access) {
      headers = {
        Authorization: `Bearer ${access}`,
      };
    }
    const response = await apiClient.get("/reviews/", {
      headers,
      params,
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    console.log("ratings", response.data);
    return response.data as PaginationInfoType<CommentInfoType>;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function getProductReviewOfLoginUser(
  productId: number,
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

    const headers = {
      Authorization: `Bearer ${access}`,
    };
    const response = await apiClient.get(`/product-reviews/${productId}/`, {
      headers,
      params,
    });
    if (response.status !== 200) {
      throw new Error("Something wrong with registering fav state");
    }
    console.log("getProductReviewOfLoginUser", response.data);
    return response.data as CommentInfoType;
  } catch (error) {
    console.error("Error registering data:", error);

    return null;
  }
}

export async function registerProductRating(
  productId: number,
  ratingNum: number,
  comment: string | undefined | null,
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

    params.rating = ratingNum;
    params.comment = comment;

    const headers = {
      Authorization: `Bearer ${access}`,
    };
    const response = await apiClient.post(
      `/product-reviews/${productId}/`,
      params,
      {
        headers,
      },
    );
    if (response.status !== 200) {
      throw new Error("Something wrong with registering fav state");
    }
    console.log("registerProductRating", response.data);
    return response.data;
  } catch (error) {
    console.error("Error registering data:", error);

    return null;
  }
}
function checkProductUpdateParam(params: FormData) {
  const releaseDate = params.get("release_date") as string | null;
  if (releaseDate !== null) {
    const date = new Date(releaseDate);
    if (isNaN(date.getTime())) {
      throw new Error(`正しい日付を指定してください。`);
    }
  }

  checkStringParam("製品名", params.get("name"), 1, 255);
  checkStringParam("説明", params.get("description"), null, null);
  checkNumberParam("価格", params.get("price"), 0, null);
  checkNumberParam("在庫数", params.get("stock_quantity"), 0, null);
  checkNumberParam("ブランドID", params.get("brand_pk"), 1, null);
  checkNumberParam("タイプID", params.get("clothes_type_pk"), 1, null);
  checkNumberParam("サイズID", params.get("size_pk"), 1, null);
  checkNumberParam("ターゲットID", params.get("target_pk"), 1, null);
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

function checkNumberParam(
  paramName: string,
  value: unknown,
  minValue: number | null,
  maxValue: number | null,
) {
  const parsedValue = typeof value === "string" ? parseFloat(value) : value;
  if (
    parsedValue === null ||
    typeof parsedValue !== "number" ||
    isNaN(parsedValue)
  ) {
    throw new Error(`${paramName}を数値で指定してください。`);
  }
  if (minValue !== null && parsedValue < minValue) {
    throw new Error(
      `${paramName}は最小値(${minValue})以上である必要があります。`,
    );
  }
  if (maxValue !== null && parsedValue > maxValue) {
    throw new Error(
      `${paramName}は最大値(${maxValue})以下である必要があります。`,
    );
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

export async function registerWish(
  productId: number,
  wish: boolean,
  access: string | undefined | null,
) {
  try {
    console.log("registerWish");
    const params: { [key: string]: unknown } = {};

    if (!access) {
      throw new Error("access token is required");
    }

    if (productId) {
      params.product_id = productId;
    } else {
      throw new Error("productId is required.");
    }

    params.wish = wish;

    const headers = {
      Authorization: `Bearer ${access}`,
    };
    const response = await apiClient.post("/wishlists/", params, {
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

export async function getWishListByUser(
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
    const response = await apiClient.get("/wishlists/", {
      headers,
      params,
    });
    if (response.status !== 200) {
      throw new Error("Something wrong with getting wish list");
    }
    return response.data as PaginationInfoType<{
      user: number;
      product: ProductInfoType;
    }>;
  } catch (error) {
    console.error("Error getting wish data:", error);

    return null;
  }
}

export async function getPublicWishListById(
  page: number,
  id: string | undefined | null,
) {
  try {
    const params: { [key: string]: unknown } = { page };

    if (!id) {
      throw new Error("wish id is required");
    }

    const headers = {};
    const response = await apiClient.get("/wishlists/", {
      headers,
      params,
    });
    if (response.status !== 200) {
      throw new Error("Something wrong with getting wish list");
    }
    return response.data as PaginationInfoType<{
      user: number;
      product: ProductInfoType;
    }>;
  } catch (error) {
    console.error("Error getting wish data:", error);

    return null;
  }
}
