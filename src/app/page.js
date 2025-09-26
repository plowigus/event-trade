import Hero from "./components/HeroSection/Hero";
import SeasonFull from "./components/Seasons/SeasonFull";
import { getGreekSection } from "../../lib/queries";
import EventCarousel from "./components/EventSection/EventCarousel";
import OffertSecion from "./components/OffertSecion/OffertSecion";
import AboutSecion from "./components/AboutSection/AboutSection";
import CompanyEvent from "./components/CompanyEvent/CompanyEvent";

export default async function Home() {
  const data = await getGreekSection();

  return (
    <>
      <Hero />
      <SeasonFull data={data} />
      <EventCarousel />
      <OffertSecion />
      <AboutSecion />
      <CompanyEvent />
    </>
  );
}
