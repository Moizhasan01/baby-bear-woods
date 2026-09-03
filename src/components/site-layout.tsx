import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart";
import { Leaf, Blossom, TreeLine } from "@/components/woodland";
import { AUTHOR } from "@/lib/book";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/shop", label: "Shop" },
  { to: "/teachers", label: "Teachers" },
  { to: "/parents", label: "Parents" },
  { to: "/contact", label: "Contact" },
] as const;

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Nancy Jane Allen — home">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-forest text-cream shadow-soft transition-transform duration-500 group-hover:rotate-12">
        <Leaf className="h-6 w-6 text-honey" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-tight text-bark">
          Nancy Jane Allen
        </span>
        <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-forest">
          Children's Author
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const cart = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled ? "bg-cream/85 shadow-soft backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="container-story flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-4 py-2 font-display text-[0.95rem] font-medium text-bark transition-colors hover:bg-sage-light hover:text-forest"
              activeProps={{ className: "bg-sage-light text-forest" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => cart.setOpen(true)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-bark transition-colors hover:bg-sage-light hover:text-forest"
            aria-label={`Open basket, ${cart.count} items`}
          >
            <ShoppingBag className="h-5 w-5" />
            {cart.count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-honey px-1 font-display text-[0.7rem] font-bold text-honey-foreground animate-in zoom-in">
                {cart.count}
              </span>
            )}
          </button>
          <Button asChild variant="forest" className="hidden sm:inline-flex">
            <Link to="/shop">Shop the Book</Link>
          </Button>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full text-bark hover:bg-sage-light lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-cream/95 backdrop-blur-md lg:hidden animate-in slide-in-from-top-2 fade-in">
          <nav className="container-story flex flex-col gap-1 py-4" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-2xl px-4 py-3 font-display text-lg font-medium text-bark hover:bg-sage-light"
                activeProps={{ className: "bg-sage-light text-forest" }}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="forest" size="lg" className="mt-2">
              <Link to="/shop" onClick={() => setOpen(false)}>
                Shop the Book
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-24">
      <TreeLine className="text-forest-deep" />
      <div className="bg-canopy">
        <div className="container-story grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10">
                <Leaf className="h-6 w-6 text-honey" />
              </span>
              <div>
                <p className="font-display text-2xl font-semibold text-cream">Nancy Jane Allen</p>
                <p className="text-xs uppercase tracking-[0.22em] text-sage-light/80">
                  Stories from the forest floor
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/75">
              Gentle picture books that help little ones discover that almost everywhere is
              someone's home — and that curiosity and kindness can walk hand in paw.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-sage-light/70">
              Published by {AUTHOR.publisher}
            </p>
          </div>

          <div>
            <p className="eyebrow text-honey">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="story-link font-display text-base text-cream/90 hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-honey">Say hello</p>
            <ul className="mt-4 space-y-3 text-sm text-cream/85">
              <li>
                <a
                  href={`mailto:${AUTHOR.email}`}
                  className="flex items-center gap-2.5 hover:text-cream"
                >
                  <Mail className="h-4 w-4 text-sage-light" /> {AUTHOR.email}
                </a>
              </li>
              <li>
                <a href={`tel:${AUTHOR.phone}`} className="flex items-center gap-2.5 hover:text-cream">
                  <Phone className="h-4 w-4 text-sage-light" /> {AUTHOR.phone}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              <Blossom className="h-6 w-6 animate-sway" />
              <Blossom className="h-5 w-5 animate-sway [animation-delay:1s]" />
              <Blossom className="h-4 w-4 animate-sway [animation-delay:2s]" />
            </div>
          </div>
        </div>
        <div className="border-t border-cream/10">
          <div className="container-story flex flex-col items-center justify-between gap-2 py-5 text-xs text-cream/60 sm:flex-row">
            <p>© {new Date().getFullYear()} Nancy Jane Allen. All rights reserved.</p>
            <p>{AUTHOR.site}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Shared section primitives ---------- */

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  tone = "light",
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cn("eyebrow", tone === "dark" && "text-honey")}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          "mt-3 text-balance text-3xl font-semibold leading-[1.1] sm:text-4xl md:text-5xl",
          tone === "dark" ? "text-cream" : "text-bark",
        )}
      >
        {title}
      </h2>
      {text && (
        <p
          className={cn(
            "mt-5 text-pretty text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-cream/75" : "text-muted-foreground",
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-parchment pb-16 pt-12 md:pb-24 md:pt-20">
      <Leaf className="absolute -left-6 top-10 h-28 w-28 rotate-[30deg] text-sage/40 animate-float-slow" />
      <Leaf className="absolute -right-8 bottom-4 h-36 w-36 -rotate-[120deg] text-honey/30 animate-float" />
      <Blossom className="absolute right-[18%] top-12 h-8 w-8 animate-sway" />
      <div className="container-story relative">
        <div className="max-w-3xl reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] text-bark sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {text && (
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {text}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}
