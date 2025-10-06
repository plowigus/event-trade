// src/app/(pages)/[slug]/page.js - Dynamic page dla slug nieokreślonych w dedykowanych stronach

import { notFound } from "next/navigation";
import { getMenu } from "../../../../lib/queries";
import { pathToSlug, slugToTitle } from "../../../../lib/utils";

// Komponenty dla różnych typów stron
import UslugiPage from "./components/UslugiPage";
import DefaultPage from "./components/DefaultPage";

export default async function DynamicPage({ params }) {
  const { slug } = await params;

  // Przekieruj na dedykowane strony jeśli próbują dostać się przez slug
  const dedicatedPages = ["kontakt", "zespol", "realizacje", "referencje"];
  if (dedicatedPages.includes(slug)) {
    notFound(); // 404 - te strony mają dedykowane ścieżki
  }

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
      case "uslugi":
      case "oferta":
        return <UslugiPage pageData={currentPage} />;

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
