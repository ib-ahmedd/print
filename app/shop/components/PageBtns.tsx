import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch } from "react";

function PageBtns({ productsCount, page, dispatch }: PageBtnsProps) {
  const arrayLength = productsCount ? Math.floor(productsCount / 9) + 1 : 0;
  const pageNosArray = [];
  for (let i = 1; i <= arrayLength; i++) {
    pageNosArray.push(i);
  }

  function setPage(btnNo: number) {
    dispatch({ type: "SET_PAGE", payload: btnNo });
  }
  return (
    <div
      className={`${
        productsCount && productsCount < 9 ? "hidden" : "flex"
      } gap-2`}
    >
      {page > 1 && (
        <button
          onClick={() => {
            setPage(page - 1);
          }}
          className="text-lg text-site-orange border border-site-orange h-10 w-10 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}
      {pageNosArray.map((item) => (
        <button
          onClick={() => {
            setPage(item);
          }}
          key={item}
          className={`${
            page === item && "text-white bg-site-orange"
          } text-lg text-site-orange border border-site-orange h-10 w-10 flex items-center justify-center`}
        >
          {item}
        </button>
      ))}

      {page < arrayLength && (
        <button
          onClick={() => {
            setPage(page + 1);
          }}
          className="text-lg text-site-orange border border-site-orange h-10 w-10 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      )}
    </div>
  );
}

interface PageBtnsProps {
  productsCount: number | undefined;
  page: number;
  dispatch: Dispatch<any>;
}

export default PageBtns;
