import { checkoutInfoAtom } from "@e-commerce/lib/jotai/atoms/checkout";
import Layout from "../component/shared/Layout";
import { useAtom } from "jotai";
import { changeOrderStatus } from "@e-commerce/lib/database/Order";
import { userInfoAtom } from "@e-commerce/lib/jotai/atoms/user";
import { OrderStatus } from "@e-commerce/lib/type/OrderType";

const CheckoutSuccessPage = () => {
  const [userInfoJotai] = useAtom(userInfoAtom);
  const [checkoutInfoJotai, setCheckoutInfoJotai] = useAtom(checkoutInfoAtom);

  if (checkoutInfoJotai.order_id !== undefined) {
    changeOrderStatus(
      checkoutInfoJotai.order_id,
      OrderStatus.confirmed,
      userInfoJotai && userInfoJotai.access
    );
    setCheckoutInfoJotai({});
  }
  
  return (
    <Layout>
      <p>チェックアウトを完了しました。</p>
    </Layout>
  );
};

export default CheckoutSuccessPage;
