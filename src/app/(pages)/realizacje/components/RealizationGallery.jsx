"use client";

import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

export default function RealizationGallery({ realization }) {
  const [index, setIndex] = React.useState(-1);

  // Przygotuj zdjęcia z galerii WordPress
  const photos = (realization.mainGallery || [])
    .filter(Boolean)
    .map((image) => ({
      src: image.url,
      width: 800,
      height: 600,
      alt: image.alt || "Zdjęcie z realizacji",
    }));

  // Przygotuj slides dla lightbox
  const slides = photos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
  }));

  if (photos.length === 0) {
    return null;
  }

  return (
    <section className="">
      <div className="container mx-auto px-8">
        {/* Tytuł sekcji */}
        <div className="text-center mb-16">
          <div className="lg:text-3xl uppercase tracking-widest font-museo text-white mb-4">
            Galeria
          </div>
        </div>

        {/* Photo Gallery - 3 na rząd */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {photos.map((photo, idx) => (
            <div
              key={idx}
              className="relative aspect-square cursor-pointer group"
              onClick={() => setIndex(idx)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover rounded cursor-pointer"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        <Lightbox
          index={index}
          slides={slides}
          open={index >= 0}
          close={() => setIndex(-1)}
          styles={{
            container: {
              backgroundColor: "rgba(0, 0, 0, 0.95)",
            },
          }}
        />
      </div>
    </section>
  );
}
