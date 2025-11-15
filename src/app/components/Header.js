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
      <div className="z-30 p-4 md:p-8 flex items-center justify-between m-auto text-white relative container">
        <div className="">
          <Link href="/" className="inline-block">
            <Image
              src={websiteUrl + logoImageUrl}
              alt="Logo firmy - powrót na stronę główną"
              width={160}
              height={80}
              priority
              className="cursor-pointer w-32 sm:w-36 md:w-40 h-auto object-contain"
            />
          </Link>
        </div>
        <div className=" z-[1000000]">
          <Hamburger />
        </div>
      </div>
    </>
  );
}
