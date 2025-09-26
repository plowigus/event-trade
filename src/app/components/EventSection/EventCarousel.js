"use client";
import { useEffect, useState } from "react";
import PrismEffect from "../AnimatedGradient/PrismEffect";
import Image from "next/image";
import Carousel from "./Carosusel";
import { fetchCarouselData } from "../../../../lib/function.js";

export default function EventCarousel() {
  const [carouselData, setCarouselData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchCarouselData();
        setCarouselData(data);
      } catch (error) {
        console.error("Error loading carousel data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  // console.log("Carousel data:", carouselData);
  return (
    <div className="bg-[#010108] relative h-auto w-full z-[31] flex flex-col">
      {/* Header */}

      <PrismEffect
        intensity={0.9} // Bardziej widoczny
        speed={20} // Szybciej
        blur={100} // Mniej rozmyty
      />

      <div className="bg-[#C0368B] text-white text-left  mt-16 px-8 py-3 w-10/12 z-[31]">
        <h2 className="text-2xl lg:text-3xl  uppercase tracking-widest font-museo">
          NAJCZĘŚCIEJ ORGANIZOWANE EVENTY
        </h2>
      </div>

      <Carousel carouselData={carouselData} />

      <div className="grid grid-cols-12 gap-4 items-center justify-items-center text-center text-white py-7  relative z-10">
        <div className="col-span-10 col-start-2 lg:col-span-8 lg:col-start-3 xl:col-span-8 xl:col-start-3 space-y-6">
          <p className="text-base lg:text-lg xl:text-xl leading-relaxed opacity-90 font-museo max-w-prose mx-auto">
            Każda pora roku niesie inne możliwości i wyzwania, a my z pełnym
            zaangażowaniem tworzymy wydarzenia, które idealnie wpisują się w
            kalendarz i klimat sezonu, pozostawiając po sobie niezatarte
            wrażenie.
          </p>
        </div>
      </div>
    </div>
  );
}
