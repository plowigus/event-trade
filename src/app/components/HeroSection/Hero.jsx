import Image from "next/image";
import { getHeroData, getHeroText } from "../../../../lib/queries";
import AnimatedGradients from "./AnimatedGradients";
import Header from "../Header";

export default async function Hero() {
  // Pobieramy dane z ACF dla sekcji Hero
  // Całe logika pobierania danych jest w lib/queries.js
  const heroData = await getHeroData();
  const heroText = await getHeroText();
  // Test: wyświetlamy dane w konsoli
  // console.log(heroData.page.heroSection);
  //  Tworzymy nową zmienną heroSection, która będzie przechowywać dane sekcji Hero
  const heroSection = heroData.page.heroSection;
  const heroImageUrl = heroSection.heroImage?.node?.filePath;
  const textPath = heroText.page.heroTextSection;
  // console.log(textPath);

  //TODO: dodać obsługę braku obrazka
  //TODO: Zrobić env.local dla adresu strony
  const websiteUrl = "https://mateiko.pl";

  // console.log(websiteUrl + heroImageUrl);

  return (
    <>
      <div className="w-full h-lvh relative">
        <section className=" h-[60%] w-full ">
          <div className="absolute top-0 left-0 right-0 h-full w-full shadow-bg z-10"></div>
          <Header />

          {/* Next.js Image component */}
          {heroImageUrl && (
            <Image
              src={websiteUrl + heroImageUrl}
              alt={heroSection.heroBackgroundAlt}
              fill
              className="object-cover object-top"
              style={{ zIndex: 0 }}
              priority
              sizes="100vw"
            />
          )}

          {/* Content overlay - zwiększony z-index */}
          <div className="flex flex-col items-center justify-center h-full relative z-11">
            <div className="text-center text-white px-4">
              <h1 className="grid grid-cols-12 text-[40px] sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-museo tracking-[0.1em] sm:tracking-[0.2em] lg:tracking-[12px] uppercase leading-tight">
                <span className="text-outline text col-span-12 sm:col-span-10 sm:col-start-2 lg:col-span-8 lg:col-start-1">
                  {heroSection.heroSectionTilteFirst}
                </span>
                <span className="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-6 lg:col-start-4">
                  {heroSection.heroSectionTilteSecond}
                </span>
              </h1>
            </div>
          </div>
        </section>

        <section className="absolute bottom-0 z-10 h-[40%] w-full gradient-section ">
          <div className="w-full h-full">
            <AnimatedGradients />
            <div className="w-full h-full grid grid-cols-12 gap-4 items-center justify-items-center text-center text-white py-7 relative z-10">
              <div className="col-span-10 col-start-2 lg:col-span-8 lg:col-start-3 xl:col-span-8 xl:col-start-3 space-y-4 lg:space-y-6 px-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-4xl font-museo tracking-wide">
                  {textPath.title}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed opacity-90 font-museo max-w-prose mx-auto">
                  {textPath.subText}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
