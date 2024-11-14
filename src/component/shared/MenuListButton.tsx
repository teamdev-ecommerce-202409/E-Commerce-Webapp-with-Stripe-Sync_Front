import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useState } from "react";
import "../../style/MenuListButton.css";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hook/useLogin";
import { userInfoAtom } from "../../lib/jotai/atoms/user";
import { useAtom } from "jotai";

export const MenuListButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { logout, loading } = useLogin();
  const [userInfoJotai] = useAtom(userInfoAtom);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleClose();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <IconButton
        className="menuList_iconButton"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {userInfoJotai && userInfoJotai.access && (
          <MenuItem onClick={() => handleMenuItemClick("/mypage")}>
            Mypage
          </MenuItem>
        )}
        {userInfoJotai &&
          userInfoJotai.access &&
          userInfoJotai.userInfo?.role === "admin" && (
            <MenuItem onClick={() => handleMenuItemClick("/admin")}>
              Admin
            </MenuItem>
          )}
        {userInfoJotai && userInfoJotai.access && (
          <MenuItem onClick={handleLogout} disabled={loading}>
            Logout
          </MenuItem>
        )}
        <MenuItem
          onClick={() => alert("お問い合わせは準備中！")}
          disabled={loading}
        >
          Contact
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuListButton;
