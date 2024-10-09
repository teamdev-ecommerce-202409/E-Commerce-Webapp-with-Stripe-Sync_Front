import { Rating } from "@mui/material";
import "../../../style/CommentCard.css";
import { CommentInfoType } from "../../../lib/type/ProductType";

type Props = {
  comment: CommentInfoType;
};
const CommentCard = ({ comment }: Props) => {
  return (
    <div className="commentCard_container">
      <h4>最高！</h4>
      <Rating name="read-only" value={comment.rating} readOnly />
      <p>{comment.comment}</p>
    </div>
  );
};

export default CommentCard;
