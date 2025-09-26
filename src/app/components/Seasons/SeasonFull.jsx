"use client";

import Image from "next/image";
import { getGreekSection } from "../../../../lib/queries";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Rejestracja ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function SeasonFull({ data }) {
  const img = data.page.heroGreekHead;
  const websiteUrl = "https://mateiko.pl";

  // Refs dla animacji
  const statueRef = useRef(null);
  const containerRef = useRef(null);
  const customCursorRef = useRef(null);
  const textContentRef = useRef(null);

  // State dla kursora
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);

  // Przygotowanie danych sezonów
  const seasons = {
    autumn: {
      title: data.page.greekHeadTextSectionAutumn.greekHeadAutumn,
      data: data.page.greekHeadTextSectionAutumn.greekHeadAutumnText,
    },
    summer: {
      title: data.page.greekHeadTextSectionSummer.greekHeadSummer,
      data: data.page.greekHeadTextSectionSummer.greekHeadSummerText,
    },
    winter: {
      title: data.page.greekHeadTextSectionWinter.greekHeadWinter,
      data: data.page.greekHeadTextSectionWinter.greekHeadWinterText,
    },
    spring: {
      title: data.page.greekHeadTextSectionSpring.greekHeadSpring,
      data: data.page.greekHeadTextSectionSpring.greekHeadSpringText,
    },
  };

  const [activeSeason, setActiveSeason] = useState("summer"); // Domyślnie summer

  // Funkcja animacji zmiany sezonu
  const handleSeasonChange = (newSeason) => {
    if (newSeason === activeSeason) return;

    if (textContentRef.current) {
      // Fade out
      gsap.to(textContentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          // Zmień sezon
          setActiveSeason(newSeason);
          // Fade in z delay
          gsap.fromTo(
            textContentRef.current,
            {
              opacity: 0,
              y: -20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.2,
              ease: "power2.out",
            }
          );
        },
      });
    } else {
      setActiveSeason(newSeason);
    }
  };

  // GSAP Scroll Animation + Custom Cursor
  useEffect(() => {
    if (statueRef.current && containerRef.current) {
      // Smooth scroll animacja z etapami
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "-150% top",
          end: "+=350px",
          scrub: 0.01, // WAŻNE: to sprawia że animacja reaguje na scroll
          markers: true,
        },
      });

      // Etap 1: Delikatny start z easing
      tl.fromTo(
        statueRef.current,
        {
          y: 150, // Zaczynamy z dolnej pozycji
        },
        {
          y: 0, // Idziemy do normalnej pozycji
          ease: "power2.out", // Smooth start
          duration: 0.4,
        }
      )
        // Etap 2: Finał z delikatnym settle
        .to(statueRef.current, {
          y: -70, // Kończymy w górnej pozycji
          ease: "power2.inOut", // Smooth końcówka bez twardego stop
          duration: 0.6,
        });
    }

    // Custom Cursor Logic
    const cursor = customCursorRef.current;

    const handleMouseMove = (e) => {
      if (!cursor || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Animuj kursor GSAP-em dla płynności
      gsap.to(cursor, {
        x: x - 25, // Odejmujemy połowę szerokości kursora (50px/2)
        y: y - 25, // Odejmujemy połowę wysokości kursora (50px/2)
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      if (!cursor) return;
      setIsHoveringVideo(true);
      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
      });
    };

    const handleMouseLeave = () => {
      if (!cursor) return;
      setIsHoveringVideo(false);
      gsap.to(cursor, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
      });
    };

    if (cursor && containerRef.current) {
      // Ukryj natywny kursor w kontenerze
      containerRef.current.style.cursor = "none";

      // Dodaj event listenery
      const container = containerRef.current;
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());

      if (containerRef.current) {
        const container = containerRef.current;
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.style.cursor = "auto"; // Przywróć normalny kursor
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="h-auto w-full bg-[#54AAB7] relative">
      {/* Custom Cursor */}
      <div
        ref={customCursorRef}
        className="absolute pointer-events-none z-[9999] w-30 h-30 opacity-0"
        style={{
          transform: "translate(-50%, -50%)",
          top: "17%",
          left: "2.7%",
        }}
      >
        <Image
          src="/images/KURSOR 1.png"
          alt="Custom Cursor"
          width={100}
          height={100}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="grid grid-cols-5 grid-rows-1 w-full">
        <div className="col-span-2">
          <Image
            ref={statueRef}
            width={500}
            height={500}
            src={websiteUrl + img.greekHead.node.filePath}
            alt={img.greekHeadAlt}
            className="transition-transform duration-100 z-[30] absolute"
          />
        </div>

        {/* Prawa strona z tekstem */}
        <div className="col-span-3 col-start-3 flex flex-col">
          {/* Nawigacja sezonów */}
          <div className="flex w-full justify-between text-lg lg:text-xl text-white font-museo uppercase flex-wrap">
            {Object.entries(seasons).map(([key, season]) => (
              <button
                key={key}
                onClick={() => handleSeasonChange(key)}
                className={`text-center min-w-0 flex-1 py-2 transition-all duration-300 uppercase border cursor-none ${
                  activeSeason === key
                    ? "bg-[#9C3072] text-white"
                    : "hover:bg-[#9c30739d]"
                }`}
              >
                {season.title}
              </button>
            ))}
          </div>

          {/* Zawartość aktywnego sezonu - podział na tekst i video */}
          <div className="flex-1 grid grid-cols-12">
            {/* Lewa strona - treść tekstowa - 4/12 */}
            <div className="col-span-5 text-white mt-10">
              {seasons[activeSeason] && (
                <div ref={textContentRef} className="space-y-6">
                  {/* Tytuły sekcji */}
                  {seasons[activeSeason].data.summerTitle && (
                    <div>
                      <h3 className="text-xl  mb-2 uppercase tracking-widest font-museo">
                        {seasons[activeSeason].data.summerTitle}
                      </h3>
                      <ul className="space-y-2 text-base">
                        {seasons[activeSeason].data.summerChceck && (
                          <li className="flex items-center gap-2">
                            {seasons[activeSeason].data.summerChceck}
                          </li>
                        )}
                        {seasons[activeSeason].data.summerCheck2 && (
                          <li className="flex items-center gap-2">
                            {seasons[activeSeason].data.summerCheck2}
                          </li>
                        )}
                        {seasons[activeSeason].data.summerCheck3 && (
                          <li className="flex items-center gap-2">
                            {seasons[activeSeason].data.summerCheck3}
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {seasons[activeSeason].data.summerTitle2 && (
                    <div className="mb-10">
                      <h3 className="text-xl uppercase mb-2 tracking-widest font-museo">
                        {seasons[activeSeason].data.summerTitle2}
                      </h3>
                      <ul className="space-y-2">
                        {seasons[activeSeason].data.summerCheck21 && (
                          <li className="flex items-center gap-3">
                            {seasons[activeSeason].data.summerCheck21}
                          </li>
                        )}
                        {seasons[activeSeason].data.summerCheck22 && (
                          <li className="flex items-center gap-3">
                            {seasons[activeSeason].data.summerCheck22}
                          </li>
                        )}
                        {seasons[activeSeason].data.summerCheck23 && (
                          <li className="flex items-center gap-3">
                            {seasons[activeSeason].data.summerCheck23}
                          </li>
                        )}
                        {seasons[activeSeason].data.summerCheck24 && (
                          <li className="flex items-center gap-3">
                            {seasons[activeSeason].data.summerCheck24}
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Prawa strona - video - 8/12 */}
            <div className="col-span-7">
              <div className="bg-black/20  overflow-hidden h-full">
                {seasons[activeSeason]?.data?.videoUrl ? (
                  // Sprawdź czy to YouTube URL czy direct video
                  seasons[activeSeason].data.videoUrl.includes("youtube") ||
                  seasons[activeSeason].data.videoUrl.includes("youtu.be") ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${
                        seasons[activeSeason].data.videoUrl
                          .split("/")
                          .pop()
                          .split("?")[0]
                      }`}
                      title="Season Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    // Direct video file
                    <video
                      controls
                      className="w-full h-full object-cover"
                      poster={seasons[activeSeason]?.data?.videoPoster}
                    >
                      <source
                        src={seasons[activeSeason].data.videoUrl}
                        type="video/mp4"
                      />
                      Twoja przeglądarka nie obsługuje odtwarzania video.
                    </video>
                  )
                ) : (
                  /* Placeholder gdy brak video */
                  <div className="text-white/60 text-center h-full flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-3 rounded-full mb-4 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 5v10l8-5-8-5z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
