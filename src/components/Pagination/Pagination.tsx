import "./pagination.sass";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { changePage } from "@/store/movieListSlice";
import { useEffect, useState } from "react";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
}

function Pagination({ itemsPerPage, totalItems }: PaginationProps) {
  const numberOfPages = Math.ceil(totalItems / itemsPerPage);
  const pageIndexArray = [...Array(numberOfPages).keys()].map((i) => i + 1);
  const dispatch = useDispatch<AppDispatch>()

  const paginationData = useSelector( (state:RootState) => state.movieList.paginationData)

  function paginate(index:number){
    console.log(index);
    dispatch( changePage(index) )
  }


  return (
    <ul className="list">
      <li className="list__item" key={-10} onClick={() => paginate(1)}>Start</li>
      <li className="list__item" key={-1} onClick={() => paginate(paginationData.displayedPage-1)}>←</li>
      {pageIndexArray.map((index) => {
        return (
          <li className={`list__item ${paginationData.displayedPage === index && "list__item-active" }`} key={index} onClick={() => paginate(index)}>
            {index}
          </li>
        );
      })}
      <li className="list__item" key={-2} onClick={() => paginate(paginationData.displayedPage+1)}>→</li>
      <li className="list__item" key={-20} onClick={() => paginate(numberOfPages)}>End</li>
    </ul>
  );
}

export default Pagination;
