function ReviewSkeleton() {
  return (
    <div className="loading w-full h-full flex flex-col gap-4 p-2">
      <div className="h-8 max-w-72"></div>
      <span className="flex flex-col sm:flex-row gap-2">
        <div className="w-full sm:w-[7em] h-[17em] sm:h-[7em]"></div>
        <span className="flex flex-col gap-4">
          <div className="h-4 w-72"></div>
          <div className="h-4 w-52"></div>
        </span>
      </span>
      <div className="h-6 md:h-8 max-w-72"></div>
      <span className="flex justify-between">
        <div className="h-6 md:h-10 w-[48%]"></div>
        <div className="h-6 md:h-10 w-[48%]"></div>
      </span>
      <div className="w-full h-20 md:h-28"></div>
      <div className="w-full h-6 md:h-10"></div>
    </div>
  );
}

export default ReviewSkeleton;
