import axios from "axios";
import { getDefaultStore } from "jotai";
import { userInfoAtom } from "../jotai/atoms/user";

const store = getDefaultStore();

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("インターセプタ―呼び出し");

    const originalRequest = error.config;

    // トークンの期限切れを示すエラーレスポンスかどうかを確認
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // リフレッシュトークンを使って新しいアクセストークンを取得
        const { refresh } = store.get(userInfoAtom);
        const baseURL = import.meta.env.VITE_API_URL;
        const response = await axios.post(baseURL + "/token/refresh/", {
          refresh: refresh,
        });

        const newAccess = response.data.access;
        console.log("newAccess", newAccess);

        store.set(userInfoAtom, {
          ...store.get(userInfoAtom),
          access: newAccess,
        });

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(originalRequest);
      } catch (error) {
        console.error(error);
        alert("リフレッシュトークンが無効です。再度ログインが必要です。");
        store.set(userInfoAtom, null);
        window.location.reload();
      }
    }

    return Promise.reject(error);
  },
);
export default apiClient;
