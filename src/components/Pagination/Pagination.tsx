import "./pagination.sass";
import { changePage } from "@/store/movieListSlice";
import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from "@/store/storeActions";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
}

function Pagination({ itemsPerPage, totalItems }: PaginationProps) {
  const numberOfPages = Math.ceil(totalItems / itemsPerPage);
  const dispatch = useAppDispatch()
  const paginationData = useAppSelector(state => state.movieList.paginationData)
  function paginate(index:{selected:number}){
    dispatch( changePage(index.selected+1) )
  }

  return (
    <ReactPaginate
        className="pg"
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName = "pg__item"
        pageLinkClassName="pg__link"
        previousClassName="pg__item"
        previousLinkClassName="pg__nav-button"
        nextClassName="pg__item"
        nextLinkClassName="pg__nav-button"
        breakLabel="..."
        breakClassName="pg__item"
        breakLinkClassName="pg__link"
        pageCount={numberOfPages ?? 9999}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={paginate}
        containerClassName="pagination"
        activeClassName="pg__item--active"
        disabledClassName="pg__item--disabled"
        forcePage={paginationData.displayedPage-1}

      />
  );
}

export default Pagination;
