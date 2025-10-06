import Header from "@/app/components/Header";
import FooterCardOnly from "@/app/components/ContactSection/FooterCardOnly";
import ContactSection from "@/app/components/ContactSection/ContactSection";
import FooterMin from "@/app/components/ContactSection/FooterMin";

export default async function KontaktPage() {
  return (
    <>
      <div className="bg-black w-full">
        <Header />
        <div className="font-museo text-white text-center">
          <p className="text-8xl uppercase tracking-widest">Kontakt</p>
          <p className="text-2xl uppercase tracking-widest mt-4">
            Zadzwoń, napisz LUB WYPEŁNIJ PONIŻSZY BRIEF
          </p>
        </div>
      </div>
      <FooterCardOnly />
      <ContactSection />
      <FooterMin />
    </>
  );
}

export async function generateMetadata() {
  return {
    title: "Kontakt - Event Trade",
    description:
      "Skontaktuj się z nami i omów szczegóły swojego wydarzenia. Organizujemy konferencje, imprezy firmowe i eventy marketingowe.",
    openGraph: {
      title: "Kontakt - Event Trade",
      description: "Skontaktuj się z nami i omów szczegóły swojego wydarzenia.",
    },
  };
}
