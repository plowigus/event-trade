"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { fetchTeamSectionData } from "../../../../lib/function";

export default function TeamSection() {
  const [hoveredElement, setHoveredElement] = useState(null);
  const [isHoveringTeamSection, setIsHoveringTeamSection] = useState(false);
  const [teamData, setTeamData] = useState(null);

  // Refs dla kursora
  const containerRef = useRef(null);
  const customCursorRef = useRef(null);

  // Refs dla tekstów opisowych
  const descriptionRef1 = useRef(null);
  const descriptionRef2 = useRef(null);
  const descriptionRef3 = useRef(null);

  // Pobieranie danych zespołu
  useEffect(() => {
    const loadTeamData = async () => {
      try {
        const data = await fetchTeamSectionData();

        setTeamData(data);
      } catch (error) {
        console.error("Error loading team data:", error);
      }
    };

    loadTeamData();
  }, []);

  const handleMouseEnter = (elementIndex) => {
    setHoveredElement(elementIndex);

    // GSAP animacja dla tekstu opisowego z delay - prosta z opacity
    setTimeout(() => {
      let descRef;
      if (elementIndex === 1) descRef = descriptionRef1;
      else if (elementIndex === 2) descRef = descriptionRef2;
      else if (elementIndex === 3) descRef = descriptionRef3;

      if (descRef?.current) {
        gsap.fromTo(
          descRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          }
        );
      }
    }, 650); // Delay 600ms - po zakończeniu animacji grid
  };

  const handleMouseLeave = () => {
    // Proste ukrywanie tekstów opisowych - tylko opacity
    [descriptionRef1, descriptionRef2, descriptionRef3].forEach((ref) => {
      if (ref?.current) {
        gsap.to(ref.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    });

    setHoveredElement(null);
  };

  const getGridTemplateColumns = () => {
    if (hoveredElement === null) {
      return "1fr 1fr 1fr"; // Równe rozmiary
    }

    if (hoveredElement === 1) {
      return "2.5fr 0.75fr 0.75fr"; // Pierwszy rozszerzony
    } else if (hoveredElement === 2) {
      return "0.75fr 2.5fr 0.75fr"; // Drugi rozszerzony
    } else if (hoveredElement === 3) {
      return "0.75fr 0.75fr 2.5fr"; // Trzeci rozszerzony
    }

    return "1fr 1fr 1fr";
  };

  const getElementClasses = () => {
    return "relative rounded-xl cursor-none";
  };

  // Custom Cursor Logic
  useEffect(() => {
    const cursor = customCursorRef.current;

    const handleMouseMove = (e) => {
      if (!cursor || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Sprawdź czy mysz jest w obszarze kontenera
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        // Ustaw pozycję kursora względem kontenera - użyj gsap.to dla płynności
        gsap.to(cursor, {
          x: x - 50,
          y: y - 50,
          duration: 0.1,
          ease: "power2.out",
        });
      }
    };

    const handleMouseEnter = () => {
      if (!cursor) return;
      setIsHoveringTeamSection(true);
      // Ukryj zwykły kursor
      if (containerRef.current) {
        containerRef.current.style.cursor = "none";
      }
      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (!cursor) return;
      setIsHoveringTeamSection(false);
      // Przywróć zwykły kursor
      if (containerRef.current) {
        containerRef.current.style.cursor = "auto";
      }
      gsap.to(cursor, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    if (cursor && containerRef.current) {
      // Dodaj event listenery
      const container = containerRef.current;
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    // Cleanup
    return () => {
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
    <div className="w-full h-auto bg-black py-8 relatiive">
      {/* Custom Cursor */}
      <div
        ref={customCursorRef}
        className="absolute pointer-events-none z-[9999] w-[100px] h-[100px] opacity-0"
        style={{
          transform: "translate(-50%, -50%)",
          top: "125%",
          left: "4.2%",
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

      <div
        ref={containerRef}
        className="px-8 w-full h-[400px] text-white mt-16 gap-6"
        style={{
          display: "grid",
          gridTemplateColumns: getGridTemplateColumns(),
          transition: "grid-template-columns 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Pierwszy członek zespołu */}
        <div
          className={`${getElementClasses()} footer-gradient-1 overflow-hidden`}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Zdjęcie członka zespołu */}
          {teamData?.teammates[0]?.photo && (
            <Image
              src={teamData.teammates[0].photo}
              alt={teamData.teammates[0].altText}
              fill
              className="absolute object-contain rounded-xl top-0 left-0"
              style={{ objectPosition: "left bottom" }}
            />
          )}

          {/* Overlay z tekstem - zmienny na hover */}
          <div className="absolute inset-0 grid-rows-5 grid grid-cols-12 z-10">
            <div
              className={`col-span-10 col-start-5 row-start-2 bg-[#c0368b94] h-auto p-4 text-left flex items-center transition-all duration-1000 ease-in-out ${
                hoveredElement === 1 ? "justify-start" : "justify-start"
              }`}
            >
              <span className="text-white font-museo tracking-widest text-2xl uppercase transition-all duration-700">
                {teamData?.teammates[0]?.name || "ANNA NOWAK"}
              </span>
            </div>
            {/* Opis - tylko na hover */}
            {hoveredElement === 1 && (
              <div
                ref={descriptionRef1}
                className="col-span-7 col-start-5 row-start-3 p-4 opacity-0"
              >
                <p className="text-white text-md tracking-widest font-museo">
                  {teamData?.teammates[0]?.description ||
                    "Opis członka zespołu"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Drugi członek zespołu */}
        <div
          className={`${getElementClasses()} footer-gradient-2 overflow-hidden relative`}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Zdjęcie członka zespołu */}
          {teamData?.teammates[1]?.photo && (
            <Image
              src={teamData.teammates[1].photo}
              alt={teamData.teammates[1].altText}
              fill
              className="absolute object-contain rounded-xl top-0 right-0"
              style={{ objectPosition: "right bottom" }}
            />
          )}

          {/* Overlay z tekstem - zmienny na hover */}
          <div className="absolute inset-0 grid-rows-5 grid grid-cols-12 z-10">
            <div
              className={`col-span-10 col-start-1 row-start-2 bg-[#53a7b28e] h-auto p-4 text-left flex items-center transition-all duration-1000 ease-in-out ${
                hoveredElement === 2 ? "justify-start" : "justify-start"
              }`}
            >
              <span className="text-white font-museo tracking-widest text-2xl uppercase transition-all duration-700">
                {teamData?.teammates[1]?.name || "ADA KOWALCZYK"}
              </span>
            </div>
            {/* Opis - tylko na hover */}
            {hoveredElement === 2 && (
              <div
                ref={descriptionRef2}
                className="col-span-7 col-start-1 row-start-3 p-4 opacity-0"
              >
                <p className="text-white text-md tracking-widest font-museo">
                  {teamData?.teammates[1]?.description ||
                    "Opis członka zespołu"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Trzeci członek zespołu */}
        <div
          className={`${getElementClasses()} footer-gradient-3 overflow-hidden`}
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Zdjęcie członka zespołu */}
          {teamData?.teammates[2]?.photo && (
            <Image
              src={teamData.teammates[2].photo}
              alt={teamData.teammates[2].altText}
              fill
              className="absolute object-contain rounded-xl top-0 right-0"
              style={{ objectPosition: "right bottom" }}
            />
          )}

          {/* Overlay z tekstem - zmienny na hover */}
          <div className="absolute inset-0 grid-rows-5 grid grid-cols-12 z-10">
            <div
              className={`col-span-10 col-start-1 row-start-2 bg-[#f1b94aa9] h-auto p-4 text-left flex items-center transition-all duration-1000 ease-in-out ${
                hoveredElement === 3 ? "justify-start" : "justify-start"
              }`}
            >
              <span className="text-white font-museo tracking-widest text-2xl uppercase transition-all duration-700">
                {teamData?.teammates[2]?.name || "ADAM KOWALCZYK"}
              </span>
            </div>
            {/* Opis - tylko na hover */}
            {hoveredElement === 3 && (
              <div
                ref={descriptionRef3}
                className="col-span-7 col-start-1 row-start-3 p-4 opacity-0"
              >
                <p className="text-white text-md tracking-widest font-museo">
                  {teamData?.teammates[2]?.description ||
                    "Opis członka zespołu"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center text-white font-museo tracking-[4px] uppercase mt-16">
        {/* Tekst z CMS */}
      </div>
    </div>
  );
}
