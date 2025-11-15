import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  return (
    <footer className="py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
        {/* Newsletter Section */}
        <div className="text-center">
          <h2 className="text-lg font-semibold">Stay Updated</h2>
          <p className="text-sm text-muted-foreground">
            Subscribe to get the latest and greatest updates.
          </p>
        </div>

        <div className="flex items-center w-full max-w-md">
          <Input
            type="email"
            placeholder="Enter your email"
            className="rounded-r-none"
          />
          <Button className="rounded-l-none">Subscribe</Button>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-border my-4"></div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} CollabSphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;