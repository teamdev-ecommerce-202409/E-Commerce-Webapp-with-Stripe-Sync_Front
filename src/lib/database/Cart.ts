import { CartInfoType } from "../type/ProductType";
import apiClient from "./apiClient";

// userIDからカート情報を取得する
export async function getCartItemsByUserId(userId: number) {
  try {
    const params: { [key: string]: unknown } = {};

    if (!userId) {
      throw new Error("userId is required");
    } else {
      params.user = userId;
    }

    const headers = {};
    const response = await apiClient.get("/cartitems/", {
      headers,
      params,
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    console.log(response.data);
    return response.data as CartInfoType[];
  } catch (error) {
    console.error("Error fetching data:", error);

    return [];
  }
}

export async function changeCartItemQuantity(
  userId: number,
  productId: number,
  quantity?: number,
) {
  try {
    const data: { [key: string]: unknown } = {};

    if (!userId) {
      throw new Error("userId is required");
    } else {
      data.user_id = userId;
    }
    if (!productId) {
      throw new Error("productId is required");
    } else {
      data.product_id = productId;
    }
    if (quantity) {
      data.quantity = quantity;
    }
    const headers = {};

    const response = await apiClient.post("/cartitems/", data, {
      headers,
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return response.data as CartInfoType[];
  } catch (error) {
    console.error("Error fetching data:", error);

    return [];
  }
}

export async function deleteCartItem(userId: number, productId: number) {
  try {
    const data: { [key: string]: unknown } = {};

    if (!userId) {
      throw new Error("userId is required");
    } else {
      data.user_id = userId;
    }
    if (!productId) {
      throw new Error("productId is required");
    } else {
      data.product_id = productId;
    }

    const headers = {};

    const response = await apiClient.delete("/cartitems/", {
      data,
      headers,
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return response.data["result"] as boolean;
  } catch (error) {
    console.error("Error deleting data:", error);

    return false;
  }
}
