'use client';

import { useState } from "react";
import Link from "next/link";
import { Menu, X, BookOpen, Sparkles, Users, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Courses", href: "#courses", icon: BookOpen },
    { name: "Features", href: "#features", icon: Sparkles },
    { name: "Community", href: "#community", icon: Users },
    { name: "About", href: "#about", icon: GraduationCap },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400">
              <Sparkles className="h-6 w-6 text-gray-900" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">AI Agent Playground</h1>
              <p className="text-xs text-muted-foreground">Learn by Doing</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <Button className="hidden sm:inline-flex bg-yellow-400 text-gray-900 hover:bg-yellow-500">
              Get Started
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-2 py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
              <Button className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 mt-2">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
