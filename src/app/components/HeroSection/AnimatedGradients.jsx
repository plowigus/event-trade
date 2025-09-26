"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function AnimatedGradients() {
  const containerRef = useRef(null);
  const grad1Ref = useRef(null);
  const grad2Ref = useRef(null);

  useEffect(() => {
    // Prosta animacja GSAP: gradienty powoli przesuwają się i wracają
    gsap.to(grad1Ref.current, {
      x: 150,
      y: -60,
      duration: 3.5,
      repeat: -1,
      width: 440,
      height: 440,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(grad2Ref.current, {
      x: -50,
      y: -120,
      duration: 3.5,
      width: 540,
      height: 540,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none" || "auto",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <div
        ref={grad1Ref}
        style={{
          position: "absolute",
          left: "25%",
          top: "28%",
          width: 400,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #1316F7 0%, rgba(19,22,247,0) 100%)",
          opacity: 0.7,
          filter: "blur(80px)",
        }}
      />
      <div
        ref={grad2Ref}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 240,
          height: 240,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #54AAB7 0%, rgba(84,170,183,0) 100%)",
          opacity: 0.7,
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
