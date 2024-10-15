import CartItemCard from "../component/featured/ShoppingCartPage/CartItemCart";
import Layout from "../component/shared/Layout";
import PrimaryButton from "../component/shared/PrimaryButton";
import "../style/ShoppingCartPage.css";

const ShoppingCartPage = () => {
  const cartItems = Array.from({ length: 10 }, (_, index) => index + 1);
  return (
    <Layout>
      <div className="shoppingCartPage_container">
        <div className="shoppingCartPage_title_container">
          <h2>ショッピングカート</h2>
        </div>
        <div className="shoppingCartPage_content_container">
          <div className="shoppingCartPage_cartItems_container">
            {cartItems.map((cartItem) => {
              return <CartItemCard key={cartItem} />;
            })}
          </div>
          <div className="shoppingCartPage_settlement_container">
            <div className="shoppingCartPage_settlementCard_container">
              <h3>注文内容</h3>
              <p className="settlement-item">
                <span>小計:</span>
                <span>¥10,000</span>
              </p>
              <p className="settlement-item">
                <span>送料:</span>
                <span>¥500</span>
              </p>
              <p className="settlement-total">
                <span>合計:</span>
                <span>¥10,500</span>
              </p>
              <div className="shoppingCartPage_settlementButton_container">
                <PrimaryButton
                  onClick={() => alert("settlement click")}
                  loading={false}
                  text={"レジに進む"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShoppingCartPage;
