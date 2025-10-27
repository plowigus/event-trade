import FooterSection from "@/app/components/FooterSection/FooterSection";
import Image from "next/image";
import Header from "@/app/components/Header";
import FooterMin from "@/app/components/ContactSection/FooterMin";
import ReferenceSection from "@/app/components/ReferenceSection/ReferenceSection";
import HeroRef from "@/app/components/ReferenceSection/HeroRef";

export default async function ReferencjePage() {
  return (
    <>
      <div className="bg-black h-auto w-full relative">
        <Header />
        <HeroRef />
      </div>
      <ReferenceSection />
      <FooterMin />
    </>
  );
}

export async function generateMetadata() {
  return {
    title: "Referencje - Event Trade",
    description:
      "Poznaj opinie klientów o Event Trade. 98% klientów poleca nas dalej. Zobacz referencje od Allegro, Microsoft, Audi i innych firm.",
    openGraph: {
      title: "Referencje - Event Trade",
      description:
        "Poznaj opinie klientów o Event Trade. 98% klientów poleca nas dalej.",
    },
  };
}
