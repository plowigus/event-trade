import { fetchLast4RealizationsData } from "../../../../lib/function";
import Image from "next/image";
import Link from "next/link";
import PrismEffect from "../AnimatedGradient/PrismEffect";

export default async function BlogSection() {
  const data = await fetchLast4RealizationsData();

  return (
    <div className="h-auto w-full bg-black text-white py-16 relative">
      <PrismEffect />
      {/* Tytuł sekcji */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-museo tracking-widest uppercase">
          NAJNOWSZE EVENTY / AKTUALNOŚCI
        </h2>
      </div>

      {/* Grid z kartami blog */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
          {data.realizations.map((realization) => (
            <div key={realization.id} className="">
              {/* IMAGE */}
              <div className="w-full aspect-square relative">
                {realization.heroImage ? (
                  <Image
                    src={realization.heroImage}
                    alt={realization.heroText || realization.title}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>

              {/* Treść karty */}
              <div className="py-4">
                {/* KATEGORIA - FIRMA (klikalna do /realizacje/{company}) */}
                <div className="mb-2">
                  {realization.company ? (
                    <Link
                      href={`/realizacje/${realization.company.toLowerCase()}`}
                      className="text-lg text-white font-museo uppercase tracking-wide hover:text-gray-300 transition-colors"
                    >
                      {realization.company}
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-400 uppercase tracking-wide">
                      Uncategorized
                    </span>
                  )}
                </div>

                {/* NAZWA POSTA - NAZWA WYDARZENIA (klikalna do pełnej realizacji) */}
                <Link
                  href={`/realizacje/${realization.company?.toLowerCase()}/${
                    realization.slug
                  }`}
                  className="block"
                >
                  <h3 className="text-md font-bold font-museo mb-3 line-clamp-2 hover:text-gray-300 transition-colors">
                    {realization.heroText || realization.title}
                  </h3>
                </Link>

                {/* TAGI ROZDZIELONE "/" */}
                <div className="text-sm text-white font-museo font-light">
                  {realization.tags.length > 0 ? (
                    <span>{realization.tags.join(" / ")}</span>
                  ) : (
                    <span>Brak tagów</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
