import { ImgHTMLAttributes } from "react";

interface ResponsiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  /** Optional WebP source - only used if explicitly provided */
  webpSrc?: string;
}

/**
 * Responsive image component optimized for mobile delivery.
 * Only uses <picture> element when webpSrc is explicitly provided.
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
  // Only use picture element if we have an actual WebP source
  if (webpSrc) {
    return (
      <picture>
        <source
          type="image/webp"
          srcSet={webpSrc}
          sizes={sizes}
        />
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
  }

  return (
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
  );
};
