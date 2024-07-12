import Product from "./Product";
import { ProductsType } from "@types";

function ProductsSection({ heading, products }: ProductsProps) {
  return (
    <section className="flex flex-col gap-8 items-center py-20">
      <h2 className="center_border pb-3">{heading}</h2>
      <div className="flex flex-col sm:flex-row justify-between flex-wrap">
        {products.map((item) => (
          <Product key={item._id} {...item} />
        ))}
      </div>
    </section>
  );
}

interface ProductsProps {
  heading: string;
  products: ProductsType[];
}

export default ProductsSection;
