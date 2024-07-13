function ProductSkeleton() {
  return (
    <article className="loading w-full sm:w-[32%] md:w-[23.5%] flex flex-col items-center gap-4 mb-8">
      <div className="w-full h-64"></div>
      <div className="w-1/5 h-4"></div>
      <div className="w-4/5 h-5"></div>
      <div className="w-2/3 h-5"></div>
      <div className="w-1/3 h-5"></div>
    </article>
  );
}

export default ProductSkeleton;
