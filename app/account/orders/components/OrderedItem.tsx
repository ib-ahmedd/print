import { Order } from "@types";
import Link from "next/link";
function OrderedItem({
  _id,
  product_name,
  product_image,
  product_id,
  price,
  date_ordered,
  quantity,
}: Order) {
  return (
    <article className="w-[49%] md:w-full flex flex-col md:flex-row gap-2 p-2 mb-2 border rounded-md">
      <img
        src={product_image}
        alt={product_name}
        className="w-full md:w-[5em] object-contain rounded-md"
      />
      <div className="flex-1 flex flex-col justify-between">
        <Link
          href={`/product/${product_id}`}
          className="text-base md:text-lg font-semibold"
        >
          {product_name}
        </Link>
        <p className="text-sm md:text-base">Quantity: {quantity}</p>
        <p className="text-sm md:text-base">On {date_ordered}</p>
      </div>
      <div className="w-full md:w-fit flex flex-col gap-2">
        <Link
          href={`/product/${product_id}`}
          className="w-full md:w-fit text-sm md:text-md: py-2 md:px-6 bg-site-orange text-white rounded-md text-center"
        >
          SEE PRODUCT
        </Link>
        <Link
          href={`/account/orders/${_id}`}
          className="text-sm md:text-md: text-site-orange text-center font-semibold underline"
        >
          ORDER DETAILS
        </Link>
      </div>
    </article>
  );
}

export default OrderedItem;
