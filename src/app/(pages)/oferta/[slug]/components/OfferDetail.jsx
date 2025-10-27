// src/app/(pages)/oferta/[slug]/components/OfferDetail.jsx
import Header from "@/app/components/Header";
import Image from "next/image";
import Link from "next/link";

export default function OfferDetail({ offer, relatedRealizations }) {
  if (!offer) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl mb-4">Oferta nie znaleziona</h1>
          <Link href="/oferta" className="text-[#C0368B] hover:text-white">
            ← Powrót do oferty
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* 1. Hero Section */}
      <div className="bg-black h-screen w-full relative">
        <div className="absolute top-0 left-0 right-0 h-full w-full shadow-bg z-10"></div>
        <Header />

        {/* Hero Image */}
        {offer.content.images.length > 0 ? (
          <Image
            src={offer.content.images[0].url}
            alt={offer.content.images[0].alt || offer.title}
            fill
            priority
            className="object-cover absolute top-0 left-0 z-0"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#53A7B2] to-[#C0368B] z-0"></div>
        )}

        <div
          style={{ height: "calc(100vh - 144px)" }}
          className="flex flex-col items-center justify-center relative z-11"
        >
          <div className="text-center text-white max-w-4xl mx-auto px-8">
            <h1 className="text-6xl lg:text-8xl font-museo tracking-[8px] uppercase mb-8">
              <span className="text-outline">
                {offer.content.heading ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: offer.content.heading }}
                  />
                ) : (
                  offer.title
                )}
              </span>
            </h1>
            {offer.content.subtitle && (
              <div
                className="text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto"
                dangerouslySetInnerHTML={{ __html: offer.content.subtitle }}
              />
            )}
          </div>
        </div>
      </div>

      {/* 2. Bold Text Section */}
      {offer.content.boldText && (
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div
                className="text-xl lg:text-2xl text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: offer.content.boldText }}
              />
            </div>
          </div>
        </section>
      )}

      {/* 3. First Section */}
      {offer.content.firstSection && (
        <section className="py-20 lg:py-32 bg-gray-900">
          <div className="container mx-auto px-8">
            <div className="max-w-5xl mx-auto">
              <div
                className="text-lg text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: offer.content.firstSection }}
              />
            </div>
          </div>
        </section>
      )}

      {/* 4. Second Section */}
      {offer.content.secondSection && (
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-8">
            <div className="max-w-5xl mx-auto">
              <div
                className="text-lg text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: offer.content.secondSection,
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* 5. Box Section - CTA */}
      {offer.content.boxSection.title && (
        <section className="py-20 lg:py-32 bg-gradient-to-r from-[#53A7B2] to-[#C0368B]">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                <div
                  dangerouslySetInnerHTML={{
                    __html: offer.content.boxSection.title,
                  }}
                />
              </h3>

              {offer.content.boxSection.text && (
                <div
                  className="text-lg text-white/90 mb-8 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: offer.content.boxSection.text,
                  }}
                />
              )}

              {offer.content.boxSection.cta && (
                <Link
                  href="/kontakt"
                  className="inline-block bg-white text-[#C0368B] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: offer.content.boxSection.cta,
                    }}
                  />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 6. Question & Features List */}
      {offer.content.questionTitle && offer.content.listItems.length > 0 && (
        <section className="py-20 lg:py-32 bg-black">
          <div className="container mx-auto px-8">
            <div className="max-w-6xl mx-auto">
              {/* Question Title */}
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: offer.content.questionTitle,
                    }}
                  />
                </h2>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {offer.content.listItems.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="bg-gray-900 p-8 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    {item.title && (
                      <h3 className="text-xl font-bold text-[#C0368B] mb-4">
                        <div dangerouslySetInnerHTML={{ __html: item.title }} />
                      </h3>
                    )}

                    {item.text && (
                      <div
                        className="text-gray-300 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.text }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. Related Realizations Section */}
      {relatedRealizations?.relatedRealizations?.length > 0 && (
        <section className="py-20 lg:py-32 bg-gray-900">
          <div className="container mx-auto px-8">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Nasze realizacje w tej kategorii
                </h2>
                <p className="text-xl text-gray-300">
                  Zobacz przykłady podobnych projektów które zrealizowaliśmy
                </p>
                {relatedRealizations.offerTags?.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mt-6">
                    <span className="text-gray-400 text-sm mr-2">Tagi oferty:</span>
                    {relatedRealizations.offerTags.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-[#C0368B] text-white px-3 py-1 rounded-full text-sm"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Realizations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedRealizations.relatedRealizations.map((realization) => (
                  <Link
                    key={realization.id}
                    href={`/realizacje/${realization.company}/${realization.slug}`}
                    className="group bg-black rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      {realization.heroImage ? (
                        <Image
                          src={realization.heroImage}
                          alt={realization.heroText || realization.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#53A7B2] to-[#C0368B] flex items-center justify-center">
                          <span className="text-white text-xl font-bold">
                            {realization.companyName}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[#C0368B] text-sm font-semibold uppercase tracking-wider">
                          {realization.companyName}
                        </span>
                        {realization.matchedTags?.length > 0 && (
                          <span className="text-[#53A7B2] text-xs">
                            {realization.matchedTags.length} wspólnych tagów
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-white text-lg font-bold mb-3 group-hover:text-[#C0368B] transition-colors">
                        {realization.heroText || realization.title}
                      </h3>

                      {/* Matched Tags */}
                      {realization.matchedTags?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {realization.matchedTags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
                            >
                              #{tag.name}
                            </span>
                          ))}
                          {realization.matchedTags.length > 3 && (
                            <span className="text-gray-500 text-xs px-2 py-1">
                              +{realization.matchedTags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <span className="text-[#53A7B2] text-sm font-medium group-hover:text-white transition-colors">
                        Zobacz realizację →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center mt-12">
                <Link
                  href="/realizacje"
                  className="inline-block border border-[#C0368B] text-[#C0368B] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#C0368B] hover:text-white transition-colors"
                >
                  Zobacz wszystkie realizacje
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 8. Contact CTA */}
      <section className="py-20 lg:py-32 bg-gray-900">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Zainteresowany naszą ofertą?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Skontaktuj się z nami i omówmy szczegóły Twojego wydarzenia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="bg-[#C0368B] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#53A7B2] transition-colors"
              >
                Skontaktuj się z nami
              </Link>
              <Link
                href="/realizacje"
                className="border border-[#C0368B] text-[#C0368B] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#C0368B] hover:text-white transition-colors"
              >
                Zobacz nasze realizacje
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
