import apiClient from "./apiClient";
import { CatgoryType } from "../type/ProductType";

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
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return response.data as CatgoryType;
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}
