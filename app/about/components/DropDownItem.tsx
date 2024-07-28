import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DropDownItem({
  openDropDown,
  handleDropDown,
  title,
}: DropDownItemProps) {
  return (
    <>
      <tr className="border border-gray-100">
        <td>
          <button
            onClick={() => {
              handleDropDown(title);
            }}
            className={`w-full flex items-center gap-4 md:gap-6 font-bold p-4 md:p-8 ${
              openDropDown === title && "text-site-orange"
            }`}
          >
            <span
              className={`text-[10px] text-site-orange ${
                openDropDown === title ? "rotate-90" : "rotate-0"
              } transition duration-150`}
            >
              <FontAwesomeIcon icon={faPlay} />
            </span>
            <p className="text-sm md:text-base">{title}</p>
          </button>
        </td>
      </tr>
      <tr className="border border-gray-100" key={title}>
        <td>
          <p
            className={`px-4 md:px-8 text-sm md:text-base ${
              openDropDown === title ? "h-[80px]" : "h-[0px]"
            } flex items-center overflow-hidden transition duration-150`}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </td>
      </tr>
    </>
  );
}

interface DropDownItemProps {
  openDropDown: string;
  handleDropDown(title: string): void;
  title: string;
}

export default DropDownItem;
