import { demoProductObject } from "@constants";
import { Order } from "@types";
import Link from "next/link";

function ReviewItem({
  _id,
  product_name,
  product_image,
  product_id,
  date_ordered,
}: Order) {
  return (
    <article className="flex flex-col items-center sm:items-start sm:flex-row p-2 border rounded-md mb-2 gap-2">
      <img
        src={product_image}
        alt={product_name}
        className="w-[4em] md:w-[5em] object-contain"
      />
      <div className="flex-1 flex flex-col items-center sm:items-start text-sm">
        <Link
          href={`/product/${product_id}`}
          className="text-base md:text-lg font-semibold"
        >
          {product_name}
        </Link>
        <p>Order #:{_id}</p>
        <p>Ordered on: {date_ordered}</p>
      </div>
      <Link
        href={`/pending-review/${_id}`}
        className="text-site-orange underline font-semibold text-sm md:text-base"
      >
        RATE THIS PRODUCT
      </Link>
    </article>
  );
}

export default ReviewItem;
