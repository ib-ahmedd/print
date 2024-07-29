import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleAccountSideBar } from "@store/globalSlice";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";

function PageContainer({ children, heading }: PageContainerProps) {
  const dispatch = useDispatch();
  return (
    <section className="w-full slg:w-3/4 min-h-[35em] bg-white px-0 flex-col rounded-md shadow-md">
      <div className="w-full px-4 py-2 border-b flex gap-2">
        <button className="w-8 h-8 rounded-full border border-site-blue slg:hidden">
          <FontAwesomeIcon
            icon={faAngleRight}
            onClick={() => {
              dispatch(handleAccountSideBar(true));
            }}
          />
        </button>
        <h1 className="w-full text-lg md:text-xl lg:text-2xl font-semibold">
          {heading}
        </h1>
      </div>
      {children}
    </section>
  );
}

interface PageContainerProps {
  children: ReactNode;
  heading: string;
}

export default PageContainer;
