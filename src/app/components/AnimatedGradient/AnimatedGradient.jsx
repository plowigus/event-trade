"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatedGradient = ({
  width = "100%",
  height = "400px",
  className = "",
  children,
}) => {
  const gradientRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const element = gradientRef.current;
    if (!element) return;

    // Tworzymy timeline dla płynnej animacji
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    timelineRef.current = tl;

    // Animacja gradientu z różnymi pozycjami i kolorami
    tl.to(element, {
      duration: 4,
      background:
        "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      ease: "power2.inOut",
    })
      .to(element, {
        duration: 4,
        background:
          "linear-gradient(225deg, #FFD194 0%, #D1913C 50%, #FFB347 100%)",
        ease: "power2.inOut",
      })
      .to(element, {
        duration: 4,
        background:
          "linear-gradient(45deg, #43e97b 0%, #38f9d7 50%, #43e97b 100%)",
        ease: "power2.inOut",
      })
      .to(element, {
        duration: 4,
        background:
          "linear-gradient(315deg, #fa709a 0%, #fee140 50%, #fa709a 100%)",
        ease: "power2.inOut",
      });

    // Dodatkowa animacja dla pozycji gradientu
    gsap.to(element, {
      duration: 8,
      backgroundPosition: "200% 200%",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return (
    <div
      ref={gradientRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width,
        height,
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        backgroundSize: "400% 400%",
      }}
    >
      {children && (
        <div className="relative z-10 h-full w-full flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default AnimatedGradient;
