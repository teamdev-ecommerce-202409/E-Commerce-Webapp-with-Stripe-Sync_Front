import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { userInfoAtom } from "../../lib/jotai/atoms/user";
import { useAtom } from "jotai";
import { registerWish } from "../../lib/database/Product";
import { ProductInfoType } from "../../lib/type/ProductType";

type Props = {
  product: ProductInfoType;
};

const WishButton = ({ product }: Props) => {
  const [userInfoJotai] = useAtom(userInfoAtom);
  const [isWish, setIsWish] = useState(product.wish || false);
  const [openModal, setOpenModal] = useState(false);

  const handleWishClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    if (isWish) {
      await registerWish(
        product.id,
        false,
        false,
        userInfoJotai && userInfoJotai.access
      );
      setIsWish(false);
      return;
    }
    setOpenModal(true);
  };

  const handleModalClose = async (choice: "public" | "private" | null) => {
    setOpenModal(false);
    if (choice) {
      await registerWish(
        product.id,
        true,
        choice === "public",
        userInfoJotai && userInfoJotai.access
      );
      setIsWish(true);
    }
  };

  return (
    <>
      <IconButton
        color="primary"
        aria-label="add to favorites"
        onClick={(event) => handleWishClick(event)}
      >
        {isWish ? <PlaylistAddCheckCircleIcon /> : <PlaylistAddCheckIcon />}
      </IconButton>
      <Dialog open={openModal} onClose={() => handleModalClose(null)}>
        <DialogTitle>公開設定を選択してください</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => handleModalClose("public")}
            color="primary"
          >
            Public
          </Button>
          <Button
            onClick={() => handleModalClose("private")}
            color="secondary"
          >
            Private
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WishButton;
