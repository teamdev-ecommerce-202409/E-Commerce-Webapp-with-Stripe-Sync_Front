import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { useState, useEffect } from "react";
import { getUserProfileAPI, updateUserProfileAPI } from "../lib/database/User";
import { useNavigate } from "react-router-dom";
import "../style/MyPage.css";
import PrimaryButton from "../component/shared/PrimaryButton";

const EditProfilePage = () => {
  const [userInfoJotai, setUserInfoJotai] = useAtom(userInfoAtom);
  const [name, setName] = useState(userInfoJotai.userInfo?.name || "");
  const [email, setEmail] = useState(userInfoJotai.userInfo?.email || "");
  const [address, setAddress] = useState(userInfoJotai.userInfo?.address || "");
  const navigate = useNavigate();

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
    fetchUserInfo();
  }, [userInfoJotai]);

  const handleSaveChanges = async () => {
    const accessToken = userInfoJotai?.access;
    if (accessToken) {
      const updatedData = { name, email, address };
      const result = await updateUserProfileAPI(accessToken, updatedData);
      if (result) {
        setUserInfoJotai((prev) => ({
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
    <div className="mypage_container">
      <h2>プロフィール編集</h2>
      <div className="mypage_user_info_container">
        <div className="mypage_user_info_content_container">
          <label className="mypage_user_info_content_title">名前</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mypage_user_info_input"
          />
        </div>
        <div className="mypage_user_info_content_container">
          <label className="mypage_user_info_content_title">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mypage_user_info_input"
          />
        </div>
        <div className="mypage_user_info_content_container">
          <label className="mypage_user_info_content_title">住所</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mypage_user_info_input"
          />
        </div>
        <PrimaryButton onClick={handleSaveChanges} text="保存" loading={false} />
      </div>
    </div>
  );
};

export default EditProfilePage;
