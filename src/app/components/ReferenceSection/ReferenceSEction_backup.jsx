"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { fetchReferenceData } from "../../../../lib/function";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function ReferenceSection() {
  const [references, setReferences] = useState([]);
  const [selectedReference, setSelectedReference] = useState(null);
  const [displayedReference, setDisplayedReference] = useState(null);
  const referenceContentRef = useRef(null);
  const logoGridRef = useRef(null);
  const starsRef = useRef(null);
  const parallaxBoxRef = useRef(null);
  const logoRef = useRef(null);
  const sectionRef = useRef(null);
  const arrowsRef = useRef(null);

  useEffect(() => {
    async function loadReferences() {
      const referenceData = await fetchReferenceData();
      setReferences(referenceData.references);
      if (referenceData.references.length > 0) {
        setSelectedReference(referenceData.references[0]);
        setDisplayedReference(referenceData.references[0]);
      }
    }
    loadReferences();
  }, []);

  useEffect(() => {
    if (references.length > 0) {
      // Animacja sekcji referencji
      gsap.fromTo(
        referenceContentRef.current,
        {
          opacity: 0,
          y: -30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
        }
      );

      // Parallax effect z opóźnieniem dla sekcji Hero
      if (parallaxBoxRef.current && logoGridRef.current) {
        setTimeout(() => {
          // Refresh ScrollTrigger after Hero section loads
          ScrollTrigger.refresh();

          // Calculate exact distance
          const boxTop = parallaxBoxRef.current.offsetTop;
          const logoGridTop = logoGridRef.current.offsetTop;
          const exactDistance = logoGridTop - boxTop;

          gsap.to(parallaxBoxRef.current, {
            y: exactDistance,
            ease: "none",
            scrollTrigger: {
              trigger: parallaxBoxRef.current,
              start: "top top",
              end: () => logoGridRef.current.offsetTop,
              scrub: 2.5,
              markers: true,
              id: "reference-parallax",
            },
          });
        }, 500);
      }
    }
  }, [references]);

  useEffect(() => {
    if (
      selectedReference &&
      selectedReference !== displayedReference &&
      referenceContentRef.current &&
      logoRef.current
    ) {
      const elementsToAnimate = [referenceContentRef.current];

      if (logoRef.current) {
        elementsToAnimate.push(logoRef.current);
      }

      const tl = gsap.timeline();

      gsap.set(elementsToAnimate, {
        opacity: 1,
        y: 0,
      });

      tl.to(elementsToAnimate, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
      })
        .call(() => {
          setDisplayedReference(selectedReference);
        })
        .to(elementsToAnimate, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });

      setTimeout(() => {
        if (starsRef.current && starsRef.current.children.length > 0) {
          gsap.fromTo(
            starsRef.current.children,
            {
              scale: 0,
              rotation: -180,
            },
            {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "back.out(1.5)",
            }
          );
        }
      }, 400);
    } else if (selectedReference && !displayedReference) {
      setDisplayedReference(selectedReference);
    }
  }, [selectedReference, displayedReference]);

  const handleReferenceChange = (reference) => {
    console.log(
      "Changing reference from",
      selectedReference?.name,
      "to",
      reference.name
    );
    setSelectedReference(reference);
  };

  const renderStars = (stars) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-2xl star-item ${
          i < stars ? "text-yellow-400" : "text-gray-600"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-black py-16 min-h-screen relative" ref={sectionRef}>
      <div className="container mx-auto px-8">
        {/* Sekcja referencji - dynamiczny parallax */}
        <div
          className="mb-32 h-96 py-12 flex items-center justify-center bg-black z-50 relative"
          ref={parallaxBoxRef}
        >
          {displayedReference && (
            <div className="grid grid-cols-12 gap-8 items-center w-full max-w-6xl">
              {/* Logo firmy */}
              <div className="col-span-4 flex justify-center" ref={logoRef}>
                <Image
                  src={displayedReference.image}
                  alt={displayedReference.altText}
                  width={250}
                  height={200}
                  className="object-contain filter-none max-h-24 transition-transform duration-300"
                />
              </div>

              {/* Treść referencji */}
              <div className="col-span-8 text-white relative min-h-[350px]">
                {/* Tylko tekst - animowany */}
                <div ref={referenceContentRef}>
                  {/* Gwiazdki */}
                  <div className="flex mb-4" ref={starsRef}>
                    {renderStars(displayedReference.stars)}
                  </div>

                  {/* Tekst referencji */}
                  <p className="text-md mb-6 leading-relaxed font-light">
                    {displayedReference.referenceText}
                  </p>

                  {/* Dane osoby */}
                  <div className="text-sm mb-16">
                    <p className="font-bold text-lg text-white mb-1">
                      {displayedReference.name}
                    </p>
                    <p className="text-gray-300 mb-1">
                      {displayedReference.role}
                    </p>
                    <p className="text-gray-400">
                      {displayedReference.company}
                    </p>
                  </div>
                </div>

                {/* Strzałki nawigacji - pozycja absolute */}
                <div className="absolute bottom-0 left-0 flex" ref={arrowsRef}>
                  <button
                    onClick={() => {
                      const currentIndex = references.findIndex(
                        (ref) => ref === selectedReference
                      );
                      const prevIndex =
                        currentIndex > 0
                          ? currentIndex - 1
                          : references.length - 1;
                      handleReferenceChange(references[prevIndex]);
                    }}
                    className="w-12 h-12 bg-[#53A7B2] text-white flex items-center justify-center hover:bg-[#C0368B] hover:brightness-110 transition-all duration-200 font-bold shadow-lg hover:shadow-xl"
                  >
                    <FaArrowLeft style={{ width: "24px", height: "24px" }} />
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = references.findIndex(
                        (ref) => ref === selectedReference
                      );
                      const nextIndex =
                        currentIndex < references.length - 1
                          ? currentIndex + 1
                          : 0;
                      handleReferenceChange(references[nextIndex]);
                    }}
                    className="w-12 h-12 bg-[#53A7B2] text-white flex items-center justify-center hover:bg-[#C0368B] hover:brightness-110 transition-all duration-200 font-bold shadow-lg hover:shadow-xl"
                  >
                    <FaArrowRight style={{ width: "24px", height: "24px" }} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Siatka logo */}
        <div
          className="grid grid-cols-9 gap-8 gap-y-12 pt-8 pb-16"
          ref={logoGridRef}
        >
          {references.map((reference, index) => (
            <div
              key={index}
              className="logo-item flex items-center justify-center h-20 cursor-pointer"
              onClick={() => handleReferenceChange(reference)}
              onMouseLeave={() => {
                gsap.to(event.currentTarget, {
                  scale: 1,
                  duration: 0.5,
                  ease: "power2.out",
                });
              }}
              onMouseOver={() => {
                gsap.to(event.currentTarget, {
                  scale: 1.08,
                  duration: 0.5,
                  ease: "power2.out",
                });
              }}
            >
              {reference.image && (
                <Image
                  src={reference.image}
                  alt={reference.altText}
                  width={140}
                  height={80}
                  className={`object-contain transition-all duration-500 max-h-16 ${
                    selectedReference === reference
                      ? "filter-none opacity-100"
                      : "filter grayscale opacity-40 hover:grayscale-0 hover:opacity-85"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
