// src/app/(pages)/realizacje/[company]/page.js
import FooterSection from "@/app/components/ContactSection/FooterCardOnly";
import Header from "@/app/components/Header";
import {
  fetchRealizationsByCompany,
  getRealizationTags,
} from "../../../../../lib/function";
import Link from "next/link";
import Image from "next/image";

export default async function CompanyRealizationsPage({ params }) {
  const { company } = await params;

  if (!company || typeof company !== "string") {
    return (
      <>
        <div className="bg-black min-h-screen w-full relative">
          <Header />
          <div className="container mx-auto px-8 py-20 text-white text-center">
            <h1 className="text-4xl mb-4">Nieprawidłowa firma</h1>
            <Link
              href="/realizacje"
              className="text-[#C0368B] hover:text-white"
            >
              ← Powrót do wszystkich realizacji
            </Link>
          </div>
        </div>
        <FooterSection />
      </>
    );
  }

  const realizationData = await fetchRealizationsByCompany(company);
  const tagsData = await getRealizationTags();

  // Sprawdź czy firma istnieje
  if (!tagsData.companies.includes(company.toLowerCase())) {
    return (
      <>
        <div className="bg-black min-h-screen w-full relative">
          <Header />
          <div className="container mx-auto px-8 py-20 text-white text-center">
            <h1 className="text-4xl mb-4">Firma nie znaleziona</h1>
            <p className="text-gray-400 mb-8">
              Nie znaleźliśmy realizacji dla firmy: {company}
            </p>
            <Link
              href="/realizacje"
              className="text-[#C0368B] hover:text-white"
            >
              ← Powrót do wszystkich realizacji
            </Link>
          </div>
        </div>
        <FooterSection />
      </>
    );
  }

  return (
    <>
      <div className="bg-black min-h-screen w-full relative">
        <Header />

        {/* Hero Section */}
        <section className="relative h-64 bg-gradient-to-r from-[#53A7B2] to-[#C0368B] flex items-center justify-center mt-20">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 capitalize">
              Realizacje {String(company)}
            </h1>
            <p className="text-lg">
              {realizationData.totalRealizations}{" "}
              {realizationData.totalRealizations === 1
                ? "realizacja"
                : "realizacji"}
            </p>
          </div>
        </section>

        {/* Breadcrumbs */}
        <div className="container mx-auto px-8 py-4">
          <nav className="text-gray-400 text-sm">
            <Link href="/realizacje" className="hover:text-white">
              Realizacje
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white capitalize">{String(company)}</span>
          </nav>
        </div>

        {/* Realizacje Grid */}
        <section className="py-12">
          <div className="container mx-auto px-8">
            {realizationData.totalRealizations > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {realizationData.realizations.map((realization) => (
                  <RealizationCard
                    key={realization.id}
                    realization={realization}
                    company={company}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-2xl text-white mb-4">Brak realizacji</h3>
                <p className="text-gray-400 mb-8">
                  Nie ma jeszcze żadnych realizacji dla firmy{" "}
                  {String(company).charAt(0).toUpperCase() +
                    String(company).slice(1)}
                  .
                </p>
                <Link
                  href="/realizacje"
                  className="bg-[#C0368B] text-white px-6 py-3 rounded hover:bg-[#53A7B2] transition-colors"
                >
                  Zobacz wszystkie realizacje
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
      <FooterSection />
    </>
  );
}

// Komponent karty realizacji
function RealizationCard({ realization, company }) {
  return (
    <div className="group bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#C0368B]/20 flex flex-col h-full">
      {/* Hero Image */}
      <div className="relative h-80 overflow-hidden">
        {realization.heroImage ? (
          <Image
            src={realization.heroImage}
            alt={realization.heroText}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1023px) calc(50vw - 48px), calc(25vw - 32px)"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#53A7B2] to-[#C0368B] flex items-center justify-center">
            <span className="text-white text-3xl font-bold">
              {realization.heroText.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>

        {/* Company badge - klikalne do strony firmy */}
        <div className="absolute top-3 left-3">
          <Link
            href={`/realizacje/${company}`}
            className="px-3 py-1 bg-[#C0368B]/90 hover:bg-[#C0368B] text-white text-sm font-medium rounded-full capitalize transition-colors"
          >
            {realization.companyName || company}
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col h-full">
        {/* Hero Text - klikalny do posta */}
        <Link
          href={`/realizacje/${company}/${realization.slug}`}
          className="text-xl font-bold text-white mb-2 hover:text-[#C0368B] transition-colors line-clamp-2 block"
        >
          {realization.heroText}
        </Link>

        {/* Tagi */}
        <div className="mb-4 h-5">
          {realization.tags.length > 0 ? (
            <div className="text-[#53A7B2] text-xs">
              {realization.tags
                .slice(0, 4)
                .map((tag) => tag.name)
                .join(" / ")}
            </div>
          ) : (
            <div className="h-5"></div>
          )}
        </div>

        {/* Description - zawsze 3 linie */}
        <div className="text-gray-400 text-sm mb-4 flex-grow overflow-hidden">
          {realization.content ? (
            <p className="line-clamp-3">
              {realization.content.substring(0, 120)}...
            </p>
          ) : (
            <div className="h-12"></div>
          )}
        </div>

        {/* Link do realizacji - zawsze na dole */}
        <Link
          href={`/realizacje/${company}/${realization.slug}`}
          className="text-[#C0368B] hover:text-white transition-colors text-sm font-semibold inline-block mt-auto"
        >
          Zobacz realizację →
        </Link>
      </div>
    </div>
  );
}

// Generate static params for companies
export async function generateStaticParams() {
  const tagsData = await getRealizationTags();

  return tagsData.companies.map((company) => ({
    company: company,
  }));
}

// Metadata
export async function generateMetadata({ params }) {
  const { company } = await params;

  if (!company || typeof company !== "string") {
    return {
      title: "Realizacje | Event Trade",
    };
  }

  const companyName = company.charAt(0).toUpperCase() + company.slice(1);

  return {
    title: `Realizacje ${companyName} | Evtrade`,
    description: `Zobacz nasze najlepsze realizacje eventów dla ${companyName}. Profesjonalna organizacja wydarzeń korporacyjnych.`,
    openGraph: {
      title: `Realizacje ${companyName} | Evtrade`,
      description: `Realizacje eventów dla ${companyName}`,
    },
  };
}
