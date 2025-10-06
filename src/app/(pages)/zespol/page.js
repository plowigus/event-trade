import Header from "@/app/components/Header";
import { fetchTeamHeroData } from "../../../../lib/function";
import Image from "next/image";
import FooterSectionSimply from "@/app/components/FooterSection/FooterSectionSimply";
import CompanyEvent from "@/app/components/CompanyEvent/CompanyEvent";
import AboutSecion from "@/app/components/AboutSection/AboutSection";
import TeamSection from "@/app/components/TeamSection/TeamSection";

export default async function ZespolPage() {
  const teamHeroData = await fetchTeamHeroData();

  return (
    <>
      <div className="bg-black h-screen w-full relative">
        <div className="absolute top-0 left-0 right-0 h-full w-full shadow-bg z-10"></div>
        <Header />
        <Image
          src={teamHeroData.heroImage.url}
          alt={teamHeroData.heroImage.alt}
          fill
          priority
          className="object-cover absolute top-0 left-0 z-0"
        />
        <div
          style={{ height: "calc(100vh - 144px)" }}
          className="flex flex-col items-center justify-center relative z-11"
        >
          <div className="text-center text-white">
            <h1 className="grid grid-cols-12 text-8xl font-museo tracking-[8px] uppercase ">
              <span className="text-outline text col-span-8">
                {teamHeroData.heroText.mainTitle}
              </span>
              <span className="col-span-9 col-start-4">
                {teamHeroData.heroText.subtitle}
              </span>
            </h1>
          </div>
        </div>
      </div>
      <TeamSection />
      <AboutSecion />
      <CompanyEvent />
      <FooterSectionSimply />
    </>
  );
}

export async function generateMetadata() {
  return {
    title: "Zespół - Event Trade",
    description:
      "Poznaj nasz zespół ekspertów od organizacji eventów. Kreatywni profesjonaliści z pasją do tworzenia niezapomnianych wydarzeń.",
    openGraph: {
      title: "Zespół - Event Trade",
      description: "Poznaj nasz zespół ekspertów od organizacji eventów.",
    },
  };
}
