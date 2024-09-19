import AdminItemList from "../component/featured/AdminHomePage/AdminItemList";
import Layout from "../component/shared/Layout";
import PrimaryButton from "../component/shared/PrimaryButton";
import { useNavigate } from "react-router-dom";

import "../style/AdminHomePage.css";

const AdminHomePage = () => {
  const navigate = useNavigate();

  // 新規作成ボタンを押したとき

  const handleCreate = () => {
    navigate(`/admin/item`, { state: { mode: "create" } });
  };

  const handleDelete = () => {};
  return (
    <Layout>
      <div className="adminHomePage_container">
        <div className="adminHomePage_title_container">
          <h2>商品リスト(管理)</h2>
        </div>
        <div className="adminHomePage_actions_container">
          <div className="adminHomePage_button_container">
            <PrimaryButton
              onClick={handleCreate}
              loading={false}
              text={"新規作成"}
            />
          </div>
          <div className="adminHomePage_button_container">
            <PrimaryButton
              onClick={handleDelete}
              loading={false}
              text={"削除"}
            />
          </div>
        </div>

        <div className="adminHomePage_list_container">
          <AdminItemList />
        </div>
      </div>
    </Layout>
  );
};

export default AdminHomePage;
