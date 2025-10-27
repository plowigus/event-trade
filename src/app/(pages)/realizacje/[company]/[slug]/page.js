// src/app/(pages)/realizacje/[company]/[slug]/page.js
import { notFound } from "next/navigation";

import {
  fetchRealizationData,
  getRealizationTags,
} from "../../../../../../lib/function";
import RealizationDetail from "./components/RealizationDetail";
import FooterSectionSimply from "@/app/components/FooterSection/FooterSectionSimply";

export default async function SingleRealizationPage({ params }) {
  const { company, slug } = await params;

  if (
    !company ||
    !slug ||
    typeof company !== "string" ||
    typeof slug !== "string"
  ) {
    notFound();
  }

  // Pobierz wszystkie realizacje
  const allRealizations = await fetchRealizationData();

  // Znajdź konkretną realizację po slug i company
  const realization = allRealizations.realizations.find(
    (r) => r.slug === slug && r.company === company.toLowerCase()
  );

  if (!realization) {
    notFound();
  }

  return (
    <>
      <RealizationDetail realization={realization} company={company} />
      <FooterSectionSimply />
    </>
  );
}

// Generate static paths
export async function generateStaticParams({ params }) {
  const { company } = await params;

  if (!company || typeof company !== "string") {
    return [];
  }

  const allRealizations = await fetchRealizationData();

  // Filtruj realizacje dla konkretnej firmy
  const companyRealizations = allRealizations.realizations.filter(
    (r) => r.company === company.toLowerCase()
  );

  return companyRealizations.map((realization) => ({
    slug: realization.slug,
  }));
}

// Metadata
export async function generateMetadata({ params }) {
  const { company, slug } = await params;

  if (
    !company ||
    !slug ||
    typeof company !== "string" ||
    typeof slug !== "string"
  ) {
    return {
      title: "Realizacja nie znaleziona",
    };
  }

  const allRealizations = await fetchRealizationData();

  const realization = allRealizations.realizations.find(
    (r) => r.slug === slug && r.company === company.toLowerCase()
  );

  if (!realization) {
    return {
      title: "Realizacja nie znaleziona",
    };
  }

  const companyName =
    String(company).charAt(0).toUpperCase() + String(company).slice(1);

  return {
    title: `${realization.heroText} | ${companyName} | Evtrade`,
    description: realization.content
      ? realization.content.substring(0, 160) + "..."
      : `Realizacja ${realization.heroText} dla ${companyName}`,
    openGraph: {
      title: `${realization.heroText} | ${companyName}`,
      description: realization.content?.substring(0, 160),
      images: realization.heroImage ? [{ url: realization.heroImage }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${realization.heroText} | ${companyName}`,
      description: realization.content?.substring(0, 160),
      images: realization.heroImage ? [realization.heroImage] : [],
    },
  };
}
