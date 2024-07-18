"use client";
import Product from "@components/Product";
import { demoProductObject, fallBackProduct } from "@constants";
import useGetProducts from "@hooks/useGetProducts";
import { ProductsType } from "@types";
import { useParams } from "next/navigation";
import { useState } from "react";
import PageSkeleton from "./components/PageSkeleton";
import { percentage } from "@utils/percentage";
import Sale from "@components/Sale";

function ProductPage() {
  const { id } = useParams();

  const [descOnScreen, setDescOnScreen] = useState(true);
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const { products, loading } = useGetProducts(`/product/${id}`);

  const {
    product,
    relatedProducts,
  }: { product: ProductsType; relatedProducts: ProductsType[] } =
    !loading && products;

  const {
    _id,
    category,
    free_shipping,
    price,
    product_image,
    product_name,
    sale,
  } = product ? product : fallBackProduct;

  const slashedPrice = sale && (price - percentage(price)).toFixed(2);

  return (
    <main className="py-0 sm:py-8 xl:py-16 bg-gray-100 px-0 sm:px-4 md:px-8 xl:px-32">
      {loading && <PageSkeleton />}

      {!loading && (
        <section className="flex-col gap-12 py-20 px-4 md:px-8 xl:px-24 bg-white">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 relative">
              <img src={product_image} alt={product_name} />
              {sale && <Sale style={3} />}
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <h1 className="text-2xl md:text-3xl font-normal">
                {product_name}
              </h1>
              <span className="flex gap-2 items-end">
                {sale ? (
                  <h2 className="text-xl md:text-2xl m-0">
                    <span className="text-xl md:text-2xl font-normal text-gray-400 mr-2 line-through">
                      ${price.toFixed(2)}
                    </span>
                    ${slashedPrice}
                  </h2>
                ) : (
                  <h2 className="text-xl md:text-2xl font-bold m-0">
                    ${price.toFixed(2)}
                  </h2>
                )}
                <p>{free_shipping && "+ Free Shipping"}</p>
              </span>
              <p className="text-sm md:text-base">
                Neque porro quisquam est, qui dolore ipsum quia dolor sit amet,
                consectetur adipisci velit, sed quia non incidunt lores ta porro
                ame. numquam eius modi tempora incidunt lores ta porro ame.
              </p>

              <div className="w-full flex gap-4 border-b pb-4">
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      if (productQuantity > 1)
                        return setProductQuantity((prev) => prev - 1);
                    }}
                    className="border w-10 h-10 flex items-center justify-center"
                  >
                    -
                  </button>
                  <p className="border w-10 h-10 flex items-center justify-center">
                    {productQuantity}
                  </p>
                  <button
                    onClick={() => {
                      if (productQuantity < 5)
                        return setProductQuantity((prev) => prev + 1);
                    }}
                    className="border w-10 h-10 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <button className="px-10 py-2 text-white bg-site-orange rounded-md text-sm md:text-base">
                  ADD TO CART
                </button>
              </div>
              <p>
                Category: <span className="text-site-orange">{category}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full border-t">
            <div className="flex gap-4 text-sm font-bold">
              <button
                onClick={() => {
                  setDescOnScreen(true);
                }}
                className={
                  descOnScreen ? "border-t-2 border-site-orange py-2" : "py-2"
                }
              >
                Description
              </button>
              <button
                onClick={() => {
                  setDescOnScreen(false);
                }}
                className={
                  !descOnScreen ? "border-t-2 border-site-orange py-2" : "py-2"
                }
              >
                Reviews (0)
              </button>
            </div>
            {descOnScreen && (
              <p className="text-sm md:text-lg">
                Neque porro quisquam est, qui dolore ipsum quia dolor sit amet,
                consectetur adipisci velit, sed quia non incidunt lores ta porro
                ame. numquam eius modi tempora incidunt lores ta porro ame.
              </p>
            )}
            {!descOnScreen && <p>There are no reviews yet.</p>}
          </div>

          <div className="flex flex-col gap-4">
            <h2>Related products</h2>
            <div className="flex gap-[4%] md:gap-4 flex-wrap">
              {!loading &&
                relatedProducts.map((item) => (
                  <Product key={item._id} {...item} notShop />
                ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default ProductPage;
