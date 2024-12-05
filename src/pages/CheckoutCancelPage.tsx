import { useAtom } from "jotai";
import Layout from "../component/shared/Layout";
import { checkoutInfoAtom } from "@e-commerce/lib/jotai/atoms/checkout";
import { changeOrderStatus } from "@e-commerce/lib/database/Order";
import { userInfoAtom } from "@e-commerce/lib/jotai/atoms/user";
import { OrderStatus } from "@e-commerce/lib/type/OrderType";

const CheckoutCancelPage = () => {
  const [userInfoJotai] = useAtom(userInfoAtom);
  const [checkoutInfoJotai, setCheckoutInfoJotai] = useAtom(checkoutInfoAtom);

  if (checkoutInfoJotai.order_id !== undefined) {
    changeOrderStatus(
      checkoutInfoJotai.order_id,
      OrderStatus.cancelled,
      userInfoJotai && userInfoJotai.access
    );
    setCheckoutInfoJotai({});
  }
  
  return (
    <Layout>
      <p>チェックアウトをキャンセルしました。</p>
    </Layout>
  );
};

export default CheckoutCancelPage;
