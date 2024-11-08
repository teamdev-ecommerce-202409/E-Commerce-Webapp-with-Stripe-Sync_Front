import { CartInfoType } from "../type/ProductType";
import apiClient from "./apiClient";

// userIDからカート情報を取得する
export async function getCartItemsByUser(access: string) {
  try {
    const params: { [key: string]: unknown } = {};

    let headers = {};
    if (access) {
      headers = {
        Authorization: `Bearer ${access}`,
      };
    } else {
      throw new Error("access is required");
    }

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
  access: string,
  productId: number,
  quantity?: number,
) {
  try {
    const data: { [key: string]: unknown } = {};

    let headers = {};
    if (access) {
      headers = {
        Authorization: `Bearer ${access}`,
      };
    } else {
      throw new Error("access is required");
    }
    if (!productId) {
      throw new Error("productId is required");
    } else {
      data.product_id = productId;
    }
    if (quantity) {
      data.quantity = quantity;
    }

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

export async function deleteCartItem(access: string, productId: number) {
  try {
    const data: { [key: string]: unknown } = {};

    let headers = {};
    if (access) {
      headers = {
        Authorization: `Bearer ${access}`,
      };
    } else {
      throw new Error("access is required");
    }
    if (!productId) {
      throw new Error("productId is required");
    } else {
      data.product_id = productId;
    }

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
