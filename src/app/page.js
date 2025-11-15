import Hero from "./components/HeroSection/Hero";
import SeasonFull from "./components/Seasons/SeasonFull";
import { getGreekSection } from "../../lib/queries";
import EventCarousel from "./components/EventSection/EventCarousel";
import OffertSecion from "./components/OffertSecion/OffertSecion";
import AboutSecion from "./components/AboutSection/AboutSection";
import CompanyEvent from "./components/CompanyEvent/CompanyEvent";
import OurClientsMain from "./components/OurClients/OurClientsMain";
import BlogSection from "./components/BlogSection/BlogSection";
import FooterSection from "./components/FooterSection/FooterSection";

export default async function Home() {
  const data = await getGreekSection();

  return (
    <div className="bg-black h-auto">
      <Hero />
      <SeasonFull data={data} />
      <EventCarousel />
      <OffertSecion />
      <AboutSecion />
      <CompanyEvent />
      <BlogSection />
      <OurClientsMain />
      <FooterSection />
    </div>
  );
}
