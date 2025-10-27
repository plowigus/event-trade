import Image from "next/image";
import { fetchFooterData } from "../../../../lib/function";

export default async function FooterSectionSimply() {
  const data = await fetchFooterData();

  const emails = data.contactSection.emails;

  // Podziel tytuł po słowie "imprez"
  const titleParts = data.mainSection.title.split("imprez");
  const firstPart = titleParts[0] + "imprez"; // Pierwsza część + "imprez"
  const secondPart = titleParts[1] ? titleParts[1].trim() : ""; // Druga część (miasta)

  return (
    <div className="w-full h-auto bg-black py-16">
      <p className="uppercase font-museo text-white tracking-widest text-center">
        Zadzwoń lub napisz do nas:
      </p>
      <div className="grid grid-cols-9 px-8 w-full  text-white  mt-16 gap-6">
        <div className="col-span-3 flex justify-center items-start relative rounded-xl ">
          <span className="text-white font-museo tracking-widest text-2xl uppercase ">
            {data.mainSection.text}
          </span>
        </div>
        <div className="col-span-3 rounded-xl ">
          <div className="flex flex-col justify-start items-center h-full">
            {/* Address Section */}
            <div className="flex">
              <div className="">
                <Image
                  src={data.addressSection.mainImage.url}
                  alt={data.addressSection.mainImage.alt}
                  width={50}
                  height={50}
                />
              </div>
              <div className="text-lg font-museo ml-8 tracking-widest uppercase">
                <p>{data.addressSection.detailedAddress.street}</p>
                <p>{data.addressSection.detailedAddress.city}</p>
                <p>{data.addressSection.detailedAddress.zip}</p>
              </div>
            </div>

            <div className="flex mt-8">
              <div className="">
                <Image
                  src={data.addressSection.hoursImage.url}
                  alt={data.addressSection.hoursImage.alt}
                  width={50}
                  height={50}
                />
              </div>
              <div className="text-lg font-museo ml-8 tracking-widest uppercase">
                <p>{data.addressSection.address}</p>
                <p>{data.addressSection.hours}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3  relative rounded-xl overflow-hidden">
          <div className="">
            {emails.map((email, index) => {
              return (
                <p
                  key={index}
                  className="text-white font-museo tracking-widest text-lg mb-1 uppercase "
                >
                  {email}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className="text-center text-white font-museo tracking-[4px] uppercase mt-16">
        {firstPart}
        <br />
        {secondPart}
      </div>
    </div>
  );
}
