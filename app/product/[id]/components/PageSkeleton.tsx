function PageSkeleton() {
  return (
    <section className="flex-col gap-12 py-20 px-4 md:px-8 xl:px-24 bg-white">
      <div className="flex flex-col md:flex-row gap-8 loading">
        <div className="md:flex-1 w-full md:w-[unset] h-[23em] md:h-[25em] lg:h-[27em]"></div>
        <span className="loading flex-1 h-full flex flex-col gap-4">
          <div className="w-4/5 h-8"></div>
          <div className="w-2/5 h-6"></div>
          <div className="w-full h-4 mt-4"></div>
          <div className="w-full h-4"></div>
          <div className="w-1/2 h-4"></div>
          <span className="flex gap-4 mt-4">
            <div className="w-28 h-10"></div>
            <div className="w-40 h-10"></div>
          </span>
          <div className="w-1/2 h-4 mt-8"></div>
        </span>
      </div>
      <div className="loading w-full flex flex-col gap-4 pt-8">
        <div className="w-full h-4"></div>
        <div className="w-1/3 h-4"></div>
      </div>
    </section>
  );
}

export default PageSkeleton;
