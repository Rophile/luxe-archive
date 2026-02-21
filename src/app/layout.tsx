import "./globals.css";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LuxeArchive | Katalog Modern",
  description: "Tugas PABP Teknik Rendering",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-[#F5F5DC]`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}