function CardSkeleton() {
  return (
    <article className="w-full md:w-[49%] flex flex-col gap-2 border p-2 rounded-md mb-2">
      <div className="w-[15em] h-6"></div>
      <span className="flex flex-col gap-2">
        <div className="w-[10em] h-5"></div>
        <div className="w-[12em] h-4"></div>
      </span>
      <span className="flex flex-col gap-2">
        <div className="w-[10em] h-5"></div>
        <div className="w-[12em] h-4"></div>
        <div className="w-[11em] h-4"></div>
      </span>
    </article>
  );
}

export default CardSkeleton;
