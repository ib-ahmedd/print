import { clientsArray, featuredInArray } from "@constants";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Clients() {
  return (
    <section className="flex-col items-center gap-8 md:gap-20 pt-20">
      <h2 className="center_border pb-3">Our Happy Clients!</h2>
      <div className="flex flex-col md:flex-row gap-8 md:gap-4 lg:gap-8">
        {clientsArray.map((item) => {
          return (
            <article
              key={item.clientName}
              className="flex flex-col gap-4 center_shadow p-8 rounded-2xl"
            >
              <p className="text-lg">
                "Lectus, nonummy et. Occaecat delectus erat, minima dapibus
                ornare nunc, autem."
              </p>
              <span className="text-site-orange">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </span>
              <div className="flex items-center gap-2">
                <img src={item.clientImage} alt={item.clientName} />{" "}
                <h3 className="font-bold">{item.clientName}</h3>
              </div>
            </article>
          );
        })}
      </div>

      <div className="w-full flex flex-col md:flex-row items-center gap-0 md:gap-12 justify-between mt-12">
        <h3 className="text-lg font-bold">Featured in:</h3>
        <div className="flex flex-1 justify-between flex-wrap md:flex-nowrap">
          {featuredInArray.map((item) => (
            <div className="relative logos_filter w-[45%] md:w-full">
              <img
                key={item.image}
                src={item.image}
                alt="featured brand logo"
                className="w-[80%]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Clients;
