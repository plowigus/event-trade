"use client";

import { gsap } from "gsap";
import React, { useRef, useEffect } from "react";
import { useMenu } from "../../context/MenuContext";

export default function Hamburger() {
  const { isMenuOpen, toggleMenu } = useMenu();
  const burgerRef = useRef(null);
  const topLineRef = useRef(null);
  const middleLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    tlRef.current = gsap.timeline({ paused: true });
    tlRef.current
      .to(topLineRef.current, {
        y: 30,
        rotation: 45,
        transformOrigin: "center center",
        duration: 0.3,
        ease: "expo.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          y: -30,
          rotation: -45,
          transformOrigin: "center center",
          duration: 0.3,
          ease: "expo.inOut",
        },
        0
      )
      .to(
        middleLineRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: "expo.inOut",
        },
        0.1
      );

    const handleClick = () => {
      toggleMenu(); // Używa context zamiast lokalnego state
    };

    const burger = burgerRef.current;
    burger.addEventListener("click", handleClick);
    return () => {
      burger.removeEventListener("click", handleClick);
    };
  }, []);

  // Oddzielny useEffect do kontroli animacji hamburgera w zależności od stanu menu
  useEffect(() => {
    if (!tlRef.current) return;

    if (isMenuOpen) {
      tlRef.current.play(); // Zmień na krzyżyk
    } else {
      tlRef.current.reverse(); // Wróć do hamburgera
    }
  }, [isMenuOpen]);

  return (
    <svg
      ref={burgerRef}
      id="splitCrossBurger"
      viewBox="0 0 200 200"
      style={{ cursor: "pointer" }}
    >
      <g fill="none" stroke="white" strokeWidth="5" strokeLinecap="round">
        <line ref={topLineRef} id="topLine3" x1="40" y1="70" x2="160" y2="70" />
        <line
          ref={middleLineRef}
          id="middleLine3"
          x1="40"
          y1="100"
          x2="160"
          y2="100"
        />
        <line
          ref={bottomLineRef}
          id="bottomLine3"
          x1="40"
          y1="130"
          x2="160"
          y2="130"
        />
      </g>
    </svg>
  );
}
