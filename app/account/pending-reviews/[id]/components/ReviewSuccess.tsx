import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function ReviewSuccess() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full h-full rounded-xl relative">
      <div className="absolute w-full h-full bg-green-500 opacity-10 rounded-md" />
      <div className="w-full flex flex-col gap-4 items-center text-green-500 px-4 md:px-8 z-10 text-center">
        <p className="font-bold flex flex-col gap-2 md:flex-row items-center md:items-baseline">
          <span className="bg-green-500 min-w-7 min-h-7 rounded-full text-white flex items-center justify-center">
            <FontAwesomeIcon icon={faCheck} />
          </span>
          Review Submmited!
        </p>
        <p>Thank you for your feedback</p>
        <Link
          href="/shop"
          className="py-2 px-6 text-white bg-site-orange rounded-md"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    </div>
  );
}

export default ReviewSuccess;
