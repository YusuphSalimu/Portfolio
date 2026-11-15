import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Metadata is local and fast; keep it in the initial document to avoid
  // streamed metadata shifting hydration boundaries during full-page reloads.
  htmlLimitedBots: /.*/,
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
