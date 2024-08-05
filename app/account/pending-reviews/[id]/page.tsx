"use client";
import { PageContainer } from "@app/account/components";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FormInput, ReviewSkeleton, ReviewSuccess } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store";
import RatingStarsButtons from "./components/RatingStarsButtons";
import { useParams, useRouter } from "next/navigation";
import { getReviewItem } from "@store/ordersSlice";
import axios from "axios";
import { ReviewType } from "@types";

function Review() {
  const user = useSelector((state: RootState) => state.global.user);
  const appLoaded = useSelector((state: RootState) => state.global.appLoaded);
  const accessToken = useSelector(
    (state: RootState) => state.global.accessToken
  );
  const reviewItem = useSelector((state: RootState) => state.orders.reviewItem);
  const loading = useSelector(
    (state: RootState) => state.orders.reviewItemLoading
  );
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [inputs, setInputs] = useState({
    title: "",
    user_name: user.user_name ? user.user_name : "",
    review: "",
  });
  const [stars, setStars] = useState(0);
  const [starsSet, setStarsSet] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const currentStarsCount = useRef(0);

  const { _id, product_id, product_name, product_image } =
    reviewItem && reviewItem;

  function handleStars(starId: number) {
    setStars(starId + 1);
    currentStarsCount.current = starId + 1;
    setStarsSet(true);
  }
  function handleHover(starId: number) {
    setStars(starId + 1);
  }
  function handleMouseOut() {
    if (!starsSet) {
      setStars(0);
    } else {
      setStars(currentStarsCount.current);
    }
  }

  function handleChange(e: any) {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const reviewBuild: ReviewType = {
        order_id: _id,
        product_id: reviewItem.product_id,
        user_id: user._id,
        rating: stars,
        review_title: inputs.title,
        review: inputs.review,
        reviewer_name: user.user_name,
      };
      await axios.post(
        "https://print-server-wxgg.onrender.com/api/review",
        reviewBuild,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSubmitted(true);
    } catch (err) {
      console.log(err);
    }
    setSubmitting(false);
  }

  useEffect(() => {
    if (accessToken) {
      dispatch(getReviewItem({ orderId: id, accessToken: accessToken }));
    }
  }, [accessToken]);

  useEffect(() => {
    console.log(reviewItem);
    if (!loading && reviewItem.reviewed === true) {
      router.replace("/account/pending-reviews");
    }
  }, [loading]);
  return (
    <PageContainer
      heading="Review Product"
      backBtn
      backPath="/account/pending-reviews"
    >
      {loading && <ReviewSkeleton />}
      {!loading && !submitted && (
        <div className="p-2">
          <h2 className="w-full text-sm md:text-base border-b p-2">
            SELECT THE STARS TO RATE THE PRODUCT.
          </h2>
          <div className="flex flex-col sm:flex-row py-2 gap-2 border-b">
            <Link href={`/product/${product_id}`}>
              <img
                src={product_image}
                alt={product_name}
                className="w-full sm:w-[7em] object-contain rounded-md"
              />
            </Link>
            <div className="flex flex-col gap-2 sm:gap-4">
              <Link
                className="text-base md:text-xl font-bold"
                href={`/product/${product_id}`}
              >
                {product_name}
              </Link>
              <RatingStarsButtons
                stars={stars}
                handleHover={handleHover}
                handleStars={handleStars}
                handleMouseOut={handleMouseOut}
              />
            </div>
          </div>

          <form className="w-full flex flex-col gap-2 md:gap-4">
            <h2 className="w-full text-sm md:text-base border-b p-2">
              LEAVE A REVIEW.
            </h2>
            <div className="w-full flex justify-between md:gap-4">
              <FormInput
                type="text"
                placeholder="Review title"
                value={inputs.title}
                name="title"
                max={20}
                handleChange={handleChange}
              />
              <FormInput
                type="text"
                placeholder="Name"
                value={user?.user_name}
                name="user_name"
                disabled
                max={30}
                handleChange={handleChange}
              />
            </div>
            <textarea
              placeholder="Tell us more about your rating"
              value={inputs.review}
              name="review"
              onChange={handleChange}
              maxLength={40}
              className="w-full h-20 md:h-28 border p-2 text-sm md:text-base"
            />
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`w-full text-white text-sm md:text-base bg-site-orange py-2 md:py-3 rounded-md ${
                submitting && "opacity-40"
              }`}
            >
              {submitting ? "SUBMIT..." : "SUBMIT"}
            </button>
          </form>
        </div>
      )}
      {submitted && (
        <div className="w-full h-full flex justify-center p-2">
          <ReviewSuccess />
        </div>
      )}
    </PageContainer>
  );
}

export default Review;
