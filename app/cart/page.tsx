import { CartTotals, ProductsTable } from "./components";

function Cart() {
  return (
    <main>
      <section className="flex-col bg-gray-100 py-20">
        <ProductsTable />
        <CartTotals />
      </section>
    </main>
  );
}

export default Cart;
