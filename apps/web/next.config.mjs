/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@project-bd-client/ui", "@project-bd-client/db", "@project-bd-client/auth"],
  // NOTE: @project-bd-client/db がtranspilePackages対象になったことで、
  // その依存であるbetter-sqlite3（ネイティブbinding）までwebpackがバンドルしようとして
  // ビルド時にbindingファイルを見失う。pnpmのworkspaceシンボリックリンク越しだと
  // Next標準のnode_modules自動external化が効かないため、明示的にexternal化する。
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("better-sqlite3");
    }
    return config;
  },
};

export default nextConfig;
