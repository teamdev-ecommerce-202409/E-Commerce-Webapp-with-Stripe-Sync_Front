import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

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
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
