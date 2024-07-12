import { Clients, Deal, Designs, Hero } from "./components";
import Featured from "./components/featured/Featured";
import MostLoved from "./components/most-loved/MostLoved";

function Home() {
  return (
    <main>
      <Hero />
      <Designs />
      <Featured />
      <Deal />
      <MostLoved />
      <Clients />
    </main>
  );
}

export default Home;
