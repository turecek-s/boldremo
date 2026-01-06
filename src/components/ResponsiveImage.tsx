import { ImgHTMLAttributes } from "react";

interface ResponsiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Responsive image component optimized for mobile delivery.
 * Uses sizes attribute to help browser download appropriately-sized images.
 * Set priority=true for LCP/above-the-fold images.
 */
export const ResponsiveImage = ({
  src,
  alt,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  className,
  width,
  height,
  ...props
}: ResponsiveImageProps) => {
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
