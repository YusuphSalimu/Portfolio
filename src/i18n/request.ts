import fs from "node:fs";
import path from "node:path";
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

function loadMessages(locale: string) {
  const filePath = path.join(process.cwd(), "messages", `${locale}.json`);
  const raw = fs.readFileSync(filePath, "utf8");
  const sanitized = raw
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n");

  return JSON.parse(sanitized);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: loadMessages(locale),
  };
});
