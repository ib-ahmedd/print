import { ReactNode } from "react";

function InfoCard({
  children,
  heading,
  subHeading1,
  subHeading2,
  desc,
}: InfoCardProps) {
  return (
    <article className="w-full md:w-[49%] border rounded-md">
      <h3 className="w-full border-b p-2 font-semibold">{heading}</h3>
      <div className="p-2">
        <h4 className="font-semibold">{subHeading1}</h4>
        <p>{desc}</p>
        <h4 className="font-semibold mt-4">{subHeading2}</h4>
        {children}
      </div>
    </article>
  );
}

interface InfoCardProps {
  children: ReactNode;
  heading: string;
  subHeading1: string;
  subHeading2: string;
  desc: string;
}

export default InfoCard;
