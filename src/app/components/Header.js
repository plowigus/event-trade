import Link from "next/link";
import { getHeroData } from "../../../lib/queries";
import Hamburger from "./HeroSection/Hamburger";
import Image from "next/image";

const heroData = await getHeroData();
const heroSection = heroData.page.heroSection;
const logoImageUrl = heroSection.heroLogoHeader.node.filePath;

const websiteUrl = "https://mateiko.pl";

export default async function Header() {
  return (
    <>
      <div className="z-30 p-8 flex items-center justify-between m-auto text-white relative container">
        <div className="">
          <Link href="/" className="inline-block">
            <Image
              src={websiteUrl + logoImageUrl} // lub dynamicznie z ACF
              alt="Logo firmy - powrót na stronę główną"
              width={160}
              height={80}
              priority
              className="cursor-pointer"
            />
          </Link>
        </div>
        <div className="w-[5rem] z-[1000000]">
          <Hamburger />
        </div>
      </div>
    </>
  );
}
