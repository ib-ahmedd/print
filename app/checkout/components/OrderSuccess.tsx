import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OrderSuccess() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full h-[26em] md:max-w-[35em] rounded-xl relative">
      <div className="absolute w-full h-full bg-green-500 opacity-10 rounded-xl" />
      <div className="flex flex-col items-center text-green-500 px-4 md:px-8 z-10 text-center">
        <p className="font-bold flex flex-col md:flex-row items-center md:items-baseline">
          <span className="bg-green-500 min-w-7 min-h-7 rounded-full text-white flex items-center justify-center">
            <FontAwesomeIcon icon={faCheck} />
          </span>
          Your order has been placed successfully and is being processed.
        </p>
        <p>We will get back to you soon!</p>
      </div>
    </div>
  );
}

export default OrderSuccess;
