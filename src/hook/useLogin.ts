import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  loginAPI,
  refreshTokenAPI,
  signUpAPI,
  updateUserInfoAPI,
  verifyEmailAPI,
} from "../lib/database/User";
import { jotaiInitialValue, userInfoAtom } from "../lib/jotai/atoms/user";
import { UserInfoType } from "../lib/type/UserInfoType";

const useLogin = () => {
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const signUp = async (
    name: string,
    email: string,
    password: string,
    confirmPass: string,
  ) => {
    try {
      setLoading(true);
      //引数のバリデーション
      if (!email) {
        throw new Error("email is necessary to log in.");
      }
      if (!name) {
        throw new Error("name is necessary to log in.");
      }
      if (!password) {
        throw new Error("password is necessary to log in.");
      }
      if (!confirmPass) {
        throw new Error("confirmPass is necessary to log in.");
      }
      if (email.length > 255) {
        throw new Error("email should be less than 255");
      }
      if (name.length > 25) {
        throw new Error("name should be less than 25");
      }
      if (password.length < 8 || password.length > 30) {
        throw new Error("password should be less than 30 and more than 8");
      }

      if (password !== confirmPass) {
        throw new Error("password and confirmPass should be the same");
      }
      //サーバー側で登録処理

      const signUpResult = await signUpAPI(name, email, password);
      if (signUpResult) {
        //メール送信した旨、画面に表示
        alert(
          "Verification Mail was sent to your email. Please click the link in the mail.",
        );
      } else {
        alert("Sorry! Registering your email was failed!");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error("Unknown error", e);
      }
    } finally {
      setLoading(false);
    }
  };

  const verifiyEmail = async (token: string) => {
    try {
      if (!token) {
        throw new Error("token is necessary to verify.");
      }

      const data = await verifyEmailAPI(token);
      if (data?.error) {
        throw new Error(data.error);
      }

      if (!data || !data.token || !data.user) {
        throw new Error("Something wrong with login API");
      }

      //認証成功時はユーザー情報をjotaiに入れる
      setuserInfoJotai({ userInfo: data.user, authtoken: data.token });

      alert("Verification Success!");

      //home画面に移動
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setErrorMsg("");
    try {
      if (!email || !password) {
        throw new Error("email and password are necessary to log in.");
      }
      const data = await loginAPI(email, password);
      if (data?.detail) {
        console.error(data.detail);
        throw new Error("emailとpasswordが不正です。");
      }

      if (!data || !data.access || !data.refresh || !data.user) {
        throw new Error("Something wrong with login API");
      }
      const loginUser: UserInfoType = data.user;
      //ログイン成功時はユーザー情報をjotaiに入れる
      setuserInfoJotai({
        userInfo: loginUser,
        access: data.access,
        refresh: data.refresh,
        fav: data.fav,
      });

      // ログイン情報を反映させるためにページにリフレッシュをかける
      window.location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        alert(error.message);
      } else {
        console.error("Unknown error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetJotai = () => setuserInfoJotai(jotaiInitialValue);
  const logout = () => {
    setLoading(true);
    resetJotai(); //グローバルステート初期化
    setLoading(false);

    // ログイン情報を反映させるためにページにリフレッシュをかける
    window.location.reload();
  };

  //トークンのリフレッシュ処理
  const refreshToken = async () => {
    try {
      setLoading(true);
      // アクセストークンが有効期限切れの場合に、リフレッシュトークンを使用して新しくアクセストークンを取得
      const refresh = userInfoJotai.refresh;
      if (!refresh) {
        // リフレッシュトークンがない場合はログアウト処理
        logout();
      }

      // リフレッシュトークンがある場合
      const newTokenObj = await refreshTokenAPI(refresh);
      // 取得した新たなトークンをjotaiにセット
      setuserInfoJotai({
        userInfo: userInfoJotai.userInfo,
        access: newTokenObj.access,
        refresh: newTokenObj.refresh,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        alert("トークンの再生成に失敗しました。ログアウトします。");
      } else {
        console.error("Unknown error", error);
      }
      logout();
    } finally {
      setLoading(false);
    }
  };
  const updateUserInfo = async (
    name: string,
    introduction: string,
    userImg?: File | null,
  ) => {
    setLoading(true);
    setErrorMsg("");
    try {
      if (!name) {
        throw new Error("name is necessary");
      }
      if (name.length > 25) {
        throw new Error("name should be less than 25");
      }
      if (introduction.length > 200) {
        throw new Error("introduction should be less than 200");
      }
      if (!userInfoJotai.userInfo?.id) {
        throw new Error("no user id in storage");
      }
      const id = userInfoJotai.userInfo?.id;

      // 以下、ファイルが添付されている場合のvalidation
      if (userImg) {
        // 画像ファイルかチェック
        if (
          !userImg.type.startsWith("image/jpeg") &&
          !userImg.type.startsWith("image/png") &&
          !userImg.type.startsWith("image/svg+xml")
        ) {
          throw new Error("File must be an image");
        }

        // ファイルサイズチェック
        if (userImg.size > 5000000) {
          // 5MBを超える場合はエラー
          throw new Error("Image must be less than 5MB");
        }
      } else {
        userImg = null;
      }

      const data = await updateUserInfoAPI(
        id,
        name,
        introduction,
        userImg,
        userInfoJotai.access,
      );

      if (!data) {
        throw new Error("Something wrong with updateUserInfo API");
      }
      const updatedUserInfo: UserInfoType = data;
      //アップデート成功時はユーザー情報をjotaiに入れる
      setuserInfoJotai({
        userInfo: updatedUserInfo,
        authtoken: userInfoJotai.access,
      });

      return updatedUserInfo;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    signUp,
    errorMsg,
    login,
    logout,
    verifiyEmail,
    refreshToken,
    updateUserInfo,
  };
};

export default useLogin;
