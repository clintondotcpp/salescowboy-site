export default function weservLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // If running locally, bypass weserv proxy to allow un-deployed local assets to render
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return src;
  }
  if (process.env.NODE_ENV === 'development') {
    return src;
  }

  // Use images.weserv.nl for on-the-fly optimization and WebP conversion
  // This is a free, open-source image proxy that works great for static sites
  const baseUrl = "https://salescowboy.com.ng";
  const remoteUrl = src.startsWith('http') ? src : `${baseUrl}${src}`;
  return `https://images.weserv.nl/?url=${encodeURIComponent(remoteUrl)}&w=${width}&q=${quality || 80}&output=webp`;
}
