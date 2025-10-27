import FooterSection from "@/app/components/ContactSection/FooterCardOnly";
import Header from "@/app/components/Header";
import Link from "next/link";
import Image from "next/image";
import { fetchOfferPosts } from "../../../../lib/function";

export default async function OfertaPage() {
  const offerData = await fetchOfferPosts();

  return (
    <>
      <div className="bg-black min-h-screen w-full relative">
        <Header />

        <div className="container mx-auto px-8 py-20 text-white">
          <h1 className="text-4xl font-bold mb-12 text-center">Nasza Oferta</h1>

          <p className="text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            Poznaj nasze usługi eventowe - od bankietów po konferencje
            biznesowe:
          </p>

          {/* Lista ofert */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {offerData.offers.map((offer) => (
              <div
                key={offer.id}
                className="group bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#C0368B]/20 flex flex-col h-full"
              >
                {/* Hero Image */}
                <div className="relative h-80 overflow-hidden">
                  {offer.content.images.length > 0 ? (
                    <Image
                      src={offer.content.images[0].url}
                      alt={offer.content.images[0].alt || offer.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1023px) calc(50vw - 48px), calc(33vw - 32px)"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#53A7B2] to-[#C0368B] flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">
                        {offer.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>

                  {/* Service type badge */}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col h-full">
                  {/* Title - klikalny do oferty */}
                  <Link
                    href={`/oferta/${offer.slug}`}
                    className="text-xl font-bold text-white mb-2 hover:text-[#C0368B] transition-colors line-clamp-2 block"
                  >
                    {offer.title}
                  </Link>

                  {/* Subtitle */}
                  <div className="mb-4 h-5">
                    {offer.content.subtitle && (
                      <div
                        className="text-[#53A7B2] text-xs"
                        dangerouslySetInnerHTML={{
                          __html: offer.content.subtitle,
                        }}
                      />
                    )}
                  </div>

                  {/* Description - bold text */}
                  <div className="text-gray-400 text-sm mb-4 flex-grow overflow-hidden">
                    {offer.content.boldText ? (
                      <div
                        className="line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: offer.content.boldText,
                        }}
                      />
                    ) : (
                      <div className="h-12"></div>
                    )}
                  </div>

                  {/* Link do oferty - zawsze na dole */}
                  <Link
                    href={`/oferta/${offer.slug}`}
                    className="text-[#C0368B] hover:text-white transition-colors text-sm font-semibold inline-block mt-auto"
                  >
                    Zobacz ofertę →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
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
