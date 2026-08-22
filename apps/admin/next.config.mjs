/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@project-bd-client/ui", "@project-bd-client/db", "@project-bd-client/auth"],
  // NOTE: apps/web/next.config.mjs と同じ理由（@project-bd-client/db がtranspilePackages対象になり、
  // その依存のbetter-sqlite3までwebpackがバンドルしようとしてしまう）でexternal化している
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("better-sqlite3");
    }
    return config;
  },
};

export default nextConfig;
