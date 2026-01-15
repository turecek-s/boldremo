import { Link, useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FloatingContactButton = () => {
  const location = useLocation();
  
  // Hide on contact page since user is already there
  if (location.pathname === "/contact") {
    return null;
  }

  return (
    <Button
      asChild
      size="lg"
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <Link to="/contact" className="flex items-center gap-2" aria-label="Book Bathroom Consult">
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span className="hidden sm:inline">Book Consult</span>
      </Link>
    </Button>
  );
};
