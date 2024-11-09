import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import MyPage from "./pages/MyPage";
import AdminHomePage from "./pages/AdminHomePage";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductCreatePage from "./pages/AdminProductCreatePage";
import AdminProductPage from "./pages/AdminProductPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import CheckoutCancelPage from "./pages/CheckoutCancelPage";
import AdminOrderPage from "./pages/AdminOrderPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333",
    },
    secondary: {
      main: "rgb(83, 100, 113)",
    },
  },
  typography: {
    fontFamily: ["sans-serif"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:productId" element={<DetailPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/admin/product" element={<AdminProductPage />} />
            <Route path="/admin/order" element={<AdminOrderPage />} />

            <Route
              path="/admin/product/new"
              element={<AdminProductCreatePage />}
            />
            <Route
              path="/admin/product/:productId"
              element={<AdminProductDetailPage />}
            />
            <Route path="/shoppingcart" element={<ShoppingCartPage />} />
            <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
            <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
