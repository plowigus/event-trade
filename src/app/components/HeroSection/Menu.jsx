"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { getMenu, getMenuImg } from "../../../../lib/queries";
import { useMenu } from "../../context/MenuContext";
import { pathToSlug } from "../../../../lib/utils";
import Image from "next/image";
import Link from "next/link";

const menuData = await getMenu();
// console.log(menuData.menu.menuItems.nodes);
const menuItems = menuData.menu.menuItems.nodes;
const menuImgData = await getMenuImg();
const websiteUrl = "https://mateiko.pl";
const menuImgPath =
  websiteUrl + menuImgData.page.heroTextSection.menuImg.node.filePath;

export default function Menu() {
  const { isMenuOpen, closeMenu } = useMenu();
  const menuRef = useRef(null);
  const itemsRef = useRef([]);
  const ballsRef = useRef([]);
  const ballsContainerRef = useRef(null); // Ref dla container z kulami
  const timelineRef = useRef(null);
  const overflowTimeoutRef = useRef(null); // Ref dla timeout overflow

  // State dla dynamicznych klas menu
  const [menuVisible, setMenuVisible] = useState(false); // kontroluje display:none/block
  const [animationState, setAnimationState] = useState("hidden"); // 'hidden', 'opening', 'open', 'closing'

  useEffect(() => {
    if (!menuRef.current) return;

    // Cleanup poprzednich animacji jeśli istnieją
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    if (ballsRef.current && ballsRef.current.length > 0) {
      ballsRef.current.forEach((ball) => {
        gsap.killTweensOf(ball);
      });
    }

    // Ustaw początkową pozycję - ukryte
    gsap.set(menuRef.current, {
      x: "100%", // Cały overlay zaczyna poza ekranem po prawej
      opacity: 1,
    });
    // Sprawdź czy już istnieje container i usuń go
    const existingContainer = menuRef.current.querySelector(".balls-container");
    if (existingContainer) {
      existingContainer.remove();
    }

    // Stwórz kule w tle
    const createBalls = () => {
      const ballsContainer = document.createElement("div");
      ballsContainer.className = "balls-container"; // Dodaj klasę dla łatwego znajdowania
      ballsContainer.style.position = "absolute";
      ballsContainer.style.top = "0";
      ballsContainer.style.left = "0";
      ballsContainer.style.width = "100%";
      ballsContainer.style.height = "100%";
      ballsContainer.style.pointerEvents = "none";
      ballsContainer.style.overflow = "hidden";
      ballsContainer.style.zIndex = "1";

      menuRef.current.appendChild(ballsContainer);
      ballsContainerRef.current = ballsContainer; // Zapisz ref

      const balls = [];
      const numBalls = 40;

      for (let i = 0; i < numBalls; i++) {
        const ball = document.createElement("div");
        ball.style.position = "absolute";
        ball.style.width = `${gsap.utils.random(30, 100)}px`;
        ball.style.height = ball.style.width;
        ball.style.borderRadius = "50%";
        ball.style.background = `radial-gradient(circle at 30% 30%, 
          rgba(0, 240, 255, ${gsap.utils.random(0.3, 0.8)}), 
          rgba(84, 170, 183, ${gsap.utils.random(0.2, 0.6)}))`;
        ball.style.filter = "blur(8px)";
        ball.style.left = `${gsap.utils.random(0, 100)}%`;
        ball.style.top = `${gsap.utils.random(0, 100)}%`;

        ballsContainer.appendChild(ball);
        balls.push(ball);
      }

      return balls;
    };

    const balls = createBalls();
    ballsRef.current = balls;

    // Animacja fali dla kul - bardziej płynne
    balls.forEach((ball, i) => {
      // Ustaw początkową pozycję w granicach ekranu
      gsap.set(ball, {
        x: 0,
        y: 0,
      });

      gsap.to(ball, {
        x: `+=${gsap.utils.random(-30, 30)}`, // Zmniejszone dla płynności
        y: `+=${Math.sin(i * 0.5) * 20}`, // Zmniejszone amplitude
        duration: gsap.utils.random(3, 6), // Wydłużone dla smooth ruchu
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Dodatkowa animacja rotacji - wolniejsza
      gsap.to(ball, {
        rotation: 360,
        duration: gsap.utils.random(10, 25), // Wolniejsza rotacja
        repeat: -1,
        ease: "none",
      });

      // Pulsowanie - bardziej subtelne
      gsap.to(ball, {
        scale: gsap.utils.random(0.8, 1.2), // Mniejsze różnice w skali
        duration: gsap.utils.random(3, 5), // Wolniejsze pulsowanie
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut", // Łagodniejszy easing
      });
    });
    // Funkcja do rozbicia tekstu na litery
    const splitTextIntoLetters = (element) => {
      const text = element.textContent;
      element.innerHTML = "";

      const letters = text.split("").map((letter, index) => {
        const span = document.createElement("span");
        span.textContent = letter === " " ? "\u00A0" : letter; // zachowaj spacje
        span.style.display = "inline-block";
        span.style.transition = "all 0.1s ease";
        return span;
      });

      letters.forEach((letter) => element.appendChild(letter));
      return letters;
    };

    // Funkcja zmiany koloru piłek - bardziej płynna
    const changeBallsColor = (colorConfig) => {
      balls.forEach((ball, index) => {
        gsap.to(ball, {
          background: `radial-gradient(circle at 30% 30%, 
            ${colorConfig.primary}, 
            ${colorConfig.secondary})`,
          duration: 0.6, // Wydłużone przejście
          ease: "power2.out",
          delay: index * 0.02, // Staggered effect dla smooth transition
        });
      });
    };

    // Domyślny kolor piłek
    const defaultColors = {
      primary: "rgba(0, 240, 255, 0.6)",
      secondary: "rgba(84, 170, 183, 0.4)",
    };

    // Rozbij każdy element menu na litery
    const allLetters = [];
    itemsRef.current.forEach((item, itemIndex) => {
      if (item) {
        const letters = splitTextIntoLetters(item);
        allLetters.push(...letters);

        // Dodaj event listenery dla zmiany koloru piłek
        if (item) {
          // Definiuj różne kolory dla każdego elementu menu
          const menuColors = [
            {
              primary: "rgba(192, 54, 139, 0.7)", // #C0368B - Magenta
              secondary: "rgba(192, 54, 139, 0.5)",
            },
            {
              primary: "rgba(83, 167, 178, 0.7)", // #53A7B2 - Teal Blue
              secondary: "rgba(83, 167, 178, 0.5)",
            },
            {
              primary: "rgba(240, 195, 14, 0.7)", // #F0C30E - Golden Yellow
              secondary: "rgba(240, 195, 14, 0.5)",
            },
            {
              primary: "rgba(84, 170, 183, 0.7)", // #54AAB7 - Light Blue
              secondary: "rgba(84, 170, 183, 0.5)",
            },
            {
              primary: "rgba(19, 22, 247, 0.7)", // #1316F7 - Electric Blue
              secondary: "rgba(19, 22, 247, 0.5)",
            },
          ];

          const colorIndex = itemIndex % menuColors.length;

          item.addEventListener("mouseenter", () => {
            changeBallsColor(menuColors[colorIndex]);
            // Ustaw kolor paska na taki sam jak piłki z mniejszą opacity dla blur
            const barColor = menuColors[colorIndex].primary.replace(
              "0.7",
              "0.1" // Zmniejszona opacity dla bardziej subtelnego efektu
            );
            item.style.setProperty("--bar-color", barColor);
          });

          item.addEventListener("mouseleave", () => {
            changeBallsColor(defaultColors);
          });

          // Dodaj event listener do zamykania menu przy kliknięciu
          item.addEventListener("click", () => {
            closeMenu();
          });
        }
      }
    });

    // Animacja wejścia - litery lecą z różnych stron
    gsap.set(allLetters, {
      y: () => gsap.utils.random(-400, 400),
      x: () => gsap.utils.random(-400, 400),
      rotation: () => gsap.utils.random(-180, 180),
      scale: 0,
      opacity: 0,
    });

    // Timeline dla wejścia - rozpocznij wstrzymaną
    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        // Pokazuj menu na start animacji otwierania
        setMenuVisible(true);
        setAnimationState("opening");
        // Dodaj overflow-hidden na body
        document.body.classList.add("overflow-hidden");
      },
      onComplete: () => {
        // Menu w pełni otwarte
        setAnimationState("open");
      },
      onReverseStart: () => {
        // Start animacji zamykania
        setAnimationState("closing");
      },
      onReverseComplete: () => {
        // Ukryj overlay po zakończeniu reverse animacji
        setMenuVisible(false);
        setAnimationState("hidden");
        // Opóźnij usunięcie overflow-hidden żeby nie było skoku
        // Dłuższe opóźnienie dla płynniejszego efektu
        overflowTimeoutRef.current = setTimeout(() => {
          document.body.classList.remove("overflow-hidden");
        }, 200); // 200ms opóźnienia dla pewności
      },
    });

    // Ustaw początkową pozycję overlay - całkowicie ukryty
    gsap.set(menuRef.current, {
      x: "100%", // Cały overlay zaczyna poza ekranem po prawej
      opacity: 0, // Całkowicie niewidoczny na starcie
      visibility: "hidden", // Dodatkowe ukrycie
    });

    // Szybka animacja wjazdu bez opóźnień
    tl.set(menuRef.current, {
      opacity: 1,
      visibility: "visible",
    })
      .to(menuRef.current, {
        x: "0%", // Wjeżdża na swoją pozycję
        duration: 0.8, // Szybszy czas
        ease: "power3.out",
      })
      .to(
        allLetters,
        {
          y: 0,
          x: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6, // Szybsze litery
          stagger: {
            amount: 0.2, // Mniejszy stagger - szybsze pojawianie
            from: "random",
            ease: "power2.out",
          },
          ease: "back.out(1.4)", // Szybszy, mniej elastyczny easing
        },
        0 // Małe opóźnienie - prawie równocześnie
      );

    // Zapisz timeline do ref z checkiem
    if (timelineRef.current) {
      timelineRef.current.kill(); // Zatrzymaj poprzedni timeline
    }
    timelineRef.current = tl;

    // Cleanup - usuń event listenery
    return () => {
      itemsRef.current.forEach((item) => {
        if (item) {
          item.removeEventListener("mouseenter", () => {});
          item.removeEventListener("mouseleave", () => {});
          item.removeEventListener("click", () => {});
        }
      });

      // Cleanup - usuń overflow-hidden z body jeśli komponent się unmountuje
      document.body.classList.remove("overflow-hidden");

      // Wyczyść timeout jeśli istnieje
      if (overflowTimeoutRef.current) {
        clearTimeout(overflowTimeoutRef.current);
      }

      // Zatrzymaj wszystkie animacje GSAP na kulach
      if (ballsRef.current && ballsRef.current.length > 0) {
        ballsRef.current.forEach((ball) => {
          gsap.killTweensOf(ball);
        });
      }

      // Usuń container z kulami
      if (ballsContainerRef.current && ballsContainerRef.current.parentNode) {
        ballsContainerRef.current.parentNode.removeChild(
          ballsContainerRef.current
        );
      }

      // Zatrzymaj timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // Wyczyść refy
      ballsRef.current = [];
      ballsContainerRef.current = null;
      timelineRef.current = null;
    };
  }, []);

  // Oddzielny useEffect dla kontroli otwierania/zamykania
  useEffect(() => {
    if (!menuRef.current || !timelineRef.current) return;

    if (isMenuOpen) {
      // Otwórz menu z animacją
      timelineRef.current.play();
    } else {
      // Zamknij menu z reverse animacją (onReverseComplete ukryje overlay)
      timelineRef.current.reverse();
    }
  }, [isMenuOpen]);

  // Dodatkowy useEffect dla cleanup przy zmianach route
  useEffect(() => {
    return () => {
      // Cleanup przy unmount komponentu
      if (ballsRef.current && ballsRef.current.length > 0) {
        ballsRef.current.forEach((ball) => {
          gsap.killTweensOf(ball);
        });
      }

      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      document.body.classList.remove("overflow-hidden");

      if (overflowTimeoutRef.current) {
        clearTimeout(overflowTimeoutRef.current);
      }
    };
  }, []); // Empty dependency array - tylko przy unmount

  // useEffect dla obsługi klawisza ESC
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    // Dodaj event listener dla klawisza ESC
    document.addEventListener("keydown", handleEscape);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen, closeMenu]);

  // Funkcja do generowania dynamicznych klas
  const getMenuClasses = () => {
    const baseClasses =
      "menu-overlay absolute top-0 left-0 w-screen h-screen z-[30] bg-black bg-opacity-95 flex items-center justify-center";

    if (!menuVisible) {
      return `${baseClasses} hidden`; // display: none
    }

    switch (animationState) {
      case "hidden":
        return `${baseClasses} opacity-0 invisible`;
      case "opening":
        return `${baseClasses} opacity-100`;
      case "open":
        return `${baseClasses} opacity-100`;
      case "closing":
        return `${baseClasses} opacity-100`;
      default:
        return `${baseClasses} hidden`;
    }
  };

  return (
    <div
      ref={menuRef}
      className={getMenuClasses()}
      style={{ overflow: "hidden" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0"></div>

      {/* Obraz zawsze w prawym dolnym rogu - responsywny */}
      <div className="absolute bottom-0 right-0 z-30 max-w-[70vw] max-h-[90vh]">
        <Image
          src={menuImgPath}
          alt="Menu Image"
          width={800}
          height={1000}
          className="object-bottom-right h-auto w-auto z-30"
          style={{
            maxHeight: "90vh",
            maxWidth: "70vw",
            height: "60rem",
            width: "auto",
            objectPosition: "bottom right",
          }}
          priority
        />
      </div>
      {/* Content - zwiększony z-index żeby był nad kulami */}
      <div className="p-8 flex items-start mb-5 flex-col justify-between m-auto text-white relative container z-10">
        {menuItems.map((item, index) => {
          const slug = pathToSlug(item.path);
          const href = slug ? `/${slug}` : "/";

          return (
            <Link key={item.id} href={href} onClick={closeMenu}>
              <h2
                ref={(el) => (itemsRef.current[index] = el)}
                className="text-5xl tracking-[8px] uppercase cursor-pointer font-chillax mb-4 overflow-hidden menu-item-wrapper"
              >
                {item.label}
              </h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
