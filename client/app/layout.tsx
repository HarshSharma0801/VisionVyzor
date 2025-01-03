import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localfont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const railway = localfont({
  src: [
    {
      path: "../public/fonts/Railway.otf",
      weight: "600",
    },
  ],
  variable: "--font-railway",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${railway.variable}`}>
        {children}
      </body>
    </html>
  );
}
