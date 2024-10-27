import { OrderInfoType } from "../type/OrderType";
import apiClient from "./apiClient";

// UserIDからorder historyを取得する
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