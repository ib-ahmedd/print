import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BestQuality() {
  const bestQualityArray = [
    "Personal Gifts",
    "Couple Tshirts",
    "Occational Gifts",
    "Wedding Package",
    "Corporate Gifts",
    "Birthday Gifts",
  ];
  return (
    <section className="flex-col">
      <div className="w-1/2 pr-20">
        <h2>Best Quality Printed T-Shirts & Mugs At Affordable Price!</h2>
        <ul className="flex flex-wrap">
          {bestQualityArray.map((item) => (
            <li className="w-1/2">
              <span>
                <FontAwesomeIcon icon={faHeart} />
              </span>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </div>
      <div></div>
    </section>
  );
}

export default BestQuality;
