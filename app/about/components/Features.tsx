import { featuresArray } from "../constants";

function Features() {
  return (
    <section className="justify-between flex-wrap py-8 md:py-16 bg-gray-100">
      {featuresArray.map((item) => (
        <article className="w-full sm:w-[46%] md:w-[23%] flex flex-col items-center text-center gap-4 pb-8 md:pb-0">
          <img src={item.image} alt={item.title} className="w-12 opacity-60" />
          <h4 className="text-xl font-bold">{item.title}</h4>
          <p>
            It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </article>
      ))}
    </section>
  );
}

export default Features;
