/** @type {import('next').NextConfig} */
function getSupabaseRemotePattern() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    return null;
  }

  try {
    const url = new URL(supabaseUrl);

    return {
      protocol: url.protocol.replace(":", ""),
      hostname: url.hostname,
      pathname: "/storage/v1/object/public/**",
    };
  } catch {
    return null;
  }
}

const supabaseRemotePattern = getSupabaseRemotePattern();

const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: supabaseRemotePattern ? [supabaseRemotePattern] : [],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
