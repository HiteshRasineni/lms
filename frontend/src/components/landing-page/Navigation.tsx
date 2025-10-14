import { Link } from "react-router-dom";
import { Search, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navigation = () => {
  return (
    <nav className="bg-background/50 backdrop-blur-md border-b border-border/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-orange-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">e</span>
              </div>
              <span className="text-2xl font-bold">
                <span className="text-secondary">Edu</span>
                <span className="text-foreground">port</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <Button
                variant="ghost"
                onClick={() => {
                  document.getElementById("trending-courses")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Browse Courses
              </Button>
              <Button variant="ghost">For Teachers</Button>
              <Button variant="ghost">About Us</Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <Link to="/login">
              <Button variant="secondary" className="hover:bg-secondary/90">
                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
