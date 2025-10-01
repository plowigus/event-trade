import {
  getCarousel,
  getOffert,
  getAbout,
  getEventCompany,
  getOurClients,
  getLast4Posts,
  getFooterData,
} from "./queries";

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

export async function fetchCompanyEventData() {
  try {
    const data = await getEventCompany();
    const companyEventResults = data.page.companyEvent;
    const websiteUrl = "https://mateiko.pl";

    return {
      title: companyEventResults.companyEventTitle || "Eventy Firmowe",
      subtitle: companyEventResults.companyEventSubtitle || "",
      text2: companyEventResults.companyEventText2 || "",
      text3: companyEventResults.companyEventText3 || "",
      image: {
        url: companyEventResults.companyEventImg?.node?.filePath
          ? websiteUrl + companyEventResults.companyEventImg.node.filePath
          : null,
        alt:
          companyEventResults.companyEventImgAlt ||
          companyEventResults.companyEventTitle ||
          "Company Event Image",
      },
      websiteUrl,
      fieldGroupName: companyEventResults.fieldGroupName || "companyEvent",
    };
  } catch (error) {
    console.error("Error fetching company event data:", error);
    return {
      title: "Eventy Firmowe",
      subtitle: "",
      text2: "Opis eventów firmowych...",
      text3: "",
      image: {
        url: null,
        alt: "Company Event Image",
      },
      websiteUrl: "https://mateiko.pl",
      fieldGroupName: "companyEvent",
    };
  }
}

export async function fetchOurClientsData() {
  try {
    const data = await getOurClients();
    const ourClientsResults = data.page.ourClients;
    const websiteUrl = "https://mateiko.pl";
    const logoGroup = ourClientsResults.ourClientsImgGroup;

    // Przetwarzamy logo1-logo6 do tablicy
    const logos = [
      {
        id: 1,
        url: logoGroup.logo1?.node?.filePath
          ? websiteUrl + logoGroup.logo1.node.filePath
          : null,
        alt: "Client Logo 1",
      },
      {
        id: 2,
        url: logoGroup.logo2?.node?.filePath
          ? websiteUrl + logoGroup.logo2.node.filePath
          : null,
        alt: "Client Logo 2",
      },
      {
        id: 3,
        url: logoGroup.logo3?.node?.filePath
          ? websiteUrl + logoGroup.logo3.node.filePath
          : null,
        alt: "Client Logo 3",
      },
      {
        id: 4,
        url: logoGroup.logo4?.node?.filePath
          ? websiteUrl + logoGroup.logo4.node.filePath
          : null,
        alt: "Client Logo 4",
      },
      {
        id: 5,
        url: logoGroup.logo5?.node?.filePath
          ? websiteUrl + logoGroup.logo5.node.filePath
          : null,
        alt: "Client Logo 5",
      },
      {
        id: 6,
        url: logoGroup.logo6?.node?.filePath
          ? websiteUrl + logoGroup.logo6.node.filePath
          : null,
        alt: "Client Logo 6",
      },
    ].filter((logo) => logo.url !== null); // Filtrujemy tylko loga z URL

    return {
      title: ourClientsResults.ourClientsTitle || "Nasi Klienci",
      logos: logos,
      websiteUrl,
      fieldGroupName: ourClientsResults.fieldGroupName || "ourClients",
      totalLogos: logos.length,
    };
  } catch (error) {
    console.error("Error fetching our clients data:", error);
    return {
      title: "Nasi Klienci",
      logos: [],
      websiteUrl: "https://mateiko.pl",
      fieldGroupName: "ourClients",
      totalLogos: 0,
    };
  }
}

export async function fetchLast4PostsData() {
  try {
    const data = await getLast4Posts();
    const postsResults = data.posts.nodes;
    const websiteUrl = "https://mateiko.pl";

    // Przetwarzamy posty do struktury używanej w komponencie
    const posts = postsResults.map((post, index) => {
      // Wyciągamy kategorie
      const categories =
        post.categories?.edges?.map((edge) => ({
          id: edge.node.id,
          name: edge.node.name,
        })) || [];

      // Wyciągamy tagi
      const tags = post.tags?.nodes?.map((tag) => tag.name) || [];

      // Sprawdzamy czy jest featured image
      const featuredImage = post.featuredImage?.node?.filePath
        ? websiteUrl + post.featuredImage.node.filePath
        : null;

      return {
        id: post.id,
        title: post.title || `Post ${index + 1}`,
        slug: post.slug || "",
        categories: categories,
        tags: tags,
        featuredImage: {
          url: featuredImage,
          alt: post.title || `Featured image for post ${index + 1}`,
        },
        url: `/blog/${post.slug}` || "#",
      };
    });

    return {
      posts: posts,
      websiteUrl,
      totalPosts: posts.length,
    };
  } catch (error) {
    console.error("Error fetching last 4 posts data:", error);
    return {
      posts: [],
      websiteUrl: "https://mateiko.pl",
      totalPosts: 0,
    };
  }
}

export async function fetchFooterData() {
  try {
    const data = await getFooterData();
    const footerResults = data.page.footerVer1;
    const websiteUrl = "https://mateiko.pl";

    // Przetwarzanie głównej sekcji footer
    const mainSection = {
      title: footerResults.footerVer1Title || "Footer",
      image: {
        url: footerResults.footerVer1?.footerVer1SquareImg?.node?.filePath
          ? websiteUrl +
            footerResults.footerVer1.footerVer1SquareImg.node.filePath
          : null,
        alt: footerResults.footerVer1?.footerVer1SquareImgAlt || "Footer Image",
      },
      text: footerResults.footerVer1?.footerVer1SquareText || "",
    };

    // Przetwarzanie sekcji kontaktowej (mail)
    const contactSection = {
      logo:
        footerResults.footerVer1Square3?.footerVer1SquareMail
          ?.footerVer1SquareAddressLogo || "",
      emails: [
        footerResults.footerVer1Square3?.footerVer1SquareMail
          ?.footerVer1SquareMail1,
        footerResults.footerVer1Square3?.footerVer1SquareMail
          ?.footerVer1SquareMail2,
        footerResults.footerVer1Square3?.footerVer1SquareMail
          ?.footerVer1SquareMail3,
      ].filter(Boolean),
      mailImage: {
        url: footerResults.footerVer1Square3?.footerVer1SquareMail
          ?.footerVer1SquareMailImg?.node?.filePath
          ? websiteUrl +
            footerResults.footerVer1Square3.footerVer1SquareMail
              .footerVer1SquareMailImg.node.filePath
          : null,
        alt:
          footerResults.footerVer1Square3?.footerVer1SquareMail
            ?.footerVer1SquareMailImgAlt || "Mail Icon",
      },
    };

    // Przetwarzanie sekcji adresowej i godzin
    const addressSection = {
      address: footerResults.footerVer2Square?.footerVer1SquareAddress || "",
      hours: footerResults.footerVer2Square?.footerVer1SquareHour || "",
      hoursImage: {
        url: footerResults.footerVer2Square?.footerVer1SquareHourLogo?.node
          ?.filePath
          ? websiteUrl +
            footerResults.footerVer2Square.footerVer1SquareHourLogo.node
              .filePath
          : null,
        alt:
          footerResults.footerVer2Square?.footerVer1SquareHourImgAlt ||
          "Hours Icon",
      },
      mainImage: {
        url: footerResults.footerVer2Square?.footerVer1SquareImg?.node?.filePath
          ? websiteUrl +
            footerResults.footerVer2Square.footerVer1SquareImg.node.filePath
          : null,
        alt:
          footerResults.footerVer2Square?.footerVer1SquareImgAlt ||
          "Address Image",
      },
      detailedAddress: {
        street:
          footerResults.footerVer2Square?.footerVer2SquareAddress
            ?.footerVer2SquareAddressStreet || "",
        city:
          footerResults.footerVer2Square?.footerVer2SquareAddress
            ?.footerVer2SquareAddressCity || "",
        zip:
          footerResults.footerVer2Square?.footerVer2SquareAddress
            ?.footerVer2SquareAddressZip || "",
        logo: {
          url: footerResults.footerVer2Square?.footerVer2SquareAddress
            ?.footerVer2SquareAddressLogo?.node?.filePath
            ? websiteUrl +
              footerResults.footerVer2Square.footerVer2SquareAddress
                .footerVer2SquareAddressLogo.node.filePath
            : null,
          alt:
            footerResults.footerVer2Square?.footerVer2SquareAddress
              ?.footerVer2SquareAddressLogoAlt || "Address Logo",
        },
      },
    };

    return {
      mainSection,
      contactSection,
      addressSection,
      websiteUrl,
      fieldGroupName: footerResults.fieldGroupName || "footerVer1",
    };
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return {
      mainSection: {
        title: "Footer",
        image: { url: null, alt: "Footer Image" },
        text: "",
      },
      contactSection: {
        logo: "",
        emails: [],
        mailImage: { url: null, alt: "Mail Icon" },
      },
      addressSection: {
        address: "",
        hours: "",
        hoursImage: { url: null, alt: "Hours Icon" },
        mainImage: { url: null, alt: "Address Image" },
        detailedAddress: {
          street: "",
          city: "",
          zip: "",
          logo: { url: null, alt: "Address Logo" },
        },
      },
      websiteUrl: "https://mateiko.pl",
      fieldGroupName: "footerVer1",
    };
  }
}
