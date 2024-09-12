import { useState } from "react";
import "../style/Header.css";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ModalPopup from "./ModalPopup";
import LoginForm from "./LoginForm";
import { IconButton } from "@mui/material";

export const Header = () => {
  const [keyword, setKeyword] = useState("");
  const [loginFormOpen, setLoginFormOpen] = useState(false);

  const handleLoginPopup = () => {
    setLoginFormOpen(true);
  };

  return (
    <header className="header">
      <ModalPopup
        open={loginFormOpen}
        handleClose={() => setLoginFormOpen(false)}
      >
        <LoginForm handleClose={() => setLoginFormOpen(false)} />
      </ModalPopup>
      <div className="logo">
        <Link to="/">ZOO</Link>
      </div>
      <nav className="nav-links">
        <ul>
          <li>
            <SearchInput keyword={keyword} setKeyword={setKeyword} />
          </li>
          <li>
            <IconButton
              className="header_iconButton"
              onClick={handleLoginPopup}
            >
              <AccountBoxIcon />
            </IconButton>
          </li>
          <li>
            <Link to="/shoppingcart">
              <ShoppingCartIcon />
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <MenuIcon />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
