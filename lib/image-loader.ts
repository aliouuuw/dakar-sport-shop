export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // Unsplash: replace CDN params with requested dimensions directly
  // This bypasses Next.js's proxy and lets the browser fetch from Unsplash CDN
  if (src.includes("images.unsplash.com")) {
    try {
      const url = new URL(src);
      url.searchParams.set("w", String(width));
      url.searchParams.set("q", String(quality ?? 75));
      url.searchParams.set("auto", "format");
      url.searchParams.set("fit", "crop");
      return url.toString();
    } catch {
      return src;
    }
  }

  // Cloudinary: insert transformation before the upload path
  if (src.includes("res.cloudinary.com")) {
    try {
      const uploadIndex = src.indexOf("/upload/");
      if (uploadIndex !== -1) {
        const base = src.slice(0, uploadIndex + 8);
        const path = src.slice(uploadIndex + 8);
        return `${base}w_${width},q_${quality ?? "auto"},f_auto/${path}`;
      }
    } catch {
      return src;
    }
  }

  // Fallback: return src as-is (pexels, picsum, localhost, etc.)
  return src;
}
