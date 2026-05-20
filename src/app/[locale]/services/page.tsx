import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export async function generateStaticParams() {
  return [{ locale: "en" }];
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  redirect("/solutions");
}
