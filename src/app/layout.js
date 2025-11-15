import Menu from "./components/HeroSection/Menu";
import { MenuProvider } from "./context/MenuContext";
import "./globals.css";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";

const Chillax = localFont({
  src: "../../public/fonts/Chillax-Variable.ttf",
  variable: "--font-chillax",
});

const Museo = localFont({
  src: "../../public/fonts/MuseoModerno-VariableFont_wght.ttf",
  variable: "--font-museo",
});

export const metadata = {
  title: "Event Trade - Agencja Eventowa",
  description:
    "Profesjonalna organizacja eventów - bankiety, konferencje, gale firmowe",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover", // iPhone notch support
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${Chillax.variable} ${Museo.variable} bg-black min-h-screen`}
    >
      <body className="antialiased bg-black min-h-screen overflow-x-hidden">
        <SpeedInsights />
        <MenuProvider>
          <main className="bg-black min-h-screen">
            <Menu />
            {children}
          </main>
        </MenuProvider>
      </body>
    </html>
  );
}
