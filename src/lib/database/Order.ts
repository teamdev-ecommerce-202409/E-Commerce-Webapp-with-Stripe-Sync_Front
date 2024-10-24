import { OrderInfoType } from "../type/OrderType";
import apiClient from "./apiClient";

// UserIDからorder historyを取得する
export async function getOrderHistoryByUserId(userId: number) {
    try {
      // クエリパラメータを設定
      const params = { user_id: userId };
      const headers = {};
  
      // データを取得する
      const response = await apiClient.get("/orders-with-items/", {
        headers,
        params,
      });

      if (response.status !== 200) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }
      console.log(response.data);
      return response.data as OrderInfoType[];
    } catch (error) {
      console.error("Error fetching data:", error);
  
      return null;
    }
  }