// src/app/(pages)/[slug]/page.js - Dynamic page dla każdego slug

import { notFound } from "next/navigation";
import { getMenu } from "../../../../lib/queries";
import { pathToSlug, slugToTitle } from "../../../../lib/utils";

// Komponenty dla różnych typów stron
import RealizacjePage from "./components/RealizacjePage";
import UslugiPage from "./components/UslugiPage";
import KontaktPage from "./components/KontaktPage";
import DefaultPage from "./components/DefaultPage";

export default async function DynamicPage({ params }) {
  const { slug } = await params;

  // Pobierz dane menu
  const menuData = await getMenu();
  const menuItems = menuData.menu.menuItems.nodes;

  // Znajdź aktualną stronę
  const currentPage = menuItems.find((item) => pathToSlug(item.path) === slug);

  if (!currentPage) {
    notFound();
  }

  // Renderuj odpowiedni komponent na podstawie slug
  const renderPageComponent = () => {
    switch (slug) {
      case "realizacje-2":
      case "realizacje":
        return <RealizacjePage pageData={currentPage} />;

      case "uslugi":
      case "oferta":
        return <UslugiPage pageData={currentPage} />;

      case "kontakt":
        return <KontaktPage pageData={currentPage} />;

      default:
        return <DefaultPage pageData={currentPage} slug={slug} />;
    }
  };

  return (
    <div className={`dynamic-page slug-${slug}`}>{renderPageComponent()}</div>
  );
}

// Generate metadata dla SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pageTitle = slugToTitle(slug);

  return {
    title: `${pageTitle} - Event Trade`,
    description: `Strona ${pageTitle.toLowerCase()} - Event Trade`,
    openGraph: {
      title: `${pageTitle} - Event Trade`,
      description: `Strona ${pageTitle.toLowerCase()} - Event Trade`,
    },
  };
}
