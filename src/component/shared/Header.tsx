import { useState } from "react";
import "../../style/Header.css";
import { Link } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ModalPopup from "./ModalPopup";
import LoginForm from "./LoginForm";
import { IconButton } from "@mui/material";
import MenuListButton from "./MenuListButton";
import { useAtom } from "jotai";
import { userInfoAtom } from "../../lib/jotai/atoms/user";

export const Header = () => {
  const [userInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

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
            {userInfoJotai && userInfoJotai.access ? (
              <span>{userInfoJotai.userInfo?.name}様</span>
            ) : (
              <IconButton
                className="header_iconButton"
                onClick={handleLoginPopup}
              >
                <AccountBoxIcon />
              </IconButton>
            )}
          </li>
          <li>
            <Link to="/shoppingcart">
              <ShoppingCartIcon />
            </Link>
          </li>
          <li>
            <MenuListButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
