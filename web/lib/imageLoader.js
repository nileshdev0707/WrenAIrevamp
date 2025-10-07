/**
 * Custom image loader for static export
 * Handles image optimization for static hosting
 */

export default function imageLoader({ src, width, quality }) {
  // For static export, we'll use the original images
  // In production, you might want to use a CDN or image optimization service
  return src;
}
