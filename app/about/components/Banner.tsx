import { GenericLink } from "@components";

function Banner() {
  return (
    <section className="w-full flex flex-col md:flex-row justify-between items-center py-12 bg-site-orange">
      <h2 className="text-white text-center md:text-left text-2xl md:text-3xl ">
        Get Best Offers On Customized Designs!
      </h2>
      <GenericLink path="/shop" title="GET STARTED" border={true} />
    </section>
  );
}

export default Banner;
