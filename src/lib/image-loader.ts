export default function weservLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // Use images.weserv.nl for on-the-fly optimization and WebP conversion
  // This is a free, open-source image proxy that works great for static sites
  const baseUrl = "https://salescowboy.com.ng";
  const remoteUrl = src.startsWith('http') ? src : `${baseUrl}${src}`;
  return `https://images.weserv.nl/?url=${encodeURIComponent(remoteUrl)}&w=${width}&q=${quality || 80}&output=webp`;
}
