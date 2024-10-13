import Pagination from "@mui/material/Pagination";
import "../../style/PaginationControl.css";
type Props = {
  allPageCount: number;
  handlePageChange: (value: React.SetStateAction<number>) => void;
  page: number;
};
const PaginationControl = ({ allPageCount, handlePageChange, page }: Props) => {
  return (
    <div className="pagination_container">
      <Pagination
        count={allPageCount}
        color="primary"
        onChange={(e, page) => handlePageChange(page)}
        page={page}
      />
    </div>
  );
};

export default PaginationControl;
