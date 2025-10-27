import {
  getCarousel,
  getOffert,
  getAbout,
  getEventCompany,
  getOurClients,
  getLast4Posts,
  getFooterData,
  getTeamHero,
  getTeamSection,
  getReferenceSection,
  fetchRealizationPost,
  fetchOfferPosts as fetchOfferPostsQuery,
  fetchOfferBySlug as fetchOfferBySlugQuery,
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

// Funkcja do pobierania tylko logotypów firm z referencji dla karuzeli
export async function fetchClientLogosData() {
  try {
    const data = await getReferenceSection();

    if (!data?.page?.logoReferenceSection) {
      console.error("❌ Missing logoReferenceSection in data:", data);
      return {
        title: "Nasi Klienci",
        logos: [],
        totalLogos: 0,
      };
    }

    const referenceResults = data.page.logoReferenceSection;
    const websiteUrl = "https://mateiko.pl";

    console.log(
      "🔍 Reference results:",
      Object.keys(referenceResults).length,
      "items"
    );

    // Wyciągnij wszystkie logotypy bez filtrowania duplikatów na razie
    const logos = Object.values(referenceResults)
      .map((item, index) => {
        const company = item?.company || "";
        const imageUrl = item?.imgage?.node?.filePath
          ? websiteUrl + item.imgage.node.filePath
          : null;

        console.log(`Item ${index}:`, { company, hasImage: !!imageUrl });

        // Zwróć wszystkie które mają dane
        if (company && imageUrl) {
          return {
            id: `logo-${index}`,
            company: company,
            url: imageUrl,
            alt: `Logo ${company}`,
          };
        }
        return null;
      })
      .filter(Boolean); // Usuń null wartości

    console.log("🎯 Found logos:", logos.length);
    console.log(
      "📝 Companies:",
      logos.map((l) => l.company)
    );

    return {
      title: "Nasi Klienci",
      logos,
      totalLogos: logos.length,
    };
  } catch (error) {
    console.error("Error fetching client logos data:", error);
    return {
      title: "Nasi Klienci",
      logos: [],
      totalLogos: 0,
    };
  }
}

export async function fetchTeamHeroData() {
  try {
    const data = await getTeamHero();
    const teamHeroResults = data.page.heroZespol;
    const websiteUrl = "https://mateiko.pl";

    // Przetwarzanie hero image
    const heroImage = {
      url: teamHeroResults.heroTeam?.node?.filePath
        ? websiteUrl + teamHeroResults.heroTeam.node.filePath
        : null,
      alt: "Team Hero Image",
    };

    // Przetwarzanie tekstów hero
    const heroText = {
      mainTitle: teamHeroResults.heroTextTeam?.mainTitle || "Nasz Zespół",
      subtitle: teamHeroResults.heroTextTeam?.subtextTitlE || "",
      fieldGroupName:
        teamHeroResults.heroTextTeam?.fieldGroupName || "heroTextTeam",
    };

    return {
      heroImage,
      heroText,
      websiteUrl,
      pageId: data.page.id,
    };
  } catch (error) {
    console.error("Error fetching team hero data:", error);
    return {
      heroImage: {
        url: null,
        alt: "Team Hero Image",
      },
      heroText: {
        mainTitle: "Nasz Zespół",
        subtitle: "",
        fieldGroupName: "heroTextTeam",
      },
      websiteUrl: "https://mateiko.pl",
      pageId: "zespol",
    };
  }
}

export async function fetchTeamSectionData() {
  try {
    const data = await getTeamSection();
    const teamSection = data.page.teamSection;
    const websiteUrl = "https://mateiko.pl";

    // Przetwarzanie danych zespołu
    const teammates = [
      {
        name: teamSection.firstTeammate?.teamName || "Członek zespołu 1",
        description:
          teamSection.firstTeammate?.teamDesc || "Opis członka zespołu",
        photo: teamSection.firstTeammate?.teamatePhoto?.node?.filePath
          ? websiteUrl + teamSection.firstTeammate.teamatePhoto.node.filePath
          : "/images/default-team-member.jpg",
        altText:
          teamSection.firstTeammate?.teamName || "Zdjęcie członka zespołu",
      },
      {
        name: teamSection.secTeammate?.teamName || "Członek zespołu 2",
        description:
          teamSection.secTeammate?.teamDesc || "Opis członka zespołu",
        photo: teamSection.secTeammate?.teamatePhoto?.node?.filePath
          ? websiteUrl + teamSection.secTeammate.teamatePhoto.node.filePath
          : "/images/default-team-member.jpg",
        altText: teamSection.secTeammate?.teamName || "Zdjęcie członka zespołu",
      },
      {
        name: teamSection.thirdTeammate?.teamName || "Członek zespołu 3",
        description:
          teamSection.thirdTeammate?.teamDesc || "Opis członka zespołu",
        photo: teamSection.thirdTeammate?.teamatePhoto?.node?.filePath
          ? websiteUrl + teamSection.thirdTeammate.teamatePhoto.node.filePath
          : "/images/default-team-member.jpg",
        altText:
          teamSection.thirdTeammate?.teamName || "Zdjęcie członka zespołu",
      },
    ];

    return {
      teammates,
      websiteUrl,
      totalMembers: teammates.length,
      pageId: data.page.id,
    };
  } catch (error) {
    console.error("Error fetching team section data:", error);

    // Fallback data
    return {
      teammates: [
        {
          name: "Anna Nowak",
          description: "Specjalista ds. organizacji eventów",
          photo: "/images/default-team-member.jpg",
          altText: "Anna Nowak",
        },
        {
          name: "Ada Kowalczyk",
          description: "Kierownik projektów",
          photo: "/images/default-team-member.jpg",
          altText: "Ada Kowalczyk",
        },
        {
          name: "Adam Kowalczyk",
          description: "Dyrektor kreatywny",
          photo: "/images/default-team-member.jpg",
          altText: "Adam Kowalczyk",
        },
      ],
      websiteUrl: "https://mateiko.pl",
      totalMembers: 3,
      pageId: "zespol",
    };
  }
}

export async function fetchReferenceData() {
  try {
    const data = await getReferenceSection();

    if (!data?.page?.logoReferenceSection) {
      console.error("❌ Missing logoReferenceSection in data:", data);
      return {
        references: [],
        websiteUrl: "https://mateiko.pl",
        totalReferences: 0,
      };
    }

    const referenceResults = data.page.logoReferenceSection;
    const websiteUrl = "https://mateiko.pl";

    const references = Object.values(referenceResults)
      .map((item) => ({
        company: item?.company || "",
        name: item?.name || "",
        referenceText: item?.referenceText || "",
        role: item?.role || "",
        stars: item?.stars || 5,
        image: item?.imgage?.node?.filePath
          ? websiteUrl + item.imgage.node.filePath
          : null,
        altText: item?.name || "Reference image",
      }))
      .filter((item) => item.name && item.company);

    return {
      references,
      websiteUrl,
      totalReferences: references.length,
      pageId: "referencje",
    };
  } catch (error) {
    console.error("Error fetching reference data:", error);
    return {
      references: [],
      websiteUrl: "https://mateiko.pl",
      totalReferences: 0,
      pageId: "referencje",
    };
  }
}

// Funkcja do pobierania realizacji z konkretnym tagiem
export async function fetchRealizationsByTag(tagName) {
  try {
    const allData = await fetchRealizationData();

    const filteredRealizations = allData.realizations.filter((realization) => {
      return realization.tags.some(
        (tag) =>
          tag.slug.toLowerCase() === tagName.toLowerCase() ||
          tag.name.toLowerCase() === tagName.toLowerCase()
      );
    });

    return {
      ...allData,
      realizations: filteredRealizations,
      totalRealizations: filteredRealizations.length,
      filterTag: tagName,
    };
  } catch (error) {
    console.error(`Error fetching realizations for tag ${tagName}:`, error);
    return {
      realizations: [],
      websiteUrl: "https://mateiko.pl",
      totalRealizations: 0,
      pageId: "realizacje",
      filterTag: tagName,
    };
  }
}

// Funkcja do pobierania realizacji z konkretnej firmy
export async function fetchRealizationsByCompany(company) {
  try {
    const allData = await fetchRealizationData();

    const filteredRealizations = allData.realizations.filter((realization) => {
      return realization.company === company.toLowerCase();
    });

    return {
      ...allData,
      realizations: filteredRealizations,
      totalRealizations: filteredRealizations.length,
      filterCompany: company,
    };
  } catch (error) {
    console.error(`Error fetching realizations for company ${company}:`, error);
    return {
      realizations: [],
      websiteUrl: "https://mateiko.pl",
      totalRealizations: 0,
      pageId: "realizacje",
      filterCompany: company,
    };
  }
}

// Funkcja do pobierania unikalnych tagów z wszystkich realizacji
export async function getRealizationTags() {
  try {
    const allData = await fetchRealizationData();

    const allTags = allData.realizations.flatMap(
      (realization) => realization.tags
    );
    const uniqueTags = allTags.filter(
      (tag, index, self) => index === self.findIndex((t) => t.slug === tag.slug)
    );

    // Wyciągnij unikalne firmy z company field (które są już określone przez kategorie)
    const allCompanies = allData.realizations
      .map((realization) => realization.company)
      .filter((company) => company && company !== "inne"); // Filtruj puste i "inne"

    const uniqueCompanies = [...new Set(allCompanies)].sort();

    return {
      tags: uniqueTags,
      companies: uniqueCompanies,
      totalTags: uniqueTags.length,
      totalCompanies: uniqueCompanies.length,
    };
  } catch (error) {
    console.error("Error fetching realization tags:", error);
    return {
      tags: [],
      companies: [],
      totalTags: 0,
      totalCompanies: 0,
    };
  }
}

// Funkcja do pobierania ostatnich 4 realizacji dla BlogSection
export async function fetchLast4RealizationsData() {
  try {
    const data = await fetchRealizationPost();
    const realizationResults = data.posts.edges;
    const websiteUrl = "https://mateiko.pl";

    // Weź tylko pierwsze 4 realizacje
    const last4Realizations = realizationResults.slice(0, 4).map((edge) => {
      const post = edge.node;
      const blocks = post.blocks || [];

      // Funkcja do wyciągnięcia tekstu z HTML
      const extractTextFromHTML = (html) => {
        if (!html) return "";
        return html.replace(/<[^>]*>/g, "").trim();
      };

      // Wyciągnij dane z bloków
      let heroText = "";
      let heroImage = "";
      let description = "";

      blocks.forEach((block) => {
        if (block.name === "core/heading") {
          const headingText = extractTextFromHTML(block.originalContent);
          if (headingText && !heroText) {
            heroText = headingText;
          }
        } else if (block.name === "core/image") {
          if (block.attributesJSON) {
            try {
              const attributes = JSON.parse(block.attributesJSON);
              if (attributes.url && !heroImage) {
                heroImage = attributes.url;
              }
            } catch (e) {
              // Ignore parsing errors
            }
          }
        } else if (block.name === "core/paragraph") {
          const paragraphText = extractTextFromHTML(block.originalContent);
          if (paragraphText && !description) {
            description = paragraphText;
          }
        }
      });

      // Wyciągnij firmę z kategorii (subkategoria to firma: Lexus, Allegro, OSPTN)
      let company = "";
      const categories = post.categories?.nodes || [];
      // Znajdź subkategorię (ta która ma parent "realizacje")
      const subCategory = categories.find(
        (cat) => cat.parent?.node?.name?.toLowerCase() === "realizacje"
      );
      if (subCategory) {
        company = subCategory.name;
      } else if (categories.length > 0) {
        // Fallback - użyj pierwszej kategorii która nie jest "realizacje"
        const nonRealizacjeCategory = categories.find(
          (cat) => cat.name?.toLowerCase() !== "realizacje"
        );
        company = nonRealizacjeCategory
          ? nonRealizacjeCategory.name
          : categories[0].name;
      }

      // Wyciągnij tagi
      const tags = post.tags?.nodes?.map((tag) => tag.name) || [];

      return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        heroText: heroText,
        heroImage: heroImage,
        description: description,
        company: company,
        tags: tags.slice(0, 4), // Maksymalnie 4 tagi
        categories: categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
        })),
      };
    });

    return {
      realizations: last4Realizations,
      totalRealizations: last4Realizations.length,
    };
  } catch (error) {
    console.error("Error fetching last 4 realizations:", error);
    return {
      realizations: [],
      totalRealizations: 0,
    };
  }
}

export async function fetchRealizationData() {
  try {
    const data = await fetchRealizationPost();
    const realizationResults = data.posts.edges;
    const websiteUrl = "https://mateiko.pl";

    const realizations = realizationResults
      .map((edge) => {
        const post = edge.node;
        const blocks = post.blocks || [];

        // Funkcja do wyciągnięcia tekstu z HTML
        const extractTextFromHTML = (html) => {
          if (!html) return "";
          return html.replace(/<[^>]*>/g, "").trim();
        };

        // Funkcja do wyciągnięcia obrazów z HTML galerii
        const extractImagesFromGallery = (dynamicContent) => {
          if (!dynamicContent) return [];
          const imgRegex =
            /<img[^>]+src="([^"]+)"[^>]*(?:alt="([^"]*)")?[^>]*>/g;
          const images = [];
          let match;

          while ((match = imgRegex.exec(dynamicContent)) !== null) {
            images.push({
              url: match[1],
              alt: match[2] || "",
              id: images.length,
            });
          }

          return images;
        };

        // Wyciągnij WSZYSTKIE bloki każdego typu
        const imageBlocks = blocks.filter(
          (block) => block.name === "core/image"
        );
        const headingBlocks = blocks.filter(
          (block) => block.name === "core/heading"
        );
        const paragraphBlocks = blocks.filter(
          (block) => block.name === "core/paragraph"
        );
        const galleryBlocks = blocks.filter(
          (block) => block.name === "core/gallery"
        );
        const embedBlocks = blocks.filter(
          (block) => block.name === "core/embed"
        );
        const coverBlocks = blocks.filter(
          (block) => block.name === "core/cover"
        );

        // Parse wszystkie obrazy
        const images = imageBlocks
          .map((block, index) => {
            try {
              const parsed = JSON.parse(block.attributesJSON || "{}");
              // Spróbuj też wyciągnąć z originalContent
              const srcMatch = block.originalContent?.match(/src="([^"]+)"/);
              const altMatch = block.originalContent?.match(/alt="([^"]*)"/);

              return {
                id: index,
                url:
                  parsed.url || parsed.src || (srcMatch ? srcMatch[1] : null),
                alt:
                  parsed.alt ||
                  (altMatch ? altMatch[1] : "") ||
                  `Image ${index + 1}`,
                caption: parsed.caption || "",
                className: parsed.className || "",
                originalContent: block.originalContent || "",
                dynamicContent: block.dynamicContent || "",
              };
            } catch (e) {
              console.warn("Error parsing image block:", e);
              return null;
            }
          })
          .filter(Boolean);

        // Parse wszystkie nagłówki
        const headings = headingBlocks
          .map((block, index) => {
            try {
              const parsed = JSON.parse(block.attributesJSON || "{}");
              // Wyciągnij tekst z originalContent
              const textContent = extractTextFromHTML(block.originalContent);

              return {
                id: index,
                content: textContent || parsed.content || "",
                level: parsed.level || 2,
                className: parsed.className || "",
                anchor: parsed.anchor || "",
                originalContent: block.originalContent || "",
                dynamicContent: block.dynamicContent || "",
              };
            } catch (e) {
              console.warn("Error parsing heading block:", e);
              return null;
            }
          })
          .filter(Boolean);

        // Parse wszystkie paragrafy
        const paragraphs = paragraphBlocks
          .map((block, index) => {
            try {
              const parsed = JSON.parse(block.attributesJSON || "{}");
              // Wyciągnij tekst z originalContent
              const textContent = extractTextFromHTML(block.originalContent);

              return {
                id: index,
                content: textContent || parsed.content || "",
                dropCap: parsed.dropCap || false,
                anchor: parsed.anchor || "",
                className: parsed.className || "",
                originalContent: block.originalContent || "",
                dynamicContent: block.dynamicContent || "",
              };
            } catch (e) {
              console.warn("Error parsing paragraph block:", e);
              return null;
            }
          })
          .filter(Boolean);

        // Parse wszystkie galerie
        const galleries = galleryBlocks
          .map((block, index) => {
            try {
              const parsed = JSON.parse(block.attributesJSON || "{}");
              // Wyciągnij obrazy z dynamicContent
              const imagesFromHTML = extractImagesFromGallery(
                block.dynamicContent
              );

              return {
                id: index,
                images:
                  imagesFromHTML.length > 0
                    ? imagesFromHTML
                    : parsed.images || [],
                columns: parsed.columns || 3,
                imageCrop: parsed.imageCrop !== false,
                linkTo: parsed.linkTo || "none",
                sizeSlug: parsed.sizeSlug || "large",
                className: parsed.className || "",
                originalContent: block.originalContent || "",
                dynamicContent: block.dynamicContent || "",
                totalImages: imagesFromHTML.length,
              };
            } catch (e) {
              console.warn("Error parsing gallery block:", e);
              return null;
            }
          })
          .filter(Boolean);

        // Parse wszystkie embedy
        const embeds = embedBlocks
          .map((block, index) => {
            try {
              const parsed = JSON.parse(block.attributesJSON || "{}");
              // Wyciągnij URL z originalContent jeśli nie ma w attributesJSON
              const urlMatch =
                block.originalContent?.match(/https:\/\/[^\s<>"]+/);

              return {
                id: index,
                url: parsed.url || (urlMatch ? urlMatch[0] : ""),
                type: parsed.type || "",
                providerNameSlug: parsed.providerNameSlug || "",
                responsive: parsed.responsive !== false,
                allowResponsive: parsed.allowResponsive !== false,
                className: parsed.className || "",
                originalContent: block.originalContent || "",
                dynamicContent: block.dynamicContent || "",
              };
            } catch (e) {
              console.warn("Error parsing embed block:", e);
              return null;
            }
          })
          .filter(Boolean);

        // Parse wszystkie cover bloki (hero sections)
        const covers = coverBlocks
          .map((block, index) => {
            try {
              const parsed = JSON.parse(block.attributesJSON || "{}");
              // Spróbuj wyciągnąć URL z originalContent
              const urlMatch = block.originalContent?.match(/url\(([^)]+)\)/);

              return {
                id: index,
                url: parsed.url || (urlMatch ? urlMatch[1] : ""),
                backgroundType: parsed.backgroundType || "image",
                dimRatio: parsed.dimRatio || 50,
                overlayColor: parsed.overlayColor || "",
                customOverlayColor: parsed.customOverlayColor || "",
                className: parsed.className || "",
                originalContent: block.originalContent || "",
                dynamicContent: block.dynamicContent || "",
              };
            } catch (e) {
              console.warn("Error parsing cover block:", e);
              return null;
            }
          })
          .filter(Boolean);

        // Wyciągnij tagi z posta
        const tags =
          post.tags?.nodes?.map((tag) => ({
            id: tag.id,
            name: tag.name,
            slug: tag.slug,
          })) || [];

        // Wyciągnij kategorie z posta
        const categories =
          post.categories?.nodes?.map((category) => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
            parent: category.parent?.node
              ? {
                  id: category.parent.node.id,
                  name: category.parent.node.name,
                  slug: category.parent.node.slug,
                }
              : null,
          })) || [];

        // Sprawdź jakiej firmy dotyczy realizacja na podstawie kategorii
        const getCompanyFromCategories = (categories) => {
          // Znajdź podkategorię realizacji (kategoria która ma parent "realizacje")
          const realizationSubcategory = categories.find(
            (cat) =>
              cat.parent &&
              (cat.parent.slug === "realizacje" ||
                cat.parent.name.toLowerCase() === "realizacje")
          );

          if (realizationSubcategory) {
            // Oczyść nazwę firmy z sufiksów typu "-realizacje"
            let companySlug = realizationSubcategory.slug.toLowerCase();
            const originalSlug = companySlug;

            // Usuń typowe sufiksy
            companySlug = companySlug.replace(/-realizacje$/, "");
            companySlug = companySlug.replace(/-realizacja$/, "");
            companySlug = companySlug.replace(/-events?$/, "");
            companySlug = companySlug.replace(/-eventy?$/, "");

            return companySlug;
          }

          // Fallback - sprawdź kategorie bezpośrednio
          const categorySlugs = categories.map((c) => c.slug.toLowerCase());

          // Automotive brands
          if (categorySlugs.includes("lexus")) return "lexus";
          if (categorySlugs.includes("bmw")) return "bmw";
          if (categorySlugs.includes("mercedes")) return "mercedes";
          if (categorySlugs.includes("audi")) return "audi";
          if (categorySlugs.includes("toyota")) return "toyota";
          if (
            categorySlugs.includes("volkswagen") ||
            categorySlugs.includes("vw")
          )
            return "volkswagen";
          if (categorySlugs.includes("porsche")) return "porsche";
          if (categorySlugs.includes("volvo")) return "volvo";

          // Tech & E-commerce
          if (categorySlugs.includes("allegro")) return "allegro";
          if (
            categorySlugs.includes("optim") ||
            categorySlugs.includes("osptn")
          )
            return "optim";
          if (categorySlugs.includes("microsoft")) return "microsoft";
          if (categorySlugs.includes("google")) return "google";
          if (categorySlugs.includes("apple")) return "apple";
          if (categorySlugs.includes("samsung")) return "samsung";

          // Finance & Banking
          if (categorySlugs.includes("pko") || categorySlugs.includes("pkobp"))
            return "pko";
          if (categorySlugs.includes("mbank")) return "mbank";
          if (categorySlugs.includes("ing")) return "ing";
          if (categorySlugs.includes("santander")) return "santander";

          // Other brands
          if (
            categorySlugs.includes("coca-cola") ||
            categorySlugs.includes("cocacola")
          )
            return "coca-cola";
          if (categorySlugs.includes("pepsi")) return "pepsi";
          if (categorySlugs.includes("nike")) return "nike";
          if (categorySlugs.includes("adidas")) return "adidas";

          return "inne";
        };

        const company = getCompanyFromCategories(categories);

        // Wyciągnij podstawowe dane posta
        const heroImage = images[0]?.url || covers[0]?.url || null;
        const heroText = headings[0]?.content || post.title || "Realizacja";
        const mainContent = paragraphs
          .map((p) => p.content)
          .filter(Boolean)
          .join(" ");
        const galleryImages = galleries.length > 0 ? galleries[0].images : [];
        const videoEmbed = embeds.find(
          (e) =>
            e.type === "video" ||
            e.url.includes("youtube") ||
            e.url.includes("vimeo")
        );

        return {
          id: post.id,
          slug: post.slug || "",
          title: heroText,

          // Podstawowe dane
          heroImage: heroImage,
          heroText: heroText,
          content: mainContent,

          // Tagi, kategorie i firma
          tags: tags,
          categories: categories,
          company: company,
          companyName: company.charAt(0).toUpperCase() + company.slice(1),

          // Kompletne dane bloków
          allImages: images,
          allHeadings: headings,
          allParagraphs: paragraphs,
          allGalleries: galleries,
          allEmbeds: embeds,
          allCovers: covers,

          // Szybki dostęp do głównych elementów
          mainGallery: galleryImages,
          videoEmbed: videoEmbed,

          // Raw data dla debugowania
          rawBlocks: blocks,
          totalBlocks: blocks.length,
        };
      })
      .filter((item) => item.id);

    return {
      realizations,
      websiteUrl,
      totalRealizations: realizations.length,
      pageId: "realizacje",
    };
  } catch (error) {
    console.error("Error fetching realization data:", error);
    return {
      realizations: [],
      websiteUrl: "https://mateiko.pl",
      totalRealizations: 0,
      pageId: "realizacje",
    };
  }
}

// ===== OFFER FUNCTIONS =====

// Funkcja do parsowania bloków ofert z Gutenberg
export function parseOfferBlocks(blocks) {
  const content = {
    heading: "",
    subtitle: "",
    boldText: "",
    firstSection: "",
    secondSection: "",
    boxSection: {
      title: "",
      text: "",
      cta: "",
    },
    questionTitle: "",
    listItems: [],
    images: [],
  };

  blocks.forEach((block) => {
    // Parsuj metadata name
    let metadataName = null;
    if (block.attributes && block.attributes.metadata) {
      try {
        const metadata = JSON.parse(block.attributes.metadata);
        metadataName = metadata.name;
      } catch (e) {
        // Ignore parsing errors
      }
    }

    switch (block.name) {
      case "core/heading":
        content.heading = block.originalContent;
        break;

      case "core/paragraph":
        switch (metadataName) {
          case "subtitle":
            content.subtitle = block.originalContent;
            break;
          case "bold-text":
            content.boldText = block.originalContent;
            break;
          case "first-section":
            content.firstSection = block.originalContent;
            break;
          case "second-section":
            content.secondSection = block.originalContent;
            break;
          case "box-title":
            content.boxSection.title = block.originalContent;
            break;
          case "box-text":
            content.boxSection.text = block.originalContent;
            break;
          case "box-cta":
            content.boxSection.cta = block.originalContent;
            break;
          case "question-title":
            content.questionTitle = block.originalContent;
            break;
          default:
            // Dynamiczne obsługiwanie list-title i list-text
            if (metadataName && metadataName.startsWith("list-title")) {
              // Wyciągnij indeks z nazwy (list-title, list-title-2, list-title-3, etc.)
              const match = metadataName.match(/list-title(?:-(\d+))?/);
              const titleIndex = match[1] ? parseInt(match[1]) - 1 : 0;

              if (!content.listItems[titleIndex]) {
                content.listItems[titleIndex] = {};
              }
              content.listItems[titleIndex].title = block.originalContent;
              content.listItems[titleIndex].id = titleIndex + 1;
            } else if (metadataName && metadataName.startsWith("list-text")) {
              // Wyciągnij indeks z nazwy (list-text, list-text-2, list-text-3, etc.)
              const match = metadataName.match(/list-text(?:-(\d+))?/);
              const textIndex = match[1] ? parseInt(match[1]) - 1 : 0;

              if (!content.listItems[textIndex]) {
                content.listItems[textIndex] = {};
              }
              content.listItems[textIndex].text = block.originalContent;
              content.listItems[textIndex].id = textIndex + 1;
            }
            break;
        }
        break;

      case "core/image":
        try {
          const attributes = JSON.parse(block.attributesJSON);
          content.images.push({
            url: attributes.url,
            alt: attributes.alt || "",
            title: attributes.title || "",
            id: attributes.id,
          });
        } catch (e) {
          // Fallback if parsing fails
          if (block.dynamicContent) {
            content.images.push({
              url: "", // Extract from dynamicContent if needed
              alt: "",
              title: "",
              id: null,
            });
          }
        }
        break;
    }
  });

  // Usuń puste elementy z listItems i posortuj
  content.listItems = content.listItems.filter(
    (item) => item && (item.title || item.text)
  );

  return content;
}

// Funkcja do pobierania postów ofert z queries.js
export async function fetchOfferPosts() {
  try {
    const data = await fetchOfferPostsQuery();

    const offers = data.posts.edges.map((edge) => {
      const parsedContent = parseOfferBlocks(edge.node.blocks);

      return {
        id: edge.node.id,
        title: edge.node.title,
        slug: edge.node.slug,
        content: parsedContent,
      };
    });

    return {
      offers,
      totalOffers: offers.length,
    };
  } catch (error) {
    console.error("Error fetching offer posts:", error);
    return {
      offers: [],
      totalOffers: 0,
    };
  }
}

// Funkcja do pobierania pojedynczej oferty po slug z queries.js
export async function fetchOfferBySlug(slug) {
  try {
    const data = await fetchOfferBySlugQuery(slug);

    if (!data.post) {
      return null;
    }

    const parsedContent = parseOfferBlocks(data.post.blocks);

    return {
      id: data.post.id,
      title: data.post.title,
      slug: data.post.slug,
      excerpt: data.post.excerpt,
      content: parsedContent,
    };
  } catch (error) {
    console.error(`Error fetching offer by slug ${slug}:`, error);
    return null;
  }
}
