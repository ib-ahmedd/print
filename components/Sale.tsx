function Sale({ style }: { style: number }) {
  return (
    <p
      className={`absolute z-10 -top-2 flex items-center justify-center rounded-full  ${
        style === 1 &&
        "w-9 h-9 text-sm border-site-orange bg-white border -right-2"
      } ${style === 2 && "w-11 h-11 bg-site-orange text-white  -right-2"} ${
        style === 3 &&
        "text-sm md:text-lg w-10 md:w-12 h-10 md:h-12 -left-2 bg-site-orange text-white"
      }`}
    >
      Sale!
    </p>
  );
}

export default Sale;
