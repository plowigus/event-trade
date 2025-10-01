import { getEventCompany } from "../../../../lib/queries";
import Image from "next/image";
import AnimatedGradients from "../HeroSection/AnimatedGradients";

export default async function CompanyEvent() {
  const data = await getEventCompany();
  const dataPath = data.page.companyEvent;
  const websiteUrl = "https://mateiko.pl";
  const imageUrl =
    websiteUrl + data.page.companyEvent.companyEventImg.node.filePath;

  return (
    <div className="w-full h-auto bg-black z-[40] relative">
      <AnimatedGradients />

      <div className="grid grid-cols-12 py-16">
        <div className="col-span-5 relative aspect-3/2">
          <Image
            src={imageUrl}
            alt={data.page.companyEvent.companyEventImgAlt || "Company Event"}
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>

        <div className="col-span-5 col-start-7 relative">
          <div className="flex flex-col justify-center h-full text-white font-museo tracking-widest">
            <p className="bg-[#53A7B2] py-4 text-2xl mb-6 p-2 uppercase">
              {dataPath.companyEventTitle}
            </p>

            <p className="text-2xl uppercase">
              {dataPath.companyEventSubtitle}
            </p>
            <p className="text-sm py-6 font-light">
              {dataPath.companyEventText}
            </p>
            <p className="text-sm pb-6 font-light">
              {dataPath.companyEventText2}
            </p>
            <p className="text-sm font-light">{dataPath.companyEventText3}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
