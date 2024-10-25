import apiClient from "./apiClient";
import {
  CatgoryType,
  ProductInfoType,
  RatingInfoType,
} from "../type/ProductType";
import { PaginationInfoType } from "../type/GenericType";

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
    // クエリパラメータを用意
    const params: { [key: string]: unknown } = { page };

    // 指定されていればパラメータに設定
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

    // リクエストヘッダー
    const headers = {};
    // データを取得する
    const response = await apiClient.get("/products", {
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

// IDから製品の詳細情報を取得する
export async function getProductDetailById(productId: number) {
  try {
    // クエリパラメータを用意
    const params: { [key: string]: unknown } = {};

    //  各パラメータを設定
    if (!productId) {
      throw new Error("productId is required");
    } else {
      params.productId = productId;
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
    console.log(response.data);
    return response.data as ProductInfoType;
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}

export async function getProductRatings(productId?: number, userId?: number) {
  try {
    // クエリパラメータを用意
    const params: { [key: string]: unknown } = {};

    //  各パラメータを設定
    if (productId) {
      params.productId = productId;
    }

    if (userId) {
      params.userId = userId;
    }

    // リクエストヘッダー
    const headers = {};
    // データを取得する
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

export async function registerLike(
  productId: number,
  userId: number,
  fav: boolean,
  token: string | undefined | null,
) {
  try {
    const params: { [key: string]: unknown } = {
      productId,
      userId,
      fav,
    };

    // TODO 認証機能作成後、解放
    // if (!token) {
    //   throw new Error("token is required");
    // }

    if (productId) {
      params.product_id = productId;
    } else {
      throw new Error("productId is required.");
    }

    if (userId) {
      params.user_id = userId;
    } else {
      throw new Error("userId is required.");
    }

    params.fav = fav;

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await apiClient.post("/favorites/", params, {
      headers,
    });
    if (response.status !== 200) {
      throw new Error("Something wrong with registering like state");
    }
    return response.data as boolean;
  } catch (error) {
    console.error("Error registering data:", error);

    return null;
  }
}
