import { Rating } from "@mui/material";
import "../../../style/CommentCard.css";
const CommentCard = () => {
  return (
    <div className="commentCard_container">
      <h4>最高！</h4>
      <Rating name="read-only" value={5} readOnly />
      <p>
        コメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメント
      </p>
    </div>
  );
};

export default CommentCard;
