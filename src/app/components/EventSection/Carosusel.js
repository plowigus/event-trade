"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { lazy } from "react";

export default function carousel({ carouselData }) {
  const [emblaRef] = useEmblaCarousel();

  // console.log("Carousel Data in Carousel Component:", carouselData);
  // console.log("Type of carouselData:", typeof carouselData);
  // console.log("Is array?", Array.isArray(carouselData));

  // Bezpieczne sprawdzenie czy carouselData to tablica
  if (!carouselData) {
    return <div>Brak danych do wyświetlenia</div>;
  }

  // Sprawdź czy carouselData ma właściwość images (jak w EventCarousel)
  const dataToRender = Array.isArray(carouselData)
    ? carouselData
    : carouselData.images || [];

  if (!Array.isArray(dataToRender) || dataToRender.length === 0) {
    return <div>Brak obrazów do wyświetlenia</div>;
  }

  return (
    <div className="embla py-8" ref={emblaRef}>
      <div className="embla__container cursor-grab active:cursor-grabbing select-none">
        {dataToRender.map((item, index) => (
          <div key={index} className="embla__slide">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden cursor-grab active:cursor-grabbing select-none bg-transparent">
              {/* Image zajmuje całą Card - nie tylko CardContent */}
              <Image
                src={item.url || item.image || "/default-image.jpg"}
                alt={item.altText || item.alt || `Slide ${index + 1}`}
                fill
                className="object-cover select-none pointer-events-none"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={lazy}
                draggable={false}
              />

              {/* Dark overlay dla lepszej czytelności tekstu */}
              <div className="absolute inset-0 overlay-carousel z-10"></div>

              {/* Tekst na dole obrazka */}
              <div className="absolute bottom-0 left-0 right-0 z-20 text-left text-white p-4">
                <h3 className="text-xl uppercase font-museo font-semibold drop-shadow-lg">
                  {item.title || item.text || `Item ${index + 1}`}
                </h3>
                {item.description && (
                  <p className="text-xl font-museo mt-1 drop-shadow-lg opacity-90">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
