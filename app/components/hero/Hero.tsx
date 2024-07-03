import { GenericLink } from "@components";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function Hero() {
  return (
    <section className="flex-col md:flex-row items-center md:items-start bg-gradient-to-b md:bg-gradient-to-r from-[#FFFFFF00] to-[#EBEDEFDE] md:justify-between gap-12">
      <div className="flex-1 flex flex-col gap-4 py-8 lg:py-32">
        <h2 className="font-bold text-lg text-site-blue w-fit pt-6 half_border">
          Best quality products
        </h2>
        <h1 className="text-4xl slg:text-6xl font-bold text-site-blue leading-[1.3] slg:leading-[1.3]">
          We Print What
          <br className="hidden xl:block" /> You Want!
        </h1>
        <p className="text-site-blue">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint
          assumenda in aut tempora voluptate suscipit.
        </p>
        <GenericLink path="/shop" title="GET STARTED" />
      </div>
      <div className="w-full md:w-1/2 lg:w-fit h-full flex lg:shrink-0 items-end self-end justify-center md:justify-end lg:justify-start">
        <img
          src="/images/home/hero/hero.png"
          alt="hero"
          className="object-contain w-[75%] lg:w-full"
        />
      </div>
    </section>
  );
}

export default Hero;
