import Layout from "../component/shared/Layout";
import PrimaryButton from "../component/shared/PrimaryButton";
import { useNavigate } from "react-router-dom";

import "../style/AdminHomePage.css";
import { useEffect } from "react";
import useLogin from "../hook/useLogin";

const AdminHomePage = () => {
  const { checkLogin } = useLogin();

  const navigate = useNavigate();

  const handleProduct = () => {
    navigate(`/admin/product`);
  };

  const handleOrder = () => {
    navigate(`/admin/order`);
  };
  useEffect(() => {
    const authCheckAdmin = async () => {
      const authResult = await checkLogin(true);
      if (!authResult) {
        navigate("/");
      }
    };
    authCheckAdmin();
  }, []);

  return (
    <Layout>
      <div className="adminHomePage_container">
        <div className="adminHomePage_title_container">
          <h2>管理者ダッシュボード</h2>
        </div>
        <div className="adminHomePage_actions_container">
          <div className="adminHomePage_button_container">
            <PrimaryButton
              onClick={handleProduct}
              loading={false}
              text={"製品一覧"}
            />
          </div>
          <div className="adminHomePage_button_container">
            <PrimaryButton
              onClick={handleOrder}
              loading={false}
              text={"注文状況照会"}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHomePage;
