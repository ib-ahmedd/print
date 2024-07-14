import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { aboutFavoritesArray } from "../constants";

function Favorites() {
  return (
    <section className="flex flex-col lg:flex-row justify-between gap-14 md:gap-8 py-20 md:py-32">
      <div className="w-full lg:w-1/2 xl:w-2/5 ">
        <h2 className="mb-4">We Are Your Favourite, Online Store.</h2>
        <p className="md:text-lg">
          Dui habitasse provident eu etiam praesent placeat maiores temporibus,
          accumsan parturient autem, mi animi ipsa. Lobortis maxime quos,
          pellentesq. <br />
          Ee platea animi commodo tincidunt ridiculus tempora, ornare lorem quam
          sit possimus? Quam cras facilisi officia fusce. Ac, excepteur
          excepteur fusce? Sunt minim expedita magnis!
        </p>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col md:flex-row flex-wrap justify-between">
        {aboutFavoritesArray.map((item) => {
          return (
            <article className="w-full md:w-[48%] flex flex-col items-center md:items-start text-center md:text-left mb-6">
              <span className="text-3xl text-site-orange-hover">
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-sm md:text-lg">
                We’ll generate a sitemap for your site, submit it to search
                engine is and track.
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Favorites;
