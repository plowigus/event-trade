import { getCarousel, getOffert, getAbout } from "./queries";

export async function fetchCarouselData() {
  try {
    const data = await getCarousel();
    const carouselResults = data.page.heroCarouselImage;
    const websiteUrl = "https://mateiko.pl";

    const images = Object.values(carouselResults)
      .map((item) => ({
        text: item?.carouselImageText || "",
        url: item?.carouselImage?.node?.filePath
          ? websiteUrl + item.carouselImage.node.filePath
          : null,
        altText:
          item?.carouselImage?.node?.altText || item?.carouselImageText || "",
      }))
      .filter((item) => item.url !== null);

    return {
      images,
      websiteUrl,
      totalImages: images.length,
    };
  } catch (error) {
    console.error("Error fetching carousel data:", error);
    return {
      images: [],
      websiteUrl: "https://mateiko.pl",
      totalImages: 0,
    };
  }
}

export async function fetchOffertData() {
  try {
    const data = await getOffert();
    const offertResults = data.page.offertSection;
    const websiteUrl = "https://mateiko.pl";

    // Wyciągamy wszystkie sekcje oferty (1-6)
    const offertSections = [
      offertResults.offertSection1,
      offertResults.offertSection2,
      offertResults.offertSection3,
      offertResults.offertSection4,
      offertResults.offertSection5,
      offertResults.offertSection6,
    ];

    const offerts = offertSections
      .map((section, index) => {
        if (!section) return null;

        // Zbieramy wszystkie check pola w tablicę
        const checks = [
          section.offertSection1Check || section.offertSection6Check,
          section.offertSection1Check2,
          section.offertSection1Check3 || section.offertSection6Check2,
          section.offertSection1Check4 || section.offertSection6Check3,
          section.offertSection1Check5 || section.offertSection6Check4,
          section.offertSection1Check7 || section.offertSection6Check5,
          section.offertSection1Check8 || section.offertSection6Check6,
          section.offertSection1Check9 || section.offertSection6Check7,
          section.offertSection3Check,
          section.offertSection3Check2,
          section.offertSection3Check3,
          section.offertSection3Check4,
          section.offertSection3Check5,
          section.offertSection3Check6,
          section.offertSection3Check7,
          section.offertSection3Check8,
          section.offertSection3Check9,
          section.offertSection4Check,
          section.offertSection4Check2,
          section.offertSection4Check3,
          section.offertSection4Check4,
          section.offertSection4Check5,
          section.offertSection4Check6,
          section.offertSection4Check7,
          section.offertSection4Check8,
          section.offertSection4Check9,
          section.offertSection5Check,
          section.offertSection5Check2,
          section.offertSection5Check3,
          section.offertSection5Check4,
          section.offertSection5Check5,
          section.offertSection5Check6,
          section.offertSection5Check7,
          section.offertSection5Check8,
          section.offertSection5Check9,
          section.offertSection6Check8,
          section.offertSection6Check9,
        ].filter(Boolean); // Usuwa null/undefined wartości

        return {
          id: index + 1,
          title:
            section.offertSection1Title ||
            section.offertSection3Title ||
            section.offertSection4Title ||
            section.offertSection5Title ||
            section.offertSection6Title ||
            `Oferta ${index + 1}`,
          url:
            section.offertSection1Img?.node?.filePath ||
            section.offertSection3Img?.node?.filePath ||
            section.offertSection4Img?.node?.filePath ||
            section.offertSection5Img?.node?.filePath ||
            section.offertSection6Img?.node?.filePath
              ? websiteUrl +
                (section.offertSection1Img?.node?.filePath ||
                  section.offertSection3Img?.node?.filePath ||
                  section.offertSection4Img?.node?.filePath ||
                  section.offertSection5Img?.node?.filePath ||
                  section.offertSection6Img?.node?.filePath)
              : null,
          checks: checks,
          altText:
            section.offertSection1Title ||
            section.offertSection3Title ||
            section.offertSection4Title ||
            section.offertSection5Title ||
            section.offertSection6Title ||
            `Oferta ${index + 1}`,
        };
      })
      .filter((item) => item !== null && item.url !== null);

    return {
      offerts,
      mainTitle: offertResults.offertSectionTitle || "Nasze Oferty",
      websiteUrl,
      totalOfferts: offerts.length,
    };
  } catch (error) {
    console.error("Error fetching offert data:", error);
    return {
      offerts: [],
      mainTitle: "Nasze Oferty",
      websiteUrl: "https://mateiko.pl",
      totalOfferts: 0,
    };
  }
}

export async function fetchAboutData() {
  try {
    const data = await getAbout();
    const aboutResults = data.page.agencySection;
    const websiteUrl = "https://mateiko.pl";

    return {
      title: aboutResults.agencySectionTitle || "Agencja Eventowa",
      subtitle: aboutResults.agencySectionSubtitle || "",
      text: aboutResults.agencySectionText || "",
      subtext: aboutResults.agencySectionSubtext || "",
      image: {
        url: aboutResults.agencySectionGroup?.agencySectionImage?.node?.filePath
          ? websiteUrl +
            aboutResults.agencySectionGroup.agencySectionImage.node.filePath
          : null,
        alt:
          aboutResults.agencySectionGroup?.agencySectionAlt ||
          aboutResults.agencySectionTitle ||
          "Agency Image",
      },
      websiteUrl,
      fieldGroupName: aboutResults.fieldGroupName || "agencySection",
    };
  } catch (error) {
    console.error("Error fetching about data:", error);
    return {
      title: "Agencja Eventowa",
      subtitle: "",
      text: "Opis agencji...",
      subtext: "",
      image: {
        url: null,
        alt: "Agency Image",
      },
      websiteUrl: "https://mateiko.pl",
      fieldGroupName: "agencySection",
    };
  }
}
