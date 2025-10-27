//  src/app/(pages)/oferta/[slug]/page.js
import { notFound } from "next/navigation";
import FooterSection from "@/app/components/ContactSection/FooterCardOnly";
import { fetchOfferBySlug, fetchOfferPosts } from "../../../../../lib/function";
import OfferDetail from "./components/OfferDetail";

export default async function SingleOfferPage({ params }) {
  const { slug } = await params;

  if (!slug || typeof slug !== "string") {
    notFound();
  }

  // Pobierz konkretną ofertę
  const offer = await fetchOfferBySlug(slug);

  if (!offer) {
    notFound();
  }

  return (
    <>
      <OfferDetail offer={offer} />
      <FooterSection />
    </>
  );
}

// Generate static paths for all offers
export async function generateStaticParams() {
  const offerData = await fetchOfferPosts();

  return offerData.offers.map((offer) => ({
    slug: offer.slug,
  }));
}

// Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (!slug || typeof slug !== "string") {
    return {
      title: "Oferta nie znaleziona",
    };
  }

  const offer = await fetchOfferBySlug(slug);

  if (!offer) {
    return {
      title: "Oferta nie znaleziona",
    };
  }

  return {
    title: `${offer.title} | Event Trade`,
    description: offer.content.subtitle
      ? offer.content.subtitle.substring(0, 160) + "..."
      : `${offer.title} - profesjonalne usługi eventowe`,
    openGraph: {
      title: `${offer.title} | Event Trade`,
      description: offer.content.subtitle?.substring(0, 160),
      images:
        offer.content.images.length > 0
          ? [{ url: offer.content.images[0].url }]
          : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${offer.title} | Event Trade`,
      description: offer.content.subtitle?.substring(0, 160),
      images:
        offer.content.images.length > 0 ? [offer.content.images[0].url] : [],
    },
  };
}
