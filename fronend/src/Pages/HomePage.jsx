import HomeHero from "../Components/Hero's/HomeHero";
import PopularCategories from "../Components/Home/Categories/PopularCategories";
import Reminder from "../Components/Home/Extra/Reminder";
import FlashSale from "../Components/Home/FlashSale/FlashSale";
import ForYou from "../Components/Home/ForYou/ForYou";
import Marque from "../Components/Home/Marquee/Marquee";
import { UseScrollTop } from "../Hooks/useScrollTop";

const HomePage = () => {
  return (
    <div className="grid gap-y-14">
      <UseScrollTop />
      <div className="xl:mt-">
        <Marque />
        <HomeHero />
      </div>
      <FlashSale />
      <PopularCategories />
      <ForYou />
      <div className="pb-10">
        <Reminder />
      </div>
    </div>
  );
};

export default HomePage;
