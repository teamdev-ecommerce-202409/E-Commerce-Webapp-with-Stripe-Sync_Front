import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmailAPI } from "../lib/database/User";
import Layout from "../component/shared/Layout";

const EmailConfirmationPage = () => {
  const { uidb64, token } = useParams<{ uidb64: string; token: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!uidb64 || !token) {
        alert("Invalid confirmation link.");
        navigate("/");
        return;
      }

      try {
        const result = await verifyEmailAPI(uidb64, token);
        if (result?.message) {
          alert(result.message); // メール認証成功メッセージを表示
          navigate("/"); // ホーム画面にリダイレクト
        } else {
          alert("Failed to confirm email.");
          navigate("/"); // 失敗時もホーム画面に戻る
        }
      } catch (error) {
        console.error(error);
        alert("Error during email confirmation.");
        navigate("/");
      }
    };
    verifyEmail();
  }, [uidb64, token, navigate]);

  return (
    <Layout>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2>Processing Email Confirmation...</h2>
      </div>
    </Layout>
  );
};

export default EmailConfirmationPage;
