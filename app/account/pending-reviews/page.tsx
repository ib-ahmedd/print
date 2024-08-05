"use client";

import { EmptyPage, PageContainer } from "../components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPendingReviews } from "@store/ordersSlice";
import { AppDispatch, RootState } from "@store";
import { ReviewItem, ReviewItemSkeleton } from "./components";

function PendingReviews() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.global.user);
  const accessToken = useSelector(
    (state: RootState) => state.global.accessToken
  );
  const pendingReviews = useSelector(
    (state: RootState) => state.orders.pendingReviews
  );
  const loading = useSelector(
    (state: RootState) => state.orders.pendingReviewsLoading
  );

  useEffect(() => {
    dispatch(
      getPendingReviews({ user_id: user._id, accessToken: accessToken })
    );
  }, [user, accessToken]);
  return (
    <PageContainer heading="Pending reviews">
      {!loading && pendingReviews.length === 0 && (
        <EmptyPage text="You don't have any pending reviews." />
      )}
      <div className="p-2">
        {!loading &&
          pendingReviews.map((item) => <ReviewItem key={item._id} {...item} />)}
        {loading && <ReviewItemSkeleton />}
      </div>
    </PageContainer>
  );
}

export default PendingReviews;
