import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as star1 } from "@fortawesome/free-regular-svg-icons";
import { faStar as star2 } from "@fortawesome/free-solid-svg-icons";
const RatingStars = ({ stars }: RatingStarsProps) => {
  const starsArray = [];
  for (let i = 0; i <= stars - 1; i++) {
    starsArray.push(
      <FontAwesomeIcon icon={star2} style={{ color: "orange" }} key={i} />
    );
  }
  while (starsArray.length < 5) {
    starsArray.push(
      <FontAwesomeIcon icon={star1} key={starsArray.length + 1} />
    );
  }
  return <div className="text-sm ">{starsArray}</div>;
};

interface RatingStarsProps {
  stars: number;
}

export default RatingStars;
