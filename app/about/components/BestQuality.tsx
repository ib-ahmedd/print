"use client";
import { faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { bestQualityArray, dropDownQuestionArray } from "../constants";
import DropDownItem from "./DropDownItem";

function BestQuality() {
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
            <li className="w-full sm:w-1/2 flex gap-2 mb-3" key={item}>
              <span className="bg-site-orange text-white text-[8px] w-5 h-5 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faHeart} />
              </span>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </div>
      <table className="center_shadow w-full md:w-1/2 border border-collapse border-gray-100 ">
        <tbody>
          {dropDownQuestionArray.map((item) => (
            <DropDownItem
              key={item}
              handleDropDown={handleDropDown}
              openDropDown={openDropDown}
              title={item}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default BestQuality;
