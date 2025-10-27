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
      <div className="text-center text-white font-museo tracking-[4px] uppercase mt-16">
        {firstPart}
        <br />
        {secondPart}
      </div>
    </div>
  );
}
