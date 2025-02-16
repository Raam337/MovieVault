import "./pagination.sass";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { changePage } from "@/store/movieListSlice";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
}

function Pagination({ itemsPerPage, totalItems }: PaginationProps) {
  const numberOfPages = Math.ceil(totalItems / itemsPerPage);
  const dispatch = useDispatch<AppDispatch>()

  const paginationData = useSelector( (state:RootState) => state.movieList.paginationData)

  // useEffect( ()=>{

  // },[paginationData.displayedPage])

  // function forcePage(num:number){

  // }

  function paginate(index:{selected:number}){
    dispatch( changePage(index.selected+1) )
  }


  return (
    // <ul className="list">
    //   <li className="list__item" key={-10} onClick={() => paginate(1)}>Start</li>
    //   <li className="list__item" key={-1} onClick={() => paginate(paginationData.displayedPage-1)}>←</li>
    //   {pageIndexArray.map((index) => {
    //     return (
    //       <li className={`list__item ${paginationData.displayedPage === index && "list__item-active" }`} key={index} onClick={() => paginate(index)}>
    //         {index}
    //       </li>
    //     );
    //   })}
    //   <li className="list__item" key={-2} onClick={() => paginate(paginationData.displayedPage+1)}>→</li>
    //   <li className="list__item" key={-20} onClick={() => paginate(numberOfPages)}>End</li>
    // </ul>
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
        pageCount={numberOfPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={paginate}
        containerClassName="pagination"
        activeClassName="pg__item--active"
        disabledClassName="pg__item--disabled"
        forcePage={paginationData.displayedPage-1}

      />
  );
}

export default Pagination;
