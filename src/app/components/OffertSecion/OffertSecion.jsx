"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import AnimatedGradients from "../HeroSection/AnimatedGradients";
import { Card } from "@/components/ui/card";
import { fetchOffertData } from "../../../../lib/function";
import Image from "next/image";

export default function OffertSecion() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const offertData = await fetchOffertData();
        setData(offertData);
      } catch (error) {
        console.error("Error loading offert data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Error loading data</div>;

  console.log("Offert data:", data);

  // Bierzemy pierwsze 6 ofert
  const offerts = data.offerts.slice(0, 6);

  return (
    <div className="bg-[#010108] relative h-auto w-full z-[31] flex flex-col">
      <div className="bg-[#53A7B2] text-white text-center  mt-16 px-8 py-3 w-10/12 z-[31]">
        <h2 className="text-2xl lg:text-3xl uppercase tracking-widest font-museo">
          {data.mainTitle || "Oferta"}
        </h2>
      </div>

      <div className="grid grid-cols-10 grid-rows-2 gap-8  flex-1 z-[30] my-16">
        {offerts.map((offert, index) => {
          // Pozycje w gridzie 10 kolumn: 2 odstępu + 2 karty + 2 karty + 2 karty + 2 odstępy
          // Kolumny: [1-2 odstęp] [3-4 karta1] [5-6 karta2] [7-8 karta3] [9-10 odstęp]
          const positions = [
            { col: "col-start-3 col-span-2", row: "row-start-1" }, // Karta 1: kolumny 3-4
            { col: "col-start-5 col-span-2", row: "row-start-1" }, // Karta 2: kolumny 5-6
            { col: "col-start-7 col-span-2", row: "row-start-1" }, // Karta 3: kolumny 7-8
            { col: "col-start-3 col-span-2", row: "row-start-2" }, // Karta 4: kolumny 3-4
            { col: "col-start-5 col-span-2", row: "row-start-2" }, // Karta 5: kolumny 5-6
            { col: "col-start-7 col-span-2", row: "row-start-2" }, // Karta 6: kolumny 7-8
          ];

          const position = positions[index];

          return (
            <OffertCard key={offert.id} offert={offert} position={position} />
          );
        })}
      </div>

      <AnimatedGradients />
    </div>
  );
}

// Komponent pojedynczej karty z GSAP animacjami
function OffertCard({ offert, position }) {
  const cardRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const checksRef = useRef([]);
  const textBottomRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    const title = titleRef.current;
    const checks = checksRef.current;
    const textBottom = textBottomRef.current;

    if (!card || !overlay || !title || !textBottom) return;

    // Ustaw początkowe stany
    gsap.set(overlay, { opacity: 0 });
    gsap.set(title, { opacity: 0, y: 30 });
    gsap.set(checks, { opacity: 0, x: -20 });

    const handleMouseEnter = () => {
      // Natychmiast zabij wszystkie animacje na tym elemencie
      gsap.killTweensOf([textBottom, overlay, title, ...checks]);

      // Ustaw początkowe stany
      gsap.set(overlay, { opacity: 0 });
      gsap.set(title, { opacity: 0, y: 30 });
      gsap.set(checks, { opacity: 0, x: -20 });
      gsap.set(textBottom, { opacity: 1, y: 0 });

      // Ukryj tekst na dole
      gsap.to(textBottom, {
        opacity: 0,
        y: 20,
        duration: 0.3,
      });

      // Pokaż overlay
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.4,
      });

      // Pokaż tytuł z opóźnieniem
      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.2,
        ease: "power2.out",
      });

      // Pokaż checki jeden po drugim z opóźnieniem
      checks.forEach((check, index) => {
        if (check) {
          gsap.to(check, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            delay: 0.3 + index * 0.1,
            ease: "power2.out",
          });
        }
      });
    };

    const handleMouseLeave = () => {
      // Natychmiast zabij wszystkie animacje na tym elemencie
      gsap.killTweensOf([textBottom, overlay, title, ...checks]);

      // Reverse animacja - ukryj checki w odwrotnej kolejności
      checks
        .slice()
        .reverse()
        .forEach((check, reverseIndex) => {
          if (check) {
            gsap.to(check, {
              opacity: 0,
              x: -20,
              duration: 0.25,
              delay: reverseIndex * 0.03,
              ease: "power2.in",
            });
          }
        });

      // Ukryj tytuł z opóźnieniem
      gsap.to(title, {
        opacity: 0,
        y: 30,
        duration: 0.3,
        delay: 0.08,
        ease: "power2.in",
      });

      // Ukryj overlay
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.35,
        delay: 0.15,
      });

      // Pokaż tekst na dole z powrotem
      gsap.to(textBottom, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        delay: 0.2,
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Card
      ref={cardRef}
      className={`h-[400px] ${position.col} ${position.row} relative  border-none bg-none overflow-hidden cursor-pointer p-0 m-0`}
    >
      {/* Grid wewnętrzny */}
      <div className="grid grid-cols-12 grid-rows-12 h-full w-full relative">
        {/* Image jako tło - zajmuje całą Card */}
        <Image
          src={offert.url}
          alt={offert.altText}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient overlay - zawsze widoczny na dole */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 col-span-12 row-span-12"></div>

        {/* Tekst na dole - zajmuje 9/12 gridu - zawsze widoczny */}
        <div
          ref={textBottomRef}
          className="absolute bg-[#53a7b275]  bottom-0 left-0 right-0 z-20 text-white p-4 col-start-1 col-span-10 row-start-10 row-span-1"
        >
          <h3 className="text-sm font-museo uppercase drop-shadow-lg">
            {offert.title}
          </h3>
        </div>

        {/* Hover overlay - animacja z checkboxami */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-[#000000c9] z-30 col-span-12 row-span-12 "
        >
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full  text-white">
            {/* Tytuł na górze */}
            <div className="col-start-1 col-span-9 row-start-1 row-span-2 flex items-center">
              <h3
                ref={titleRef}
                className="text-xl font-museo uppercase p-4 mt-8"
              >
                {offert.title}
              </h3>
            </div>

            {/* Lista checków - od lewej strony, bez scrolla */}
            <div className="col-start-1 col-span-12 row-start-3 row-span-7 flex flex-col justify-start p-4 mt-4">
              <div className="grid grid-cols-1 gap-3 max-h-full">
                {offert.checks.map((check, checkIndex) => (
                  <div
                    key={checkIndex}
                    ref={(el) => (checksRef.current[checkIndex] = el)}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-[#53A7B2] rounded-full flex-shrink-0"></div>
                    <span className="text-xs leading-relaxed">{check}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
