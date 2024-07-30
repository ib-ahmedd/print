function OrderSkeleton() {
  return (
    <div className="w-full flex flex-wrap justify-between">
      <article className="loading w-[49%] md:w-full flex flex-col md:flex-row gap-2 border p-2 rounded-md mb-2">
        <div className="h-36 sm:h-56 md:h-20 w-full md:w-20"></div>
        <span className="flex-1 flex flex-col gap-2">
          <div className="h-6 max-w-72"></div>
          <div className="h-4 max-w-28"></div>
          <div className="h-4 max-w-36"></div>
        </span>
        <span className="w-full md:w-fit flex flex-col md:items-center gap-4">
          <div className="h-8 w-full md:w-32"></div>
          <div className="h-4 w-full md:w-28"></div>
        </span>
      </article>
      <article className="loading w-[49%] md:w-full flex flex-col md:flex-row gap-2 border p-2 rounded-md mb-2">
        <div className="h-36 sm:h-56 md:h-20 w-full md:w-20"></div>
        <span className="flex-1 flex flex-col gap-2">
          <div className="h-6 max-w-72"></div>
          <div className="h-4 max-w-28"></div>
          <div className="h-4 max-w-36"></div>
        </span>
        <span className="w-full md:w-fit flex flex-col md:items-center gap-4">
          <div className="h-8 w-full md:w-32"></div>
          <div className="h-4 w-full md:w-28"></div>
        </span>
      </article>
      <article className="loading w-[49%] md:w-full flex flex-col md:flex-row gap-2 border p-2 rounded-md mb-2">
        <div className="h-36 sm:h-56 md:h-20 w-full md:w-20"></div>
        <span className="flex-1 flex flex-col gap-2">
          <div className="h-6 max-w-72"></div>
          <div className="h-4 max-w-28"></div>
          <div className="h-4 max-w-36"></div>
        </span>
        <span className="w-full md:w-fit flex flex-col md:items-center gap-4">
          <div className="h-8 w-full md:w-32"></div>
          <div className="h-4 w-full md:w-28"></div>
        </span>
      </article>
      <article className="loading w-[49%] md:w-full flex flex-col md:flex-row gap-2 border p-2 rounded-md mb-2">
        <div className="h-36 sm:h-56 md:h-20 w-full md:w-20"></div>
        <span className="flex-1 flex flex-col gap-2">
          <div className="h-6 max-w-72"></div>
          <div className="h-4 max-w-28"></div>
          <div className="h-4 max-w-36"></div>
        </span>
        <span className="w-full md:w-fit flex flex-col md:items-center gap-4">
          <div className="h-8 w-full md:w-32"></div>
          <div className="h-4 w-full md:w-28"></div>
        </span>
      </article>
    </div>
  );
}

export default OrderSkeleton;
