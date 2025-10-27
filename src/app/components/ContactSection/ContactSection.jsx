"use client";
import { useState } from "react";
import Image from "next/image";
import AnimatedGradients from "../HeroSection/AnimatedGradients";

export default function ContactSection() {
  const [selectedGuests, setSelectedGuests] = useState("200-1000 osób");
  const [selectedBudget, setSelectedBudget] = useState("50 000 do 150 000 PLN");
  return (
    <div className="bg-black w-full h-auto relative z-[40]">
      <AnimatedGradients />
      <div className="bg-[#53A7B2] text-white text-left  px-8 py-3 w-8/12 z-[31]">
        <h2 className="text-2xl lg:text-3xl  uppercase tracking-widest font-museo">
          ZAPLANUJMY TWÓJ EVENT
        </h2>
      </div>

      <div className="grid grid-cols-12 gap-16">
        <div className="col-span-8 col-start-3">
          <div className="text-white text-center text-2xl font-museo pt-16">
            <p className="uppercase tracking-widest">
              Skontaktuj się z nami i stwórzmy niezapomniany event!{" "}
            </p>
            <p className="text-lg font-light mt-4">
              Podaj szczegóły - budżet, liczbę gości i preferencje - a my
              zajmiemy się resztą
            </p>
          </div>
        </div>
        {/* Left Side */}
        <div className="col-span-4 col-start-3  text-2xl text-white">
          <p className="font-museo text-xl tracking-widest">
            WPISZ SWOJE DANE KONTAKTOWE:
          </p>
          <input
            type="text"
            name="name"
            placeholder="Imię"
            className="w-full text-xl bg-transparent border-b-1 border-[#53A7B2] text-white font-light placeholder-gray-400 py-3 my-2 px-1 focus:outline-none focus:border-white transition-colors"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full text-xl bg-transparent border-b-1 border-[#53A7B2] text-white font-light placeholder-gray-400 py-3 my-2 px-1 focus:outline-none focus:border-white transition-colors"
          />
          <input
            type="tel"
            name="number"
            placeholder="Telefon"
            className="w-full text-xl bg-transparent border-b-1 border-[#53A7B2] text-white font-light placeholder-gray-400 py-3 my-2 px-1 focus:outline-none focus:border-white transition-colors"
          />
          <p className="font-museo text-xl tracking-widest pt-8">
            JAKIEGO TYPU EVENT PLANUJESZ?
          </p>
          <div className="relative mt-8">
            <select
              id="country"
              name="country"
              className="w-full font-museo font-light rounded-lg text-xl bg-black border-2 border-[#53A7B2] text-white py-3 px-4 focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
            >
              <option>Otwarcie obiektu</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
              <Image
                src="/images/polygon 2.png"
                alt="Dropdown arrow"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </div>
          </div>

          <p className="font-museo text-xl tracking-widest pt-8">
            LOKALIZACJA:
          </p>
          <div className="relative mt-8">
            <select
              id="country"
              name="country"
              className="w-full font-museo font-light rounded-lg text-xl bg-black border-2 border-[#53A7B2] text-white py-3 px-4 focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
            >
              <option>Katowice</option>
              <option>Bytom</option>
              <option>Warszawa</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
              <Image
                src="/images/polygon 2.png"
                alt="Dropdown arrow"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </div>
          </div>

          <p className="font-museo text-xl tracking-widest pt-8">
            DATA WYDARZENIA:
          </p>
          <div className="relative mt-8">
            <select
              id="country"
              name="country"
              className="w-full font-museo font-light rounded-lg text-xl bg-black border-2 border-[#53A7B2] text-white py-3 px-4 focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
            >
              <option>Luty 2026</option>
              <option>Marzec 2026</option>
              <option>Kwiecień 2026</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
              <Image
                src="/images/polygon 2.png"
                alt="Dropdown arrow"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-span-4 col-start-7 text-2xl text-white z-[40]">
          <p className="font-museo text-xl tracking-widest ">LICZBA GOŚCI:</p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <button
              onClick={() => setSelectedGuests("do 50 osób")}
              className={`${
                selectedGuests === "do 50 osób"
                  ? "bg-[#53A7B2]"
                  : "bg-transparent"
              } border-2 border-[#53A7B2] text-white py-3 px-4 rounded-lg font-museo text-sm hover:bg-[#53A7B2] transition-colors`}
            >
              do 50 osób
            </button>
            <button
              onClick={() => setSelectedGuests("50-200 osób")}
              className={`${
                selectedGuests === "50-200 osób"
                  ? "bg-[#53A7B2]"
                  : "bg-transparent"
              } border-2 border-[#53A7B2] text-white py-3 px-4 rounded-lg font-museo text-sm hover:bg-[#53A7B2] transition-colors`}
            >
              50-200 osób
            </button>
            <button
              onClick={() => setSelectedGuests("200-1000 osób")}
              className={`${
                selectedGuests === "200-1000 osób"
                  ? "bg-[#53A7B2]"
                  : "bg-transparent"
              } border-2 border-[#53A7B2] text-white py-3 px-4 rounded-lg font-museo text-sm hover:bg-[#53A7B2] transition-colors`}
            >
              200-1000 osób
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              onClick={() => setSelectedGuests("1000-5000 osób")}
              className={`${
                selectedGuests === "1000-5000 osób"
                  ? "bg-[#53A7B2]"
                  : "bg-transparent"
              } border-2 border-[#53A7B2] text-white py-3 px-4 rounded-lg font-museo text-sm hover:bg-[#53A7B2] transition-colors`}
            >
              1000-5000 osób
            </button>
            <button
              onClick={() => setSelectedGuests("powyżej 5000 osób")}
              className={`${
                selectedGuests === "powyżej 5000 osób"
                  ? "bg-[#53A7B2]"
                  : "bg-transparent"
              } border-2 border-[#53A7B2] text-white py-3 px-4 rounded-lg font-museo text-sm hover:bg-[#53A7B2] transition-colors`}
            >
              powyżej 5000 osób
            </button>
          </div>

          <p className="font-museo text-xl tracking-widest pt-8">
            PRZEWIDZIANY BUDŻET:
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <button
              onClick={() => setSelectedBudget("5 000 - 15 000 PLN")}
              className={`${
                selectedBudget === "5 000 - 15 000 PLN"
                  ? "bg-[#53A7B2]"
                  : "bg-transparent"
              } border-2 border-[#53A7B2] text-white py-3 px-4 rounded-lg font-museo text-sm hover:bg-[#53A7B2] transition-colors`}
            >
              5 000 - 15 000 PLN
            </button>
            <button
              onClick={() => setSelectedBudget("15 000 - 50 000 PLN")}
              className={`${
                selectedBudget === "15 000 - 50 000 PLN"
                  ? "bg-[#53A7B2]"
                  : "bg-transparent"
              } border-2 border-[#53A7B2] text-white py-3 px-4 rounded-lg font-museo text-sm hover:bg-[#53A7B2] transition-colors`}
            >
              15 000 - 50 000 PLN
            </button>
            <button
              onClick={() => setSelectedBudget("50 000 do 150 000 PLN")}
              className={`${
                selectedBudget === "50 000 do 150 000 PLN"
                  ? "bg-[#53A7B2]"
                  : "bg-transparent"
              } border-2 border-[#53A7B2] text-white py-3 px-4 rounded-lg font-museo text-sm hover:bg-[#53A7B2] transition-colors`}
            >
              50 000 do 150 000 PLN
            </button>
            <button
              onClick={() => setSelectedBudget("150 000 - 500 000 PLN")}
              className={`${
                selectedBudget === "150 000 - 500 000 PLN"
                  ? "bg-[#53A7B2]"
                  : "bg-transparent"
              } border-2 border-[#53A7B2] text-white py-3 px-4 rounded-lg font-museo text-sm hover:bg-[#53A7B2] transition-colors`}
            >
              150 000 - 500 000 PLN
            </button>
            <button
              onClick={() => setSelectedBudget("powyżej 500 000 PLN")}
              className={`${
                selectedBudget === "powyżej 500 000 PLN"
                  ? "bg-[#53A7B2]"
                  : "bg-transparent"
              } border-2 border-[#53A7B2] text-white py-3 px-4 rounded-lg font-museo text-sm hover:bg-[#53A7B2] transition-colors`}
            >
              powyżej 500 000 PLN
            </button>
            <button
              onClick={() => setSelectedBudget("nieokreślony")}
              className={`${
                selectedBudget === "nieokreślony"
                  ? "bg-[#53A7B2]"
                  : "bg-transparent"
              } border-2 border-[#53A7B2] text-white py-3 px-4 rounded-lg font-museo text-sm hover:bg-[#53A7B2] transition-colors`}
            >
              nieokreślony
            </button>
          </div>
        </div>

        {/* Text area */}
        <div className="col-span-8 col-start-3 text-2xl text-white">
          <p className="font-museo text-xl tracking-widest ">
            TWOJE OCZEKIWANIA / NOTATKI
          </p>

          <textarea
            name="expectations"
            placeholder="Opisz swoje oczekiwania dotyczące eventu..."
            rows={6}
            className="w-full mt-8 bg-black border-2 border-[#53A7B2] text-white font-museo font-light text-lg placeholder-gray-400 py-4 px-4 rounded-lg focus:outline-none focus:border-white transition-colors resize-none"
          />

          <div className="flex items-start mt-6 mb-6">
            <input
              type="checkbox"
              id="privacy"
              className="mt-1 mr-3 w-4 h-4 border-2 border-[#53A7B2] bg-transparent rounded checked:bg-[#53A7B2] focus:outline-none"
            />
            <label
              htmlFor="privacy"
              className="text-white font-museo text-sm leading-relaxed"
            >
              Akceptuję{" "}
              <a
                href="#"
                className="text-[#53A7B2] underline hover:text-white transition-colors"
              >
                politykę prywatności
              </a>
              . Dowiedz się w jaki sposób gromadzimy, wykorzystujemy i chronimy
              Twoje dane.
            </label>
          </div>

          <button className="mt-4 bg-[#C0368B] text-white py-3 px-8  font-museo text-base font-semibold tracking-widest uppercase hover:bg-white hover:text-[#C0368B] transition-colors">
            WYŚLIJ
          </button>
        </div>
      </div>
    </div>
  );
}
