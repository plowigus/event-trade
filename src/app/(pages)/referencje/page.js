import FooterSection from "@/app/components/FooterSection/FooterSection";
import Image from "next/image";
import Header from "@/app/components/Header";

export default async function ReferencjePage() {
  return (
    <>
      <div className="bg-black">
        <Header />
      </div>
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
