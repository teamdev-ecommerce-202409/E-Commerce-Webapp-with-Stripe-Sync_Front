import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import AdminHomePage from "./pages/AdminHomePage";
import AdminItemPage from "./pages/AdminItemPage";
import AdminItemDetailPage from "./pages/AdminItemDetailPage";
import AdminItemCreatePage from "./pages/AdminItemCreatePage";

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
            <Route path="/item/:itemId" element={<DetailPage />} />
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/admin/item" element={<AdminItemPage />} />
            <Route path="/admin/item/new" element={<AdminItemCreatePage />} />
            <Route path="/admin/item/:itemId" element={<AdminItemDetailPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
