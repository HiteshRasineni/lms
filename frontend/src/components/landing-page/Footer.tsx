import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <h3 className="text-xl font-bold">Eduport</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Your premier platform for online learning. Connecting students worldwide through quality education and expert instruction.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-muted hover:bg-muted/80 rounded flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-muted hover:bg-muted/80 rounded flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-muted hover:bg-muted/80 rounded flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-muted hover:bg-muted/80 rounded flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Courses</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Events</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Instructors</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Become Instructor</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Submit Course</a></li>
            </ul>
          </div>

          {/* Support & Tools */}
          <div>
            <h4 className="font-bold text-lg mb-4">Support & Tools</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Support Mission</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Community Guidelines</a></li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="font-bold text-lg mb-4">Get In Touch</h4>
            <ul className="space-y-4 text-sm mb-6">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <a href="mailto:hello@eduport.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  hello@eduport.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-foreground transition-colors">
                  +123 456 7890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  San Francisco, CA
                </span>
              </li>
            </ul>
            
            <div>
              <h5 className="font-semibold mb-3">Join the Eduport Community</h5>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-muted border-border"
                />
                <Button variant="secondary" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 Eduport. All rights reserved. Made with ❤️ for education.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
