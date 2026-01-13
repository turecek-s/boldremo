import { ImgHTMLAttributes } from "react";

interface ResponsiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  /** Optional WebP source for modern browsers */
  webpSrc?: string;
}

/**
 * Converts a JPG/PNG path to its WebP equivalent if built by Vite optimizer.
 * Falls back to original if WebP isn't available.
 */
const getWebPPath = (src: string): string | undefined => {
  // Only convert jpg/jpeg/png files
  if (!/\.(jpe?g|png)$/i.test(src)) return undefined;
  // Replace extension with webp
  return src.replace(/\.(jpe?g|png)$/i, '.webp');
};

/**
 * Responsive image component optimized for mobile delivery.
 * Uses <picture> element with WebP source for modern browsers.
 * Set priority=true for LCP/above-the-fold images.
 */
export const ResponsiveImage = ({
  src,
  alt,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  webpSrc,
  className,
  width,
  height,
  ...props
}: ResponsiveImageProps) => {
  const webpSource = webpSrc || getWebPPath(src);

  return (
    <picture>
      {webpSource && (
        <source
          type="image/webp"
          srcSet={webpSource}
          sizes={sizes}
        />
      )}
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        className={className}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        {...props}
      />
    </picture>
  );
};
