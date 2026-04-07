"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/produits", label: "Produits" },
  { href: "/promotions", label: "Promotions" },
  { href: "/contact", label: "Contact" },
];

const siteSettings = {
  phones: [
    { label: "Fixe", number: "+221 33 840 09 45" },
    { label: "Mobile", number: "+221 77 634 51 15" },
    { label: "WhatsApp", number: "+221 77 041 49 30" },
  ],
  email: "promosportsdakar@yahoo.fr",
  address: "Avenue G. Pompidou, Dakar",
  socials: {
    facebook: "https://facebook.com/dakarsport",
    instagram: "https://instagram.com/dakarsport",
    whatsapp: "https://wa.me/221776345115",
  },
};

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function StoreIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/produits?q=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Rechercher un produit</DialogTitle>
          <DialogDescription>
            Tapez le nom d'un produit ou d'une catégorie
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Ballon, Chaussures, Maillot..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 h-12 text-base"
              autoFocus
            />
            <Button type="submit" className="h-12 px-6">
              Rechercher
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function StoreHeader() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
      {/* Announcement Bar */}
      <div className="bg-red-600 text-white text-center py-2 text-sm font-medium">
        🏷️ Livraison gratuite à Dakar pour toute commande de plus de 50 000 FCFA
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile Menu + Logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <MenuIcon className="text-slate-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetHeader className="border-b border-slate-200 p-4">
                  <SheetTitle className="flex items-center gap-2">
                    <StoreIcon className="text-slate-900" />
                    <span className="text-slate-900 font-black text-lg tracking-tighter uppercase">DAKAR SPORT</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col py-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={cn(
                        "px-6 py-4 text-base font-bold uppercase tracking-wider transition-colors hover:bg-slate-50 hover:text-slate-900",
                        pathname === item.href
                          ? "bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
                          : "text-slate-600"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="mt-4 border-t border-slate-200 pt-4 px-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Contactez-nous
                    </p>
                    <div className="space-y-2">
                      {siteSettings.phones.map((phone) => (
                        <a
                          key={phone.label}
                          href={`tel:${phone.number.replace(/\s/g, "")}`}
                          className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-800"
                        >
                          <span className="text-blue-800">📞</span>
                          {phone.number}
                        </a>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-3">
                      <a
                        href={siteSettings.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <FacebookIcon className="h-5 w-5" />
                      </a>
                      <a
                        href={siteSettings.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-pink-600 transition-colors"
                      >
                        <InstagramIcon className="h-5 w-5" />
                      </a>
                      <a
                        href={siteSettings.socials.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-green-600 transition-colors"
                      >
                        <WhatsAppIcon className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
              <StoreIcon className="text-slate-900 h-7 w-7" />
              <span className="text-slate-900 font-black text-lg tracking-tighter uppercase">DAKAR SPORT</span>
            </Link>
          </div>

          {/* Desktop Logo */}
          <Link href="/" className="hidden lg:flex items-center gap-3 shrink-0">
            <div className="bg-slate-900 p-2 rounded-lg">
              <StoreIcon className="text-white h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-900 font-black text-xl tracking-tighter uppercase leading-none">
                DAKAR SPORT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-5 py-2.5 text-sm font-bold uppercase tracking-wider rounded-full transition-all",
                  pathname === item.href
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => setSearchOpen(true)}
              aria-label="Rechercher"
            >
              <SearchIcon className="text-slate-600" />
            </Button>
            <a
              href={siteSettings.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-600 transition-colors h-10"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}