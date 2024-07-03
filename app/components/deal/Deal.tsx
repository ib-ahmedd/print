import { GenericLink } from "@components";
import Link from "next/link";

function Deal() {
  return (
    <section className="deal_sec relative py-20 lg:py-32 bg-deal-bg bg-cover bg-center md:bg-top lg:bg-center lg:bg-fixed lg:px-32">
      <article className="z-10 flex flex-col gap-4">
        <h2 className="text-2xl md:text-4xl mb-8 md:mb-0 font-bold text-site-blue leading-relaxed md:leading-relaxed">
          Hurry Up!
          <br />
          Deal of the Day!
        </h2>
        <p className="md:text-lg font-bold text-site-blue">
          Buy This T-shirt At 20% Discount, Use Code Off20
        </p>
        <GenericLink path="" title="SHOP NOW" />
      </article>
    </section>
  );
}

export default Deal;
