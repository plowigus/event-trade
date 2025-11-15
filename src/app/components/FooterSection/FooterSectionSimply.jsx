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
      <div className="grid grid-cols-12 lg:grid-cols-9 px-4 md:px-8 w-full text-white mt-16 gap-6">
        <div className="col-span-12 lg:col-span-3 flex justify-start items-start relative rounded-xl h-auto lg:h-auto">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Image
                src="/images/tel.png"
                alt="Telefon"
                width={50}
                height={50}
              />
            </div>
            <div
              className="text-lg font-museo ml-8 tracking-widest uppercase flex items-center"
              style={{ minHeight: "50px" }}
            >
              <span className="text-white">{data.mainSection.text}</span>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3 rounded-xl h-auto lg:h-auto">
          <div className="flex flex-col justify-start items-start h-full">
            {/* Address Section */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
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

            <div className="flex items-start mt-8">
              <div className="flex-shrink-0">
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
        <div className="col-span-12 lg:col-span-3 relative rounded-xl overflow-hidden h-auto lg:h-auto flex justify-start">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Image
                src="/images/koperta.png"
                alt="Email"
                width={50}
                height={50}
              />
            </div>
            <div className="ml-8 text-lg font-museo tracking-widest uppercase">
              {emails.map((email, index) => {
                return (
                  <p key={index} className="text-white mb-1">
                    {email}
                  </p>
                );
              })}
            </div>
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
