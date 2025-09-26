"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PrismEffect = ({
  className = "",
  intensity = 0.8,
  speed = 10,
  blur = 80,
}) => {
  const containerRef = useRef(null);
  const rainbowRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const rainbow = rainbowRef.current;

    if (!container || !rainbow) return;

    // Animacja tęczowego promienia
    const rainbowTl = gsap.timeline({ repeat: -1, repeatDelay: 4 });

    rainbowTl
      .set(rainbow, {
        x: "10%",
        y: "0%",
        rotation: -25,
        opacity: intensity * 0.6,
        scaleX: 0.8,
        scaleY: 0.9,
      })
      .to(rainbow, {
        duration: speed * 0.7,
        x: "100%",
        y: "100%",
        rotation: 15,
        opacity: intensity,
        scaleX: 1.1,
        scaleY: 1,
        ease: "power2.inOut",
      })
      .to(rainbow, {
        duration: speed * 0.7,
        x: "-100%",
        y: "70%",
        rotation: -10,
        opacity: intensity * 0.8,
        scaleX: 0.9,
        scaleY: 1.1,
        ease: "power2.inOut",
      })
      .to(rainbow, {
        duration: speed * 0.6,
        x: "0%",
        y: "30%",
        rotation: 20,
        opacity: intensity * 0.9,
        scaleX: 1,
        scaleY: 0.95,
        ease: "power2.inOut",
      });

    return () => {
      rainbowTl.kill();
    };
  }, [intensity, speed, blur]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {/* Główny tęczowy promień - duży i mocno rozmyty */}
      <div
        ref={rainbowRef}
        className="absolute opacity-0"
        style={{
          width: "500px",
          height: "400px",
          background: `linear-gradient(135deg,
            rgba(255, 20, 147, 0.9) 0%,
            rgba(255, 69, 0, 0.8) 15%,
            rgba(255, 215, 0, 0.7) 30%,
            rgba(50, 205, 50, 0.6) 45%,
            rgba(0, 191, 255, 0.7) 60%,
            rgba(138, 43, 226, 0.8) 75%,
            rgba(255, 20, 147, 0.6) 90%,
            rgba(255, 69, 0, 0.4) 100%
          )`,
          filter: `blur(${blur}px) saturate(1.3)`,
          borderRadius: "50%",
        }}
      />
    </div>
  );
};

export default PrismEffect;
