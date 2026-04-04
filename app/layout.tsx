import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { siteMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.url,
    images: [siteMetadata.ogImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-forest-deep text-neutral-light">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
