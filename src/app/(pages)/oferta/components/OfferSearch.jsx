"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";

export default function OfferSearch({ offers }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");

  // Wyciągnij unikalne subkategorie z ofert
  const subcategories = useMemo(() => {
    const allSubcategories = offers.flatMap(
      (offer) => offer.subcategories || []
    );
    const uniqueSubcategories = allSubcategories.filter(
      (subcat, index, self) =>
        index === self.findIndex((s) => s.slug === subcat.slug)
    );
    return uniqueSubcategories;
  }, [offers]);

  // Filtruj oferty na podstawie wyszukiwanego terminu i wybranej subkategorii
  const filteredOffers = useMemo(() => {
    let filtered = offers;

    // Filtruj po subkategorii
    if (selectedSubcategory !== "all") {
      filtered = filtered.filter((offer) =>
        offer.subcategories?.some(
          (subcat) => subcat.slug === selectedSubcategory
        )
      );
    }

    // Filtruj po wyszukiwanym terminie
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((offer) => {
        // Szukaj tylko w tytule
        return offer.title.toLowerCase().includes(term);
      });
    }

    return filtered;
  }, [offers, searchTerm, selectedSubcategory]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="container mx-auto px-8 py-20 text-white">
      <h1 className="text-4xl font-bold mb-12 text-center">Nasza Oferta</h1>

      <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
        Poznaj nasze usługi eventowe - od bankietów po konferencje biznesowe:
      </p>

      {/* Informacja o filtrach i liczbie wyników */}
      {(searchTerm || selectedSubcategory !== "all") && (
        <div className="mb-6 text-center">
          <div className="text-gray-300 text-sm">
            Znaleziono{" "}
            <span className="font-semibold text-[#C0368B]">
              {filteredOffers.length}
            </span>{" "}
            {filteredOffers.length === 1
              ? "ofertę"
              : filteredOffers.length <= 4
              ? "oferty"
              : "ofert"}
            {searchTerm && <span> zawierającą "{searchTerm}"</span>}
            {selectedSubcategory !== "all" && (
              <span>
                {" "}
                w kategorii "
                {
                  subcategories.find((s) => s.slug === selectedSubcategory)
                    ?.name
                }
                "
              </span>
            )}
          </div>
          {(searchTerm || selectedSubcategory !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedSubcategory("all");
              }}
              className="mt-2 text-xs text-gray-400 hover:text-[#C0368B] transition-colors"
            >
              Wyczyść wszystkie filtry
            </button>
          )}
        </div>
      )}

      {/* Search Bar i Filtr Subkategorii */}
      <div className="flex justify-end items-center gap-4 mb-12">
        {/* Filtr subkategorii - rozwijane menu */}
        <div className="relative">
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="appearance-none bg-gray-900 border border-gray-700 rounded-lg text-white px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#C0368B] focus:border-transparent transition-colors cursor-pointer"
          >
            <option value="all">Wszystkie kategorie</option>
            {subcategories.map((subcat) => (
              <option key={subcat.slug} value={subcat.slug}>
                {subcat.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={20}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        {/* Search Bar */}
        <div className="w-80">
          <div className="relative">
            <Search size={24} className="absolute svg-icon-search" />
            <input
              type="text"
              placeholder="Szukaj po tytule..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C0368B] focus:border-transparent transition-colors text-sm"
            />
          </div>
        </div>
      </div>

      {/* Lista ofert */}
      {filteredOffers.length === 0 &&
      (searchTerm || selectedSubcategory !== "all") ? (
        <div className="text-center py-16">
          <div className="text-gray-400 text-lg">
            {searchTerm && selectedSubcategory !== "all" ? (
              <>
                Brak ofert zawierających "{searchTerm}" w kategorii "
                {
                  subcategories.find((s) => s.slug === selectedSubcategory)
                    ?.name
                }
                "
              </>
            ) : searchTerm ? (
              <>Brak ofert zawierających "{searchTerm}"</>
            ) : (
              <>
                Brak ofert w kategorii "
                {
                  subcategories.find((s) => s.slug === selectedSubcategory)
                    ?.name
                }
                "
              </>
            )}
          </div>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedSubcategory("all");
            }}
            className="mt-4 px-6 py-2 bg-[#C0368B] text-white rounded-lg hover:bg-[#A02A75] transition-colors"
          >
            Wyczyść filtry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="group bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#C0368B]/20 flex flex-col h-full"
            >
              {/* Hero Image */}
              <div className="relative h-96 overflow-hidden">
                {offer.content.images.length > 0 ? (
                  <Image
                    src={offer.content.images[0].url}
                    alt={offer.content.images[0].alt || offer.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 aspect-[16/9]"
                    sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1023px) calc(50vw - 48px), calc(33vw - 32px)"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#53A7B2] to-[#C0368B] flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">
                      {offer.title.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col h-auto">
                {/* Title - klikalny do oferty */}
                <Link
                  href={`/oferta/${offer.slug}`}
                  className="text-xl font-bold text-white mb-2 hover:text-[#C0368B] transition-colors line-clamp-2 block"
                >
                  {offer.title}
                </Link>

                {/* Description - bold text */}
                <div className="text-gray-400 text-sm font-light mb-4 flex-grow overflow-hidden">
                  {offer.content.boldText ? (
                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: offer.content.boldText,
                      }}
                    />
                  ) : (
                    <div className="h-12"></div>
                  )}
                </div>

                {/* Link do oferty - zawsze na dole */}
                <Link
                  href={`/oferta/${offer.slug}`}
                  className="text-[#C0368B] hover:text-white transition-colors text-sm font-semibold inline-block mt-auto"
                >
                  Zobacz ofertę →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
