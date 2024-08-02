import CardSkeleton from "./CardSkeleton";

function PageSkeleton() {
  return (
    <div className="w-full loading p-2 flex flex-col gap-4">
      <span className="flex flex-col gap-2">
        <div className="w-[15em] h-6"></div>
        <div className="w-[7em] h-4"></div>
        <div className="w-[15em] h-4"></div>
        <div className="w-[5em] h-4"></div>
      </span>
      <div className="w-[17em] h-6"></div>
      <span className="w-full flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-[7em] h-[20em] sm:h-[30em] md:h-[7em]"></div>
        <span className="flex-1 flex flex-col gap-2">
          <div className="w-[13em] h-4"></div>
          <div className="w-[10em] h-4"></div>
          <div className="w-[7em] h-4"></div>
          <div className="w-[8em] h-4"></div>
        </span>
        <span className="flex flex-col items-center gap-2">
          <div className="w-full md:w-[9em] h-8"></div>
          <div className="w-[9em] h-4"></div>
        </span>
      </span>
      <span className="flex flex-col md:flex-row justify-between">
        <CardSkeleton />
        <CardSkeleton />
      </span>
    </div>
  );
}

export default PageSkeleton;
