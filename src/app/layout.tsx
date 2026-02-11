import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lato } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DentaCamp FastScreen",
  description: "High-volume dental outreach screening tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${lato.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
