import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ErrorDisplay({ errorMessage }: { errorMessage: string }) {
  return (
    <div className="w-full relative">
      <div className="absolute w-full h-full bg-red-600 opacity-10 rounded-lg" />
      <p className="text-red-600 font-bold text-sm p-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faWarning} /> {errorMessage}
      </p>
    </div>
  );
}

export default ErrorDisplay;
