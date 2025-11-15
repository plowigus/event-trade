"use client";
import PrismEffect from "../AnimatedGradient/PrismEffect";
import AnimatedGradients from "../HeroSection/AnimatedGradients";
import { fetchAboutData } from "../../../../lib/function";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function AboutSecion() {
  const [data, setData] = useState(null);
  const barRef = useRef(null);
  const particlesRef = useRef([]);
  const glowRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      const aboutData = await fetchAboutData();
      setData(aboutData);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!data || !barRef.current) return;

    // Sprawdź czy to desktop
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return; // Brak animacji na mobile/tablet

    // Animacja głównego paska - z prawej strony do połowy ekranu i powrót
    gsap.set(barRef.current, { x: 0 }); // Reset pozycji

    const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1 });

    tl.to(barRef.current, {
      x: "-30vw", // Przesuń w lewo
      scaleY: 1, // Lekkie powiększenie
      duration: 3,
      ease: "power2.inOut", // InOut dla płynnego ruchu w obie strony
    }).to(
      barRef.current,
      {
        scaleY: 1, // Powrót do normalnego rozmiaru
        duration: 0.1,
        ease: "power2.out",
      },
      "-=0.5"
    ); // Overlap z poprzednią animacją

    // Animacja świecenia za paskiem - synchronizowana z paskiem
    const glowTl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1 });

    glowTl.fromTo(
      glowRef.current,
      {
        opacity: 0.1,
        scale: 1,
        x: "0%",
      },
      {
        opacity: 0.3,
        scale: 2,
        x: "-30vw",
        duration: 4,
        ease: "power2.inOut",
      }
    );

    // Animacja cząsteczek
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.fromTo(
          particle,
          {
            y: "100vh",
            x: Math.random() * 200 - 100,
            opacity: 0.5,
          },
          {
            y: "-100vh",
            x: Math.random() * 300 - 150,
            opacity: 1,
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 7,
            ease: "none",
            repeat: -1,
            repeatDelay: Math.random() * 7,
          }
        );
      }
    });
  }, [data]);

  if (!data) return <div>Loading...</div>;
  return (
    <>
      <div className="about-section-bg w-full h-auto relative overflow-hidden">
        {/* Świecenie za paskiem */}
        <div
          ref={glowRef}
          className="hidden lg:block absolute top-0 right-0 w-40 h-full bg-[#c0368b25] opacity-30 z-[35] blur-xl"
        ></div>

        {/* Główny różowy pasek wertykalny z GSAP animacją */}
        <div
          ref={barRef}
          className="hidden lg:block absolute top-0 right-0 w-32 h-full bg-[#c0368ba9] opacity-80 z-[36] shadow-lg"
        ></div>

        {/* Cząsteczki lecące za paskiem */}
        {Array.from({ length: 30 }).map((_, index) => (
          <div
            key={index}
            ref={(el) => (particlesRef.current[index] = el)}
            className="hidden lg:block absolute w-4 h-4 bg-[#ffffff] rounded-full opacity-60 z-[34]"
            style={{
              right: `${20 + Math.random() * 150}px`,
              filter: "blur(2px)",
              backgroundColor: `rgba(${Math.random() * 255}, ${
                Math.random() * 255
              }, ${Math.random() * 255}, 1)`,
            }}
          ></div>
        ))}

        <Image
          src={data.image.url}
          alt={data.title}
          width={0}
          height={0}
          sizes="90vw"
          style={{ width: "auto", height: "auto", maxWidth: "100%" }}
          className="hidden lg:block absolute z-[35] top-0 right-0 object-contain self-end"
        />
        {/* Header grid system */}
        <div className="grid grid-cols-12 pt-16 z-[31] relative">
          <div className="col-span-12 lg:col-start-1 lg:col-span-10 bg-[#C0368B] text-white">
            {/* Grid wewnętrzny dla pozycjonowania tekstu */}

            <div className="grid grid-cols-12 lg:grid-cols-9 py-4 px-4 md:px-8 lg:px-12">
              <h2 className="col-span-12 lg:col-start-3 lg:col-span-7 text-2xl lg:text-3xl uppercase tracking-widest font-museo">
                {data.title}
              </h2>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 lg:grid-cols-10 gap-8 py-10 px-4 md:px-8 lg:px-0 z-[31] relative">
          <div className="col-span-12 lg:col-start-3 lg:col-span-4">
            <p className="font-museo text-2xl lg:text-3xl uppercase mb-8 text-white">
              {data.subtitle}
            </p>
            <p className="font-museo text-lg lg:text-xl uppercase mb-8 text-white">
              {data.text}
            </p>
            <p className="font-chillax text-sm lg:text-md font-medium text-white">
              {data.subtext}
            </p>
          </div>
        </div>

        {/* Zdjęcie pod tekstem na mobile/tablet */}
        <div className="lg:hidden w-full pb-10 z-[31] relative">
          <Image
            src={data.image.url}
            alt={data.title}
            width={0}
            height={0}
            sizes="90vw"
            style={{
              width: "100%",
              height: "auto",
              marginLeft: "auto",
              maxWidth: "80%",
            }}
            className="object-contain"
          />
        </div>

        <AnimatedGradients />
        <PrismEffect />
      </div>
    </>
  );
}
