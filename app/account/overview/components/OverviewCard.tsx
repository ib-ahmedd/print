function OverviewCard({ heading, subheading, info }: OverviewCardProps) {
  return (
    <article className="border w-full slg:w-1/2 min-h-[13em] rounded-md">
      <h2 className="text-base md:text-lg lg:text-xl font-medium w-full p-2 border-b">
        {heading}
      </h2>
      <div className="p-2">
        <h3 className="">{subheading}</h3>
        {info.map((item) => (
          <p key={item} className="text-gray-400 text-sm md:text-base">
            {item}.
          </p>
        ))}
      </div>
    </article>
  );
}

interface OverviewCardProps {
  heading: string;
  subheading: string;
  info: string[];
}

export default OverviewCard;
