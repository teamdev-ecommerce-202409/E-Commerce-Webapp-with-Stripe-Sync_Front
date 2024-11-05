import { OrderInfoType } from "../type/OrderType";
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