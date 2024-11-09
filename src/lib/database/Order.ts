import { PaginationInfoType } from "../type/GenericType";
import { OrderInfoType, OrderStatus } from "../type/OrderType";
import apiClient from "./apiClient";
import axios from "axios";

export interface CheckoutData {
  product_id: number;
  amount: number;
}

export async function checkout(checkoutDataList: CheckoutData[]) {
  try {
    const response = await apiClient.post(`/checkout/`, checkoutDataList);
    return response.data.url;
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

export async function getOrderHistoryByUserId(userId: number) {
  try {
    const params = { user_id: userId };
    const headers = {};
    const response = await apiClient.get("/orders-with-items/", {
      headers,
      params,
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    console.log(response.data);
    return response.data as OrderInfoType[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function getOrders(
  {
    page = 1,
  }: {
    page?: number;
  } = {},
  access?: string,
) {
  try {
    const params: { [key: string]: unknown } = { page };

    let headers = {};
    if (access) {
      headers = {
        Authorization: `Bearer ${access}`,
      };
    }

    const response = await apiClient.get("/orders/", {
      headers,
      params,
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    console.log(response.data);
    return response.data as PaginationInfoType<OrderInfoType>;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
export async function changeOrderStatus(
  orderId: number,
  status: OrderStatus,
  access?: string,
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
    if (!orderId) {
      throw new Error("orderId is required");
    } else {
      data.order_Id = orderId;
    }
    if (status) {
      data.status = status;
    }

    const response = await apiClient.put(`/orders/${orderId}/`, data, {
      headers,
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);

    return [];
  }
}
