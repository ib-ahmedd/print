import RatingStars from "@components/RatingStars";
import { RootState } from "@store";
import { Comment } from "@types";
import { useSelector } from "react-redux";

function Review({
  rating,
  review_title,
  review,
  date_reviewed,
  reviewer_name,
  user_id,
}: Comment) {
  const user = useSelector((state: RootState) => state.global.user);
  return (
    <article className="w-full border p-2 rounded-md">
      <RatingStars stars={rating} />
      <h4 className="font-bold">{review_title}</h4>
      <p className="text-sm md:text-base">{review}</p>
      <p className="text-sm">
        On {date_reviewed} by {reviewer_name} {user_id === user._id && "(you)"}
      </p>
    </article>
  );
}

export default Review;
