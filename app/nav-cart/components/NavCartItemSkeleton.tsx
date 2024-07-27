function NavCartItemSkeleton() {
  return (
    <article className="loading w-full flex gap-2 h-16 py-2 border-b">
      <div className="h-full w-12"></div>
      <span className="flex flex-col gap-2 h-full flex-1">
        <div className="h-4 w-1/2"></div>
        <div className="h-4 w-20"></div>
      </span>
      <div className="h-6 w-6"></div>
    </article>
  );
}

export default NavCartItemSkeleton;
