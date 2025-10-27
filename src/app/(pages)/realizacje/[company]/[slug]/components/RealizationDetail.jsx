// src/app/(pages)/realizacje/[company]/[slug]/components/RealizationDetail.jsx
import Header from "@/app/components/Header";
import Image from "next/image";
import Link from "next/link";
import RealizationGallery from "../../../components/RealizationGallery";

export default function RealizationDetail({ realization, company }) {
  if (!realization) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl mb-4">Realizacja nie znaleziona</h1>
          <Link href="/realizacje" className="text-[#C0368B] hover:text-white">
            ← Powrót do realizacji
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="bg-black h-screen w-full relative">
        <div className="absolute top-0 left-0 right-0 h-full w-full shadow-bg-realization z-10"></div>
        <Header />
        <Image
          src={realization.heroImage}
          alt={realization.heroImageAlt || "Realizacja Hero"}
          fill
          priority
          className="object-cover absolute top-0 left-0 z-0"
        />
        <div
          style={{ height: "calc(100vh - 288px)" }}
          className="flex flex-col items-center justify-center relative z-11"
        >
          <div className="text-center text-white">
            <h1 className="grid grid-cols-12 text-8xl font-museo tracking-[8px] uppercase ">
              <span className="text-outline text-center col-span-12">
                Realizacje
              </span>
              <span className="col-span-12">{realization.heroText}</span>
            </h1>
          </div>
        </div>
      </div>
      {/* 2. Content Section - Identyczna struktura jak CompanyEvent.jsx */}
      <div className="w-full h-auto bg-black z-[40] relative">
        <div className="grid grid-cols-12 py-16">
          <div className="col-span-5 relative aspect-4/3">
            {(realization.mainGallery && realization.mainGallery.length > 0) ||
            (realization.allImages && realization.allImages.length > 0) ? (
              (() => {
                // Wybierz losowe zdjęcie z galerii lub wszystkich zdjęć
                const allAvailableImages = [
                  ...(realization.mainGallery || []),
                  ...(realization.allImages || []),
                ].filter(Boolean);

                if (allAvailableImages.length === 0) return null;

                const randomImage =
                  allAvailableImages[
                    Math.floor(Math.random() * allAvailableImages.length)
                  ];

                return (
                  <Image
                    src={randomImage.url}
                    alt={randomImage.alt || "Zdjęcie z realizacji"}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                );
              })()
            ) : (
              // Fallback - gradient jeśli brak zdjęć
              <div className="w-full h-full bg-gradient-to-br from-[#53A7B2] to-[#C0368B] flex items-center justify-center">
                <span className="text-white text-4xl font-bold opacity-50">
                  {realization.heroText.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div className="col-span-5 col-start-7 relative">
            <div className="flex flex-col justify-start h-full text-white font-museo tracking-widest">
              <p className="bg-[#53A7B2] py-4 text-2xl mb-6 p-2 uppercase">
                {realization.heroText}
              </p>

              {realization.content && (
                <div className="text-md text-justify py-6 font-light tracking-[4px]">
                  <div
                    className=""
                    dangerouslySetInnerHTML={{ __html: realization.content }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Video Section - YouTube Embed */}
      {realization.videoEmbed && (
        <section className="py-16 lg:py-16 bg-black">
          <div className="container mx-auto px-8">
            <div className="max-w-5xl mx-auto">
              {/* Tytuł sekcji */}
              <div className="text-center mb-16">
                <div className="text-white text-xl font-museo uppercase tracking-widest mb-4">
                  Zobacz video z realizacji:
                </div>
              </div>

              {/* Video Container */}
              <div className="relative">
                <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                  {realization.videoEmbed.url.includes("youtube") ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeId(
                        realization.videoEmbed.url
                      )}?rel=0&showinfo=0&modestbranding=1`}
                      title="Film z realizacji"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : realization.videoEmbed.url.includes("vimeo") ? (
                    <iframe
                      src={realization.videoEmbed.url}
                      title="Film z realizacji"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🎬</div>
                        <a
                          href={realization.videoEmbed.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#C0368B] hover:bg-[#53A7B2] text-white px-6 py-3 rounded-lg transition-colors"
                        >
                          Otwórz film
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <RealizationGallery realization={realization} />
    </div>
  );
}

// Helper function to extract YouTube ID
function getYouTubeId(url) {
  if (!url) return "";

  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[7].length === 11 ? match[7] : "";
}
