"use client";
import Product from "@components/Product";
import { fallBackProduct } from "@constants";
import useGetProducts from "@hooks/useGetProducts";
import { CartItem, ProductsType } from "@types";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PageSkeleton from "./components/PageSkeleton";
import { percentage } from "@utils/percentage";
import Sale from "@components/Sale";
import { useDispatch, useSelector } from "react-redux";
import { addNoLog, addToCartLogged, clearItemAdded } from "@store/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import SetQuantity from "@components/SetQuantity";
import { AppDispatch, RootState } from "@store";

function ProductPage() {
  const { id } = useParams();

  const [descOnScreen, setDescOnScreen] = useState(true);
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const { products, loading: pageLoading } = useGetProducts(`/product/${id}`);
  const addedQuantity = useRef(0);

  const dispatch = useDispatch<AppDispatch>();

  // --------------global state---------------
  const isLoggedIn = useSelector((state: RootState) => state.global.isLoggedIn);
  const user = useSelector((state: RootState) => state.global.user);
  const accessToken = useSelector(
    (state: RootState) => state.global.accessToken
  );

  // --------------cart state---------------
  const added = useSelector((state: RootState) => state.cart.added);
  const loading = useSelector((state: RootState) => state.cart.adding);

  const {
    product,
    relatedProducts,
  }: { product: ProductsType; relatedProducts: ProductsType[] } =
    !pageLoading && products;

  const {
    _id,
    category,
    free_shipping,
    price,
    product_image,
    product_name,
    sale,
  } = product ? product : fallBackProduct;

  const cartItemBuild: CartItem = {
    _id,
    product_id: _id,
    price,
    product_image,
    product_name,
    quantity: productQuantity,
  };

  async function handleAddToCart() {
    if (isLoggedIn) {
      dispatch(
        addToCartLogged({
          item: { ...cartItemBuild, user_id: user._id },
          accessToken: accessToken,
        })
      );
    } else {
      dispatch(addNoLog(cartItemBuild));
    }
    addedQuantity.current = productQuantity;
  }

  useEffect(() => {
    return () => {
      dispatch(clearItemAdded());
    };
  }, []);

  return (
    <main className="py-0 sm:py-8 xl:py-16 bg-gray-100 px-0 sm:px-4 md:px-8 xl:px-32">
      {pageLoading && <PageSkeleton />}

      {!pageLoading && (
        <section className="flex-col gap-12 py-20 px-4 md:px-8 xl:px-24 bg-white">
          {added && (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t-4 border-site-orange p-4 md:p-6 bg-gray-50">
              <div className="flex items-center justify-between gap-4">
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-site-orange text-white text-sm">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <p className="flex-1 text-sm md:text-base">
                  {addedQuantity.current} × "{product_name}"{" "}
                  {addedQuantity.current < 2 ? "has" : "have"} been added to
                  your cart
                </p>
              </div>

              <Link
                href="/cart"
                className="w-fit py-2 px-6 bg-site-orange text-white rounded-md justify-self-end text-sm md:text-base"
              >
                VIEW CART
              </Link>
            </div>
          )}

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
                    ${percentage(price, 15).toFixed(2)}
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
                <SetQuantity
                  productQuantity={productQuantity}
                  setProductQuantity={setProductQuantity}
                />
                <button
                  disabled={loading}
                  onClick={handleAddToCart}
                  className={`px-10 py-2 text-white bg-site-orange rounded-md text-sm md:text-base ${
                    loading && "opacity-40"
                  }`}
                >
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
              {!pageLoading &&
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
