/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}


// === Injected by fix script: CSP for HERE JS and robust defaults ===
export default {
  ...(typeof nextConfig === "object" ? nextConfig : {}),
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.api.here.com;",
              "style-src 'self' 'unsafe-inline' https://js.api.here.com;",
              "img-src 'self' data: blob: https://*.hereapi.com;",
              "connect-src 'self' https://*.hereapi.com https://*.here.com;",
              "font-src 'self' data:;",
              "worker-src 'self' blob:;",
            ].join(" ") }
        ]
      }
    ];
  },
};
