function ProductSkeleton({ notShop }: { notShop?: boolean }) {
  return (
    <article
      className={`loading w-[48%] sm:w-[32%] ${
        notShop && "md:w-[23.5%]"
      } flex flex-col items-center gap-4 mb-8`}
    >
      <div className="w-full h-52 sm:h-64"></div>
      <div className="w-1/5 h-4"></div>
      <div className="w-4/5 h-5"></div>
      <div className="w-2/3 h-5"></div>
      <div className="w-1/3 h-5"></div>
    </article>
  );
}

export default ProductSkeleton;
