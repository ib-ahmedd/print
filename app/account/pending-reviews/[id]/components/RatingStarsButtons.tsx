import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const RatingStarsButtons = ({
  stars,
  handleStars,
  handleMouseOut,
  handleHover,
}: RatingStarsButtonsProps) => {
  const starsArray = [];
  <FontAwesomeIcon icon={faStar} className="text-site-orange" />;
  for (let i = 0; i < stars; i++) {
    starsArray.push({
      element: <FontAwesomeIcon icon={faStar} className="text-site-orange" />,
      id: i,
    });
  }

  while (starsArray.length < 5) {
    starsArray.push({
      element: (
        <FontAwesomeIcon
          icon={faStar}
          className="text-gray-200"
          key={starsArray.length}
        />
      ),
      id: starsArray.length,
    });
  }

  const starButtons = starsArray.map((item) => (
    <div
      onClick={() => {
        handleStars(item.id);
      }}
      onMouseOver={() => {
        handleHover(item.id);
      }}
      onMouseOut={() => {
        handleMouseOut();
      }}
      key={item.id}
      className="rating-button"
    >
      {item.element}
    </div>
  ));
  return <div className="flex text-2xl md:text-3xl">{starButtons}</div>;
};

interface RatingStarsButtonsProps {
  stars: number;
  handleStars(starId: number): void;
  handleMouseOut(): void;
  handleHover(starId: number): void;
}

export default RatingStarsButtons;
