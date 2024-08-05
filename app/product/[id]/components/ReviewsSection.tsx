import { Comment } from "@types";
import Review from "./Review";

function ReviewsSection({ reviews }: { reviews: Comment[] }) {
  return (
    <div className="w-full flex flex-col gap-2">
      {reviews.length === 0 && <p>There are no reviews yet.</p>}
      {reviews.length > 0 &&
        reviews.map((item) => <Review key={item._id} {...item} />)}
    </div>
  );
}

export default ReviewsSection;
