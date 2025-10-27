"use client";
import { fetchClientLogosData } from "../../../../lib/function";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";

const animation = { duration: 17000, easing: (t) => t };

export default function OurClientsMain() {
  const [data, setData] = useState(null);
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 6, // Dostosuj do liczby dostępnych logo
      spacing: 15,
    },
    loop: true,
    renderMode: "performance",
    drag: true,
    autoplay: true,
    created(s) {
      if (data?.logos?.length > 2) {
        s.moveToIdx(5, true, animation);
      }
    },
    updated(s) {
      if (data?.logos?.length > 2) {
        s.moveToIdx(s.track.details.abs + 5, true, animation);
      }
    },
    animationEnded(s) {
      if (data?.logos?.length > 2) {
        s.moveToIdx(s.track.details.abs + 5, true, animation);
      }
    },
  });

  useEffect(() => {
    const loadData = async () => {
      const clientsData = await fetchClientLogosData();
      console.log("🏢 Client logos data:", clientsData);
      setData(clientsData);
    };
    loadData();
  }, []);

  if (!data) return <div className="text-white">Loading...</div>;

  console.log("🎠 Rendering logos:", data.logos?.length || 0);

  return (
    <div className="w-full h-auto bg-black text-white py-16">
      {/* Tytuł */}
      <div className="grid grid-cols-12 place-items-center mb-16">
        <h3 className="col-span-12 uppercase text-center text-3xl font-museo tracking-widest">
          {data.title}
        </h3>
      </div>

      <div ref={sliderRef} className="keen-slider">
        {data.logos.map((logo, index) => (
          <div key={logo.id} className="keen-slider__slide">
            <div className="flex items-center justify-center h-32">
              <Image
                src={logo.url}
                alt={logo.alt}
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
