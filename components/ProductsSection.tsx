import Product from "./Product";
import { ProductsType } from "@types";
import ProductSkeleton from "./ProductSkeleton";

function ProductsSection({
  heading,
  products,
  loading,
  skeletonCount,
}: ProductsProps) {
  const skeletonArray = [];
  for (let i = 0; i < skeletonCount; i++) {
    skeletonArray.push(i);
  }
  return (
    <section className="w-full flex flex-col gap-16 items-center py-20">
      <h2 className="center_border pb-3">{heading}</h2>
      <div className="w-full flex flex-col sm:flex-row justify-between flex-wrap">
        {loading &&
          skeletonArray.map((item) => <ProductSkeleton key={item} notShop />)}
        {!loading &&
          products.map((item) => <Product key={item._id} {...item} notShop />)}
      </div>
    </section>
  );
}

interface ProductsProps {
  heading: string;
  products: ProductsType[];
  loading: boolean;
  skeletonCount: number;
}

export default ProductsSection;
