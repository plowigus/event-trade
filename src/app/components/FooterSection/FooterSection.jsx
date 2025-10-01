import Image from "next/image";
import { fetchFooterData } from "../../../../lib/function";

export default async function FooterSection() {
  const data = await fetchFooterData();

  console.log(data.mainSection.title);
  const emails = data.contactSection.emails;

  // Podziel tytuł po słowie "imprez"
  const titleParts = data.mainSection.title.split("imprez");
  const firstPart = titleParts[0] + "imprez"; // Pierwsza część + "imprez"
  const secondPart = titleParts[1] ? titleParts[1].trim() : ""; // Druga część (miasta)
  console.log(firstPart);
  console.log(secondPart);

  return (
    <div className="w-full h-auto bg-black py-16">
      <p className="uppercase font-museo text-white tracking-widest text-center">
        Zadzwoń lub napisz do nas:
      </p>
      <div className="grid grid-cols-9 px-8 w-full h-[400px] text-white  mt-16 gap-6">
        <div className="col-span-3 footer-gradient-1 relative rounded-xl">
          {/* Nested grid wewnątrz kolumny z telefonem */}
          <div className="absolute inset-0 grid-rows-5 grid grid-cols-12 z-10">
            {/* Pasek z opacity o szerokości 9/12 col na oczach figury */}
            <div className="col-span-10 col-start-3 row-start-2 bg-[#c0368b94] h-auto p-4 text-right flex items-center justify-end">
              <span className="text-white font-museo tracking-widest text-2xl uppercase ">
                {data.mainSection.text}
              </span>
            </div>
          </div>
          <Image
            src={data.mainSection.image.url}
            alt={data.mainSection.image.alt}
            width={300}
            height={300}
            className="absolute bottom-0 left-0"
          />
        </div>
        <div className="col-span-3 rounded-xl footer-gradient-2">
          <div className="flex flex-col justify-center items-center h-full">
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
        <div className="col-span-3 footer-gradient-3 relative rounded-xl overflow-hidden">
          <div className="absolute inset-0 grid-rows-6 grid grid-cols-12 z-10">
            {/* Pasek z opacity o szerokości 9/12 col na oczach figury */}
            <div className="col-span-10 row-span-3  row-start-2 bg-[#f1b94a7a] h-auto  p-4 lex items-center justify-start">
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
              <p className="text-white font-museo tracking-widest text-lg mb-1 uppercase">
                {data.contactSection.logo}
              </p>
            </div>
          </div>

          <Image
            src={data.contactSection.mailImage.url}
            alt={data.contactSection.mailImage.alt}
            width={350}
            height={350}
            className="absolute bottom-[-2px] right-[-5px]"
          />
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
