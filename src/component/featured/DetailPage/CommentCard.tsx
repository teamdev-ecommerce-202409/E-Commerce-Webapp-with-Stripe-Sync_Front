import { Rating } from "@mui/material";
import "../../../style/CommentCard.css";
import { CommentInfoType } from "../../../lib/type/ProductType";
import { displayDateTime } from "../../../lib/util";

type Props = {
  comment: CommentInfoType;
};
const CommentCard = ({ comment }: Props) => {
  return (
    <div className="commentCard_container">
      <div className="commentCard_header_container">
        <Rating name="read-only" value={comment.rating} readOnly />
        <span className="commentCard_update_time">
          {displayDateTime(new Date(comment.updated_at))}
        </span>
      </div>
      <div className="commentCard_content_container">
        <p>{comment.comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
