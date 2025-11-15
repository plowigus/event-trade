import { gql } from "graphql-request";
import { graphQLClient } from "../lib/graphql-request";

//Queries GraphQL

const GET_HERO_DATA = gql`
  query GetStartPage {
    page(id: "start", idType: URI) {
      id
      heroSection {
        fieldGroupName
        heroBackgroundAlt
        heroSectionTilteFirst
        heroSectionTilteSecond
        heroLogoHeader {
          node {
            filePath
          }
        }
        heroImage {
          node {
            filePath
          }
        }
      }
    }
  }
`;

const GET_HERO_TEXT = gql`
  query GetStartPage {
    page(id: "start", idType: URI) {
      id
      heroTextSection {
        title
        subText
        fieldGroupName
      }
    }
  }
`;

const GET_MENU = gql`
  query GetStartPage {
    menu(id: "main", idType: NAME) {
      id
      menuItems {
        nodes {
          id
          path
          order
          label
        }
      }
    }
  }
`;

const GET_MENU_IMG = gql`
  query GetStartPage {
    page(id: "start", idType: URI) {
      id
      heroTextSection {
        menuImg {
          node {
            filePath
          }
        }
      }
    }
  }
`;

const GET_GREEK_SECTION = gql`
  query GetStartPage {
    page(id: "start", idType: URI) {
      id
      greekHeadTextSectionSummer {
        greekHeadSummer
        fieldGroupName
        greekHeadSummerText {
          fieldGroupName
          summerChceck
          summerCheck2
          summerCheck21
          summerCheck22
          summerCheck23
          summerCheck24
          summerCheck3
          summerTitle
          summerTitle2
        }
      }
      heroGreekHead {
        greekHeadAlt
        greekHeadMovie
        greekHead {
          node {
            uri
            filePath
          }
        }
      }
      greekHeadTextSectionAutumn {
        greekHeadAutumn
        fieldGroupName
        greekHeadAutumnText {
          fieldGroupName
          summerChceck
          summerCheck2
          summerCheck21
          summerCheck22
          summerCheck23
          summerCheck24
          summerCheck3
          summerTitle
          summerTitle2
        }
      }
      greekHeadTextSectionSpring {
        fieldGroupName
        greekHeadSpring
        greekHeadSpringText {
          fieldGroupName
          summerChceck
          summerCheck2
          summerCheck21
          summerCheck22
          summerCheck23
          summerCheck24
          summerCheck3
          summerTitle
          summerTitle2
        }
      }
      greekHeadTextSectionWinter {
        greekHeadWinter
        fieldGroupName
        greekHeadWinterText {
          fieldGroupName
          summerChceck
          summerCheck2
          summerCheck21
          summerCheck22
          summerCheck23
          summerCheck24
          summerCheck3
          summerTitle
          summerTitle2
        }
      }
    }
  }
`;

const GET_CAROUSEL = gql`
  query GetStartPage {
    page(id: "start", idType: URI) {
      id
      heroCarouselImage {
        fieldGroupName
        heroCarousel
        heroCarouselImageTitle
        carouselImage {
          carouselImage {
            node {
              filePath
            }
          }
          carouselImageText
          fieldGroupName
        }
        carouselImage2 {
          carouselImage {
            node {
              filePath
            }
          }
          carouselImageText
          fieldGroupName
        }
        carouselImage3 {
          carouselImageText
          fieldGroupName
          carouselImage {
            node {
              filePath
            }
          }
        }
        carouselImage4 {
          carouselImageText
          fieldGroupName
          carouselImage {
            node {
              filePath
            }
          }
        }
        carouselImage5 {
          carouselImageText
          fieldGroupName
          carouselImage {
            node {
              filePath
            }
          }
        }
        carouselImage6 {
          carouselImageText
          fieldGroupName
          carouselImage {
            node {
              filePath
            }
          }
        }
      }
    }
  }
`;

const GET_OFFERT = gql`
  query GetStartPage {
    page(id: "start", idType: URI) {
      id
      offertSection {
        fieldGroupName
        offertSection1 {
          fieldGroupName
          offertSection1Check
          offertSection1Check2
          offertSection1Check3
          offertSection1Check4
          offertSection1Check5
          offertSection1Check7
          offertSection1Check8
          offertSection1Check9
          offertSection1Title
          offertSection1Img {
            node {
              filePath
            }
          }
        }
        offertSection3 {
          fieldGroupName
          offertSection3Check
          offertSection3Check2
          offertSection3Check3
          offertSection3Check4
          offertSection3Check5
          offertSection3Check6
          offertSection3Check7
          offertSection3Check8
          offertSection3Check9
          offertSection3Title
          offertSection3Img {
            node {
              filePath
            }
          }
        }
        offertSection4 {
          fieldGroupName
          offertSection4Check
          offertSection4Check3
          offertSection4Check2
          offertSection4Check4
          offertSection4Check5
          offertSection4Check6
          offertSection4Check7
          offertSection4Check8
          offertSection4Check9
          offertSection4Title
          offertSection4Img {
            node {
              filePath
            }
          }
        }
        offertSection5 {
          fieldGroupName
          offertSection5Check
          offertSection5Check2
          offertSection5Check3
          offertSection5Check4
          offertSection5Check5
          offertSection5Check6
          offertSection5Check7
          offertSection5Check8
          offertSection5Check9
          offertSection5Title
          offertSection5Img {
            node {
              filePath
            }
          }
        }
        offertSectionTitle
        offertSection6 {
          fieldGroupName
          offertSection6Check
          offertSection6Check2
          offertSection6Check3
          offertSection6Check4
          offertSection6Check5
          offertSection6Check6
          offertSection6Check7
          offertSection6Check8
          offertSection6Check9
          offertSection6Img {
            node {
              filePath
            }
          }
          offertSection6Title
        }
        offertSection2 {
          fieldGroupName
          offertSection1Check
          offertSection1Check2
          offertSection1Check3
          offertSection1Check4
          offertSection1Check5
          offertSection1Check7
          offertSection1Check8
          offertSection1Check9
          offertSection1Title
          offertSection1Img {
            node {
              filePath
            }
          }
        }
      }
    }
  }
`;

const GET_ABOUT = gql`
  query GetStartPage {
    page(id: "start", idType: URI) {
      id
      agencySection {
        fieldGroupName
        agencySectionTitle
        agencySectionSubtitle
        agencySectionText
        agencySectionSubtext
        agencySectionGroup {
          agencySectionAlt
          agencySectionImage {
            node {
              filePath
            }
          }
        }
      }
    }
  }
`;

const GET_COMPANY_EVENT = gql`
  query GetStartPage {
    page(id: "start", idType: URI) {
      id
      companyEvent {
        companyEventImgAlt
        companyEventSubtitle
        companyEventText
        companyEventText2
        companyEventText3
        companyEventTitle
        fieldGroupName
        companyEventImg {
          node {
            filePath
          }
        }
      }
    }
  }
`;

const GET_OUR_CLIENT = gql`
  query GetStartPage {
    page(id: "start", idType: URI) {
      id
      ourClients {
        fieldGroupName
        ourClientsImgGroup {
          fieldGroupName
          logo1 {
            node {
              filePath
            }
          }
          logo2 {
            node {
              filePath
            }
          }
          logo3 {
            node {
              filePath
            }
          }
          logo4 {
            node {
              filePath
            }
          }
          logo5 {
            node {
              filePath
            }
          }
          logo6 {
            node {
              filePath
            }
          }
        }
        ourClientsTitle
      }
    }
  }
`;

const GET_LAST_4_POSTS = gql`
  query GetStartPage {
    posts(first: 4) {
      nodes {
        id
        title
        slug
        categories {
          edges {
            node {
              id
              name
            }
          }
        }
        tags {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            filePath
          }
        }
      }
    }
  }
`;
const GET_FOOTER_DATA = gql`
  query GetStartPage {
    page(id: "start", idType: URI) {
      id
      footerVer1 {
        fieldGroupName
        footerVer1 {
          fieldGroupName
          footerVer1SquareImg {
            node {
              filePath
            }
          }
          footerVer1SquareImgAlt
          footerVer1SquareText
        }
        footerVer1Title
        footerVer1Square3 {
          fieldGroupName
          footerVer1SquareMail {
            fieldGroupName
            footerVer1SquareAddressLogo
            footerVer1SquareMail1
            footerVer1SquareMail2
            footerVer1SquareMail3
            footerVer1SquareMailImg {
              node {
                filePath
              }
            }
            footerVer1SquareMailImgAlt
          }
        }
        footerVer2Square {
          fieldGroupName
          footerVer1SquareAddress
          footerVer1SquareHour
          footerVer1SquareHourImgAlt
          footerVer1SquareHourLogo {
            node {
              filePath
            }
          }
          footerVer1SquareImg {
            node {
              filePath
            }
          }
          footerVer1SquareImgAlt
          footerVer2SquareAddress {
            fieldGroupName
            footerVer2SquareAddressCity
            footerVer2SquareAddressLogo {
              node {
                filePath
              }
            }
            footerVer2SquareAddressLogoAlt
            footerVer2SquareAddressStreet
            footerVer2SquareAddressZip
          }
        }
      }
    }
  }
`;
const GET_HERO_TEAM = gql`
  query GetStartPage {
    page(id: "zespol", idType: URI) {
      id
      heroZespol {
        heroTeam {
          node {
            filePath
          }
        }
        heroTextTeam {
          subtextTitlE
          fieldGroupName
          mainTitle
        }
      }
    }
  }
`;
const GET_TEAM = gql`
  query GetStartPage {
    page(id: "zespol", idType: URI) {
      id
      teamSection {
        firstTeammate {
          teamDesc
          teamName
          teamatePhoto {
            node {
              filePath
            }
          }
        }
        secTeammate {
          teamDesc
          teamName
          teamatePhoto {
            node {
              filePath
            }
          }
        }
        thirdTeammate {
          teamDesc
          teamName
          teamatePhoto {
            node {
              filePath
            }
          }
        }
      }
    }
  }
`;
const GET_REFERENCE_SECTION = gql`
  query GetStartPage {
    page(id: "referencje", idType: URI) {
      id
      logoReferenceSection {
        logo1 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo2 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo3 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo4 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo5 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo6 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo7 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo8 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo9 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo10 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo11 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo12 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo13 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo14 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo15 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo16 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo17 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo18 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo19 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo20 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo21 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo22 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo23 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo24 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo25 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo26 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo27 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo28 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo29 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo30 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo31 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo32 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo33 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo34 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo35 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo36 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo37 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo38 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo39 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo40 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo41 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo42 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo43 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo44 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo45 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo46 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo47 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo48 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
        logo49 {
          company
          name
          referenceText
          role
          stars
          imgage {
            node {
              filePath
            }
          }
        }
      }
    }
  }
`;

const GET_REALIZATION_POSTS = gql`
  query GetStartPage {
    posts(where: { categoryName: "realizacje" }) {
      edges {
        node {
          id
          slug
          title
          categories {
            nodes {
              id
              name
              slug
              parent {
                node {
                  id
                  name
                  slug
                }
              }
            }
          }
          tags {
            nodes {
              id
              name
              slug
            }
          }
          blocks {
            name
            originalContent
            ... on CoreParagraphBlock {
              attributesJSON
              dynamicContent
            }
            ... on CoreImageBlock {
              attributesJSON
              dynamicContent
            }
            ... on CoreHeadingBlock {
              attributesJSON
              dynamicContent
            }
            ... on CoreGalleryBlock {
              attributesJSON
              dynamicContent
            }
            ... on CoreEmbedBlock {
              attributesJSON
              dynamicContent
            }
            parentNode {
              id
            }
          }
        }
      }
    }
  }
`;

const GET_OFFER_POSTS = gql`
  query GetStartPage {
    posts(where: { categoryName: "oferta" }) {
      edges {
        node {
          id
          title
          slug
          categories {
            nodes {
              id
              name
              slug
              parent {
                node {
                  id
                  name
                  slug
                }
              }
            }
          }
          tags {
            nodes {
              id
              name
              slug
            }
          }
          blocks {
            name
            ... on CoreHeadingBlock {
              originalContent
            }
            ... on CoreParagraphBlock {
              originalContent
              innerBlocks {
                name
                originalContent
              }
              attributes {
                ... on CoreParagraphBlockAttributes {
                  metadata
                }
              }
            }
            ... on CoreImageBlock {
              attributesJSON
              dynamicContent
            }
          }
        }
      }
    }
  }
`;

const GET_OFFER_BY_SLUG = gql`
  query GetStartPage($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      excerpt
      tags {
        nodes {
          id
          name
          slug
        }
      }
      blocks {
        name
        ... on CoreHeadingBlock {
          originalContent
        }
        ... on CoreParagraphBlock {
          originalContent
          innerBlocks {
            name
            originalContent
          }
          attributes {
            ... on CoreParagraphBlockAttributes {
              metadata
            }
          }
        }
        ... on CoreImageBlock {
          attributesJSON
          dynamicContent
        }
      }
    }
  }
`;

export async function getHeroData() {
  const data = await graphQLClient.request(GET_HERO_DATA);
  return data;
}
export async function getHeroText() {
  const data = await graphQLClient.request(GET_HERO_TEXT);
  return data;
}
export async function getMenu() {
  const data = await graphQLClient.request(GET_MENU);
  return data;
}
export async function getMenuImg() {
  const data = await graphQLClient.request(GET_MENU_IMG);
  return data;
}
export async function getGreekSection() {
  const data = await graphQLClient.request(GET_GREEK_SECTION);
  return data;
}
export async function getCarousel() {
  const data = await graphQLClient.request(GET_CAROUSEL);
  return data;
}
export async function getOffert() {
  const data = await graphQLClient.request(GET_OFFERT);
  return data;
}
export async function getAbout() {
  const data = await graphQLClient.request(GET_ABOUT);
  return data;
}
export async function getEventCompany() {
  const data = await graphQLClient.request(GET_COMPANY_EVENT);
  return data;
}
export async function getOurClients() {
  const data = await graphQLClient.request(GET_OUR_CLIENT);
  return data;
}
export async function getLast4Posts() {
  const data = await graphQLClient.request(GET_LAST_4_POSTS);
  return data;
}
export async function getFooterData() {
  const data = await graphQLClient.request(GET_FOOTER_DATA);
  return data;
}
export async function getTeamHero() {
  const data = await graphQLClient.request(GET_HERO_TEAM);
  return data;
}
export async function getTeamSection() {
  const data = await graphQLClient.request(GET_TEAM);
  return data;
}
export async function fetchRealizationPost() {
  const data = await graphQLClient.request(GET_REALIZATION_POSTS);
  return data;
}
export async function getReferenceSection() {
  const data = await graphQLClient.request(GET_REFERENCE_SECTION);
  return data;
}

export async function fetchOfferPosts() {
  const data = await graphQLClient.request(GET_OFFER_POSTS);
  return data;
}

export async function fetchOfferBySlug(slug) {
  const data = await graphQLClient.request(GET_OFFER_BY_SLUG, { slug });
  return data;
}
