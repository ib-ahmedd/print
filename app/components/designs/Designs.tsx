import { designsArray } from "@constants";

function Designs() {
  return (
    <section className="flex-col md:flex-row gap-8 lg:gap-12 py-32">
      {designsArray.map((item) => {
        return (
          <article
            key={item.title}
            className={`flex items-center gap-4 ${
              item.reverse ? "flex-col md:flex-col-reverse" : "flex-col"
            } `}
          >
            <img src={item.image} alt={item.title} />
            <div className="flex flex-col items-center gap-3">
              <h3 className=" text-site-blue">{item.title}</h3>
              <p className="text-lg lg:text-xl font-bold text-site-blue">
                {item.desc}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default Designs;
