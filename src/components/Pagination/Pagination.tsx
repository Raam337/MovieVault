import { MouseEventHandler } from "react";
import "./pagination.sass";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: Function
}

function Pagination({ itemsPerPage, totalItems, paginate }: PaginationProps) {
  const numberOfPages = Math.ceil(totalItems / itemsPerPage);
  const pageIndexArray = [...Array(numberOfPages).keys()].map((i) => i + 1);

  const currentPage = useSelector( (state:RootState) => state.movieList.paginationData.displayedPage)

  return (
    <ul className="list">
      {pageIndexArray.map((index) => {
        return (
          <li className={`list__item ${currentPage === index && "list__item-active" }`} key={index} onClick={() => paginate(index)}>
            {index}
          </li>
        );
      })}
    </ul>
  );
}

export default Pagination;
