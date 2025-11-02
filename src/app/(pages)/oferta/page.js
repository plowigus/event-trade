import FooterSection from "@/app/components/ContactSection/FooterCardOnly";
import Header from "@/app/components/Header";
import { fetchOfferPosts } from "../../../../lib/function";
import OfferSearch from "./components/OfferSearch";

export default async function OfertaPage() {
  const offerData = await fetchOfferPosts();

  return (
    <>
      <div className="bg-black min-h-screen w-full relative">
        <Header />
        <OfferSearch offers={offerData.offers} />
      </div>
      <FooterSection />
    </>
  );
}

export async function generateMetadata() {
  return {
    title: "Oferta - Event Trade",
    description:
      "Zobacz naszą pełną ofertę usług eventowych - organizacja bankietów, konferencji, gal firmowych i eventów specjalnych.",
    openGraph: {
      title: "Oferta - Event Trade",
      description:
        "Kompleksowa oferta usług eventowych - bankiety, konferencje, gale firmowe.",
    },
  };
}
