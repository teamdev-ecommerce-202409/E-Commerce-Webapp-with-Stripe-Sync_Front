import { useAtom } from "jotai";
import Layout from "../component/shared/Layout";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import "../style/MyPage.css";
import PrimaryButton from "../component/shared/PrimaryButton";
import { useEffect } from "react";
import useLogin from "../hook/useLogin";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { EditNotifications } from "@mui/icons-material";

const MyPage = () => {
  const [userInfoJotai] = useAtom(userInfoAtom);
  const { checkLogin } = useLogin();

  const navigate = useNavigate();

  //TODO EditNotificationsのアイコンボタンにユーザープロフィール変更ページにとぶようにして
  useEffect(() => {
    const authCheckLogin = async () => {
      const authResult = await checkLogin();
      if (!authResult) {
        navigate("/");
      }
    };

    //TODO バックエンドからユーザー情報を取得する
    authCheckLogin();
  }, []);
  return (
    <Layout>
      <div className="mypage_container">
        <div className="mypage_title_container">
          <h2>{userInfoJotai.userInfo?.name} 様のマイページ</h2>
        </div>

        <div>
          <div className="mypage_user_info_container">
            <div className="mypage_title_container">
              <h3>登録情報</h3>
              <IconButton onClick={() => alert("edit")}>
                <EditNotifications />
              </IconButton>
            </div>
            <div className="mypage_user_info_content_container">
              <div className="mypage_user_info_content_title">名前</div>
              <div className="mypage_user_info_content">
                {userInfoJotai.userInfo?.name}
              </div>
            </div>

            <div className="mypage_user_info_content_container">
              <div className="mypage_user_info_content_title">email</div>
              <div className="mypage_user_info_content">
                {userInfoJotai.userInfo?.email}
              </div>
            </div>

            <div className="mypage_user_info_content_container">
              <div className="mypage_user_info_content_title">住所</div>
              <div className="mypage_user_info_content">
                {userInfoJotai.userInfo?.address}
              </div>
            </div>
          </div>

          <div className="mypage_user_infolink_container">
            <PrimaryButton
              onClick={() => navigate("/mypage/favorites")}
              loading={false}
              text={"Favorites"}
            />
            {/* <PrimaryButton
              onClick={() => alert()}
              loading={false}
              text={"WishList"}
            /> */}
            <PrimaryButton
              onClick={() => navigate("/mypage/orders")}
              loading={false}
              text={"Orders"}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyPage;
