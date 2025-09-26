// src/app/(pages)/[slug]/layout.js - Dynamic layout dla każdej strony

import { notFound } from "next/navigation";
import { getMenu } from "../../../../lib/queries";
import { pathToSlug, slugToTitle } from "../../../../lib/utils";
import Head from "next/head";
import Header from "@/app/components/Header";

// Pobierz wszystkie dostępne slugi dla static generation
export async function generateStaticParams() {
  try {
    const menuData = await getMenu();
    const menuItems = menuData.menu.menuItems.nodes;

    return menuItems
      .map((item) => ({
        slug: pathToSlug(item.path),
      }))
      .filter((item) => item.slug); // Usuń puste slugi (strona główna)
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function PageLayout({ children, params }) {
  const { slug } = await params;

  // Pobierz dane menu
  const menuData = await getMenu();
  const menuItems = menuData.menu.menuItems.nodes;

  // Znajdź aktualną stronę
  const currentPage = menuItems.find((item) => pathToSlug(item.path) === slug);

  if (!currentPage) {
    notFound();
  }

  const pageTitle = slugToTitle(slug);

  return (
    <>
      <Header />
      {children}
    </>
  );
}
