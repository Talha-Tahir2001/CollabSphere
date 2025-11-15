import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Linkedin, Twitter, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Security", href: "/security" },
    { label: "Roadmap", href: "/roadmap" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/api" },
    { label: "Community", href: "/community" },
    { label: "Support", href: "/support" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Compliance", href: "/compliance" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border pt-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Top: Brand + Newsletter + Links */}
        <div className="grid md:grid-cols-5 gap-12">
          {/* Brand + Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-2 md:col-span-1 flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="font-bold text-lg">C</span>
              </div>
              <span className="font-semibold text-foreground text-lg">CollabSphere</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Real-time collaboration platform built for teams that move fast.
            </p>
            <div className="flex gap-3 mt-2">
              {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-lg bg-muted hover:bg-accent transition flex items-center justify-center"
                >
                  <Icon className="w-4 h-4 text-foreground" />
                </a>
              ))}
            </div>
            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Subscribe to our newsletter</p>
              <div className="flex max-w-xl gap-0">
                <Input type="email" placeholder="Your email" className="rounded-r-none" />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([section, links], idx) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col gap-2"
            >
              <h4 className="text-sm font-semibold text-foreground mb-3">{section}</h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 py-6 border-t border-border flex flex-col md:flex-row items-center justify-between"
        >
          <p className="text-sm text-muted-foreground">© {currentYear} CollabSphere. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/status" className="text-sm text-muted-foreground hover:text-foreground transition">
              Status
            </Link>
            <Link to="/changelog" className="text-sm text-muted-foreground hover:text-foreground transition">
              Changelog
            </Link>
            <Link to="/sitemap" className="text-sm text-muted-foreground hover:text-foreground transition">
              Sitemap
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
