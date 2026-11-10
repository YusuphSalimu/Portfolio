import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import SiteNavigation from "@/components/SiteNavigation";
import SiteFooter from "@/components/SiteFooter";
import CommandPalette from "@/components/CommandPalette";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  alternates: {
    languages: { en: "/en", sw: "/sw", fr: "/fr" },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.some((supportedLocale) => supportedLocale === locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const projects = getAllProjects();

  return (
    <NextIntlClientProvider messages={messages}>
      <SiteNavigation />
      <CommandPalette projects={projects} />
      {children}
      <SiteFooter />
    </NextIntlClientProvider>
  );
}
