"use client";
import { faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function BestQuality() {
  const bestQualityArray = [
    "Personal Gifts",
    "Couple Tshirts",
    "Occational Gifts",
    "Wedding Package",
    "Corporate Gifts",
    "Birthday Gifts",
  ];

  const dropDownQuestionArray = [
    "We Can Custom Design Your Ideas",
    "Your Payment Is Safe And Secured",
    "We Offer Discounts And Coupons",
  ];

  const [openDropDown, setOpenDropDown] = useState("");

  function handleDropDown(question: string) {
    if (question !== openDropDown) {
      setOpenDropDown(question);
    } else {
      setOpenDropDown("");
    }
  }

  return (
    <section className="gap-8 flex-col md:flex-row py-20 md:py-32">
      <div className="w-full md:w-1/2 flex flex-col md:gap-12">
        <h2>Best Quality Printed T-Shirts & Mugs At Affordable Price!</h2>
        <ul className="flex flex-wrap">
          {bestQualityArray.map((item) => (
            <li className="w-full sm:w-1/2 flex gap-2 mb-3">
              <span className="bg-site-orange text-white text-[8px] w-5 h-5 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faHeart} />
              </span>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </div>
      <table className="center_shadow w-full md:w-1/2 border border-collapse border-gray-100 ">
        {dropDownQuestionArray.map((item) => (
          <>
            <tr className="border border-gray-100">
              <button
                onClick={() => {
                  handleDropDown(item);
                }}
                className={`w-full flex items-center gap-4 md:gap-6 font-bold p-4 md:p-8 ${
                  openDropDown === item && "text-site-orange"
                }`}
              >
                <span
                  className={`text-[10px] text-site-orange ${
                    openDropDown === item ? "rotate-90" : "rotate-0"
                  } transition duration-150`}
                >
                  <FontAwesomeIcon icon={faPlay} />
                </span>
                <p className="text-sm md:text-base">{item}</p>
              </button>
            </tr>
            <tr className="border border-gray-100">
              <p
                className={`px-4 md:px-8 text-sm md:text-base ${
                  openDropDown === item ? "h-[80px]" : "h-[0px]"
                } flex items-center overflow-hidden transition duration-150`}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
            </tr>
          </>
        ))}
      </table>
    </section>
  );
}

export default BestQuality;
