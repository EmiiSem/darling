import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { FloatingHearts, MobileNav } from "./ui/navigation";

export const metadata: Metadata = {
  title: "Для нас двоих",
  description: "Милый сайт о нашей истории, будущем и маленьких радостях.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <FloatingHearts />
        <header className="site-shell site-shell--header">
          <Link className="site-brand" href="/">
            Для нас двоих
          </Link>
          <MobileNav />
        </header>
        {children}
      </body>
    </html>
  );
}
