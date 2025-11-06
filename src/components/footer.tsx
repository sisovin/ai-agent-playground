import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const footerLinks = {
    product: [
      { name: "Courses", href: "#courses" },
      { name: "Playground", href: "#playground" },
      { name: "Pricing", href: "#pricing" },
      { name: "Roadmap", href: "#roadmap" },
    ],
    resources: [
      { name: "Documentation", href: "#docs" },
      { name: "Tutorials", href: "#tutorials" },
      { name: "Blog", href: "#blog" },
      { name: "Community", href: "#community" },
    ],
    company: [
      { name: "About", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Contact", href: "#contact" },
      { name: "Partners", href: "#partners" },
    ],
    legal: [
      { name: "Privacy", href: "#privacy" },
      { name: "Terms", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "Licenses", href: "#licenses" },
    ],
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
    { name: "Email", icon: Mail, href: "mailto:hello@aiagent.dev" },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400">
                  <Sparkles className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">AI Agent Playground</h2>
                  <p className="text-xs text-muted-foreground">Learn by Doing</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Master AI agents through hands-on interactive learning. Build, experiment, and deploy intelligent agents with real-world tools.
              </p>
              
              {/* Newsletter */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Stay Updated</h3>
                <div className="flex gap-2">
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="max-w-xs"
                  />
                  <Button className="bg-yellow-400 text-gray-900 hover:bg-yellow-500">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
                  <ul className="space-y-3">
                    {footerLinks.product.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
                  <ul className="space-y-3">
                    {footerLinks.resources.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
                  <ul className="space-y-3">
                    {footerLinks.legal.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} AI Agent Playground. Made with{" "}
              <Heart className="inline h-4 w-4 text-red-500 fill-red-500" /> for the AI community.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-9 w-9"
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
