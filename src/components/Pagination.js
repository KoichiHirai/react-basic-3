import './Pagination.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setData } from '../actions/action';

function Pagination() {
  const { currentPage, data } = useSelector((state) => state.pagination);
  // const currentPage = useSelector((state) => state.pagination);
  const dispatch = useDispatch();

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        前のページ
      </button>
      <span className="pagination__page">{currentPage}</span>
      <button
        className="pagination__button"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        次のページ
      </button>
    </div>
  );
}

export default Pagination;
