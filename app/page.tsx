import { Clients, Deal, Designs, Hero } from "./components";
import Featured from "./components/featured/Featured";

function Home() {
  return (
    <main>
      <Hero />
      <Designs />
      <Featured />
      <Deal />
      <Clients />
    </main>
  );
}

export default Home;
