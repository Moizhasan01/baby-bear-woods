import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BOOK, formatPrice, type Product } from "@/lib/book";
import { Button } from "@/components/ui/button";

type CartItem = { product: Product; qty: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (product: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "nja-cart-v1";
const PRODUCTS: Record<string, Product> = { [BOOK.id]: BOOK };

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { id: string; qty: number }[];
        setItems(
          parsed
            .filter((p) => PRODUCTS[p.id])
            .map((p) => ({ product: PRODUCTS[p.id], qty: p.qty })),
        );
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items.map((i) => ({ id: i.product.id, qty: i.qty }))),
    );
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * i.product.price, 0);
    return {
      items,
      count,
      subtotal,
      open,
      setOpen,
      add: (product, qty = 1) => {
        setItems((prev) => {
          const found = prev.find((i) => i.product.id === product.id);
          if (found)
            return prev.map((i) =>
              i.product.id === product.id ? { ...i, qty: i.qty + qty } : i,
            );
          return [...prev, { product, qty }];
        });
        toast.success(`Added to your basket`, {
          description: `${product.title} × ${qty}`,
        });
        setOpen(true);
      },
      setQty: (id, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter((i) => i.product.id !== id)
            : prev.map((i) => (i.product.id === id ? { ...i, qty } : i)),
        ),
      remove: (id) => setItems((prev) => prev.filter((i) => i.product.id !== id)),
      clear: () => setItems([]),
    };
  }, [items, open]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

function CartDrawer() {
  const cart = useCart();
  const shipping = cart.subtotal > 35 || cart.subtotal === 0 ? 0 : 4.95;

  return (
    <Sheet open={cart.open} onOpenChange={cart.setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 border-l-0 bg-cream p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="font-display text-2xl text-bark">Your basket</SheetTitle>
          <SheetDescription className="text-muted-foreground">
            {cart.count === 0
              ? "Nothing here yet — Baby Bear is waiting!"
              : `${cart.count} ${cart.count === 1 ? "book" : "books"} ready for the forest post.`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sage-light text-forest">
                <ShoppingBag className="h-9 w-9" />
              </div>
              <p className="max-w-[16rem] text-sm text-muted-foreground">
                Add <em>What's Eating Baby Bear?</em> to begin your woodland adventure.
              </p>
              <Button asChild variant="forest" onClick={() => cart.setOpen(false)}>
                <Link to="/shop">Visit the shop</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-5">
              {cart.items.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-4">
                  <img
                    src={product.images.front}
                    alt={product.title}
                    className="h-28 w-20 flex-none rounded-md object-cover shadow-soft"
                  />
                  <div className="flex flex-1 flex-col">
                    <p className="font-display text-lg leading-tight text-bark">{product.title}</p>
                    <p className="text-xs text-muted-foreground">{product.format}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-border bg-card">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => cart.setQty(product.id, qty - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-sage-light"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{qty}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => cart.setQty(product.id, qty + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-sage-light"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-display text-base font-semibold text-forest">
                        {formatPrice(product.price * qty)}
                      </span>
                    </div>
                  </div>
                  <button
                    aria-label="Remove"
                    onClick={() => cart.remove(product.id)}
                    className="self-start text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="border-t border-border bg-card px-6 py-5">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPrice(cart.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-display text-lg font-semibold text-bark">
                <dt>Total</dt>
                <dd>{formatPrice(cart.subtotal + shipping)}</dd>
              </div>
            </dl>
            <Button
              variant="honey"
              size="xl"
              className="mt-4 w-full"
              onClick={() =>
                toast("Checkout coming soon", {
                  description: "Online checkout will be connected before launch.",
                })
              }
            >
              Proceed to checkout
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Free shipping on orders over $35 · Ships from Texas
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
