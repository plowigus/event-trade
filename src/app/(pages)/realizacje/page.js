import FooterSection from "@/app/components/ContactSection/FooterCardOnly";
import Header from "@/app/components/Header";
import Link from "next/link";
import Image from "next/image";
import {
  fetchRealizationData,
  fetchRealizationsByTag,
  fetchRealizationsByCompany,
  getRealizationTags,
} from "../../../../lib/function";

export default async function RealizacjePage() {
  const realizationData = await fetchRealizationData();

  return (
    <>
      <div className="bg-black min-h-screen w-full relative">
        <Header />

        <div className="container mx-auto px-8 py-20 text-white">
          <h1 className="text-4xl font-bold mb-12 text-center">
            Nasze Realizacje
          </h1>

          <p className="text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            Poznaj nasze najlepsze projekty eventowe - od konferencji po
            premiery produktów:
          </p>

          {/* Lista realizacji */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {realizationData.realizations.map((realization) => (
              <div
                key={realization.id}
                className="group bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#C0368B]/20 flex flex-col h-full"
              >
                {/* Hero Image */}
                <div className="relative h-80 overflow-hidden">
                  {realization.heroImage ? (
                    <Image
                      src={realization.heroImage}
                      alt={realization.heroText}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1023px) calc(50vw - 48px), calc(25vw - 32px)"
                    />
                  ) : (
                    <div className="w-full h-auto bg-gradient-to-br from-[#53A7B2] to-[#C0368B] flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">
                        {realization.heroText.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>

                  {/* Company badge - klikalne do strony firmy */}
                  <div className="absolute top-3 left-3">
                    <Link
                      href={`/realizacje/${realization.company}`}
                      className="px-3 py-1 bg-[#C0368B]/90 hover:bg-[#C0368B] text-white text-sm font-medium rounded-full capitalize transition-colors"
                    >
                      {realization.companyName}
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col h-auto">
                  {/* Hero Text - klikalny do posta */}
                  <Link
                    href={`/realizacje/${realization.company}/${realization.slug}`}
                    className="text-xl font-bold text-white mb-2 hover:text-[#C0368B] transition-colors line-clamp-2 block"
                  >
                    {realization.heroText}
                  </Link>

                  {/* Tagi */}
                  <div className="mb-4 h-5">
                    {realization.tags.length > 0 ? (
                      <div className="text-[#53A7B2] text-xs">
                        {realization.tags
                          .slice(0, 4)
                          .map((tag) => tag.name)
                          .join(" / ")}
                      </div>
                    ) : (
                      <div className="h-5"></div>
                    )}
                  </div>

                  {/* Description - zawsze 3 linie */}
                  <div className="text-gray-400 text-sm mb-4  overflow-hidden">
                    {realization.content ? (
                      <p className="line-clamp-3">
                        {realization.content.substring(0, 120)}...
                      </p>
                    ) : (
                      <div className="h-12"></div>
                    )}
                  </div>

                  {/* Link do realizacji - zawsze na dole */}
                  <Link
                    href={`/realizacje/${realization.company}/${realization.slug}`}
                    className="text-[#C0368B] hover:text-white transition-colors text-sm font-semibold inline-block "
                  >
                    Zobacz realizację →
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
    title: "Realizacje - Event Trade",
    description:
      "Zobacz nasze najlepsze realizacje eventów - konferencje, gale, eventy firmowe i premiery produktów. Ponad 100 zrealizowanych projektów.",
    openGraph: {
      title: "Realizacje - Event Trade",
      description:
        "Zobacz nasze najlepsze realizacje eventów - konferencje, gale, eventy firmowe i premiery produktów.",
    },
  };
}
