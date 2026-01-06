import type { Metadata } from "next";
import { Inter, Playfair_Display, Roboto_Flex } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mochammad Faiz Adli",
  description: "Personal portfolio of Mochammad Faiz Adli",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${robotoFlex.variable} bg-background text-foreground antialiased`}
      >
        <div className="flex min-h-dvh flex-col">
          <NavBar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
