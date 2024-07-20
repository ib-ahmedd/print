import { CheckOutForm, Order } from "./components";

function Checkout() {
  return (
    <main className="bg-gray-100">
      <section className="flex-col py-20">
        <h1 className="font-normal text-4xl mb-8">Checkout</h1>
        <div className="flex flex-col md:flex-row justify-between">
          <CheckOutForm />
          <Order />
        </div>
      </section>
    </main>
  );
}

export default Checkout;
