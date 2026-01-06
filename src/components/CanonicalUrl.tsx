import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://www.boldremo.com";

export const CanonicalUrl = () => {
  const location = useLocation();

  useEffect(() => {
    const canonicalUrl = `${BASE_URL}${location.pathname === "/" ? "" : location.pathname}`;
    
    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalLink) {
      canonicalLink.href = canonicalUrl;
    } else {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      canonicalLink.href = canonicalUrl;
      document.head.appendChild(canonicalLink);
    }

    // Also update og:url
    let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
    if (ogUrl) {
      ogUrl.content = canonicalUrl;
    }

    // Update twitter:url
    let twitterUrl = document.querySelector('meta[name="twitter:url"]') as HTMLMetaElement;
    if (twitterUrl) {
      twitterUrl.content = canonicalUrl;
    }
  }, [location.pathname]);

  return null;
};
