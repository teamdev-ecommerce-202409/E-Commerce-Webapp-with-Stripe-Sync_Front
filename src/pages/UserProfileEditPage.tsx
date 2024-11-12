import { useAtom } from "jotai";
import Layout from "../component/shared/Layout";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { useState, useEffect } from "react";
import { getUserProfileAPI, updateUserProfileAPI } from "../lib/database/User";
import useLogin from "../hook/useLogin";
import { useNavigate } from "react-router-dom";
import "../style/UserProfileEditPage.css";
import PrimaryButton from "../component/shared/PrimaryButton";
import { UserInfoTypeJotai } from "../lib/type/UserInfoType";

const EditProfilePage = () => {
  const [userInfoJotai, setUserInfoJotai] = useAtom(userInfoAtom);
  const { checkLogin } = useLogin();
  const [name, setName] = useState(userInfoJotai.userInfo?.name || "");
  const [email, setEmail] = useState(userInfoJotai.userInfo?.email || "");
  const [address, setAddress] = useState(userInfoJotai.userInfo?.address || "");
  const navigate = useNavigate();

  const authCheckLogin = async () => {
    const authResult = await checkLogin();
    if (!authResult) {
      navigate("/");
    }
  };

  useEffect(() => {
    // 認証トークンがある場合のみユーザー情報を取得
    const fetchUserInfo = async () => {
        if (userInfoJotai?.access) {
          const userData = await getUserProfileAPI(userInfoJotai.access);
        if (userData) {
          setName(userData.name || "");
          setEmail(userData.email || "");
          setAddress(userData.address || "");
        }
      }
    };

    authCheckLogin();
    fetchUserInfo();
  }, [userInfoJotai]);

  const handleSaveChanges = async () => {
    const accessToken = userInfoJotai?.access;
    if (accessToken) {
      const updatedData = { name, email, address };
      const result = await updateUserProfileAPI(accessToken, updatedData);
      if (result) {
        setUserInfoJotai((prev: UserInfoTypeJotai) => ({
          ...prev,
          userInfo: result,
        }));
        navigate("/mypage");
      } else {
        alert("プロフィールの更新に失敗しました。");
      }
    }
  };


  return (
    <Layout>
      <div className="mypage_container">
        <div className="mypage_title_container">
          <h2>プロフィール編集</h2>
        </div>
        <div className="mypage_user_info_container">
          <div className="mypage_user_info_content_container">
            <label className="mypage_user_info_content_title">名前</label>
            <input
              type="text"
              className="mypage_user_info_input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mypage_user_info_content_container">
            <label className="mypage_user_info_content_title">Email</label>
            <input
              type="email"
              className="mypage_user_info_input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mypage_user_info_content_container">
            <label className="mypage_user_info_content_title">住所</label>
            <input
              type="text"
              className="mypage_user_info_input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mypage_save_button_container">
            <PrimaryButton onClick={handleSaveChanges} loading={false} text="保存" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfilePage;
