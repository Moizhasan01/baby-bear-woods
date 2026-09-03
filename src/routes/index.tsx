import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, GraduationCap, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site-layout";
import { useCart } from "@/components/cart";
import {
  Leaf,
  Blossom,
  Bee,
  Acorn,
  FloatingLeaves,
  GrassEdge,
  TreeLine,
  VineCorner,
} from "@/components/woodland";
import { BOOK, LESSONS, formatPrice } from "@/lib/book";

const TITLE = "Nancy Jane Allen — Children's Author | What's Eating Baby Bear?";
const DESC =
  "Official website of children's author Nancy Jane Allen. Discover What's Eating Baby Bear?, a warm woodland picture book about curiosity, kindness and the homes we share.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const cart = useCart();

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-parchment">
        <FloatingLeaves count={9} />
        <div className="container-story relative grid items-center gap-12 pb-20 pt-8 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28">
          <div className="order-2 lg:order-1">
            <p className="eyebrow reveal">Baby Bear's Adventures · Book One</p>
            <h1 className="reveal delay-1 mt-5 text-balance text-5xl font-semibold leading-[0.98] text-bark sm:text-6xl lg:text-7xl">
              What's Eating <span className="text-forest">Baby Bear?</span>
            </h1>
            <p className="reveal delay-2 mt-4 font-story text-xl italic text-bark-light">
              A picture book by Nancy Jane Allen
            </p>
            <p className="reveal delay-2 mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Baby Bear is sure the forest is out to get him. With a little patience from Momma
              Bear, he discovers that almost everywhere is someone's home — and every creature
              deserves gentleness and respect.
            </p>
            <div className="reveal delay-3 mt-9 flex flex-wrap items-center gap-4">
              <Button asChild variant="honey" size="xl">
                <Link to="/shop">
                  Shop the Book <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/about">Meet Nancy</Link>
              </Button>
            </div>
            <ul className="reveal delay-4 mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-bark-light">
              <li className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-honey" /> Ages {BOOK.ages}
              </li>
              <li className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-honey" /> {BOOK.pages} illustrated pages
              </li>
              <li className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-honey" /> A story about kindness
              </li>
            </ul>
          </div>

          <div className="relative order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-md">
            <div className="absolute -inset-10 -z-10 rounded-full bg-honey-light/70 blur-3xl" />
            <Bee className="absolute -left-6 top-6 z-10 animate-bee" />
            <Blossom className="absolute -right-4 bottom-16 z-10 h-10 w-10 animate-sway" />
            <Acorn className="absolute -left-2 bottom-4 z-10 animate-float-slow" />
            <div className="book-tilt reveal delay-1">
              <img
                src={BOOK.images.front}
                alt="Front cover of What's Eating Baby Bear? showing Baby Bear and Momma Bear in a sunlit forest"
                width={915}
                height={1382}
                className="w-full rounded-lg shadow-book"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
        <GrassEdge className="text-sage-light" />
      </section>

      {/* ---------- FEATURED BOOK ---------- */}
      <section className="relative bg-meadow py-20 md:py-28">
        <div className="container-story">
          <SectionHeading
            eyebrow="Featured book"
            title="A gentle forest tale about the homes we share"
            text="Perfect for bedtime, circle time, and every curious little explorer who has ever wondered what's hiding under a rock."
          />
          <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 lg:order-1">
              <VineCorner className="absolute -left-4 -top-4" />
              <VineCorner className="absolute -bottom-4 -right-4 rotate-180" />
              <div className="rounded-3xl bg-card/80 p-8 shadow-soft backdrop-blur-sm md:p-10">
                {BOOK.blurb.map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "font-display text-2xl font-semibold text-bark"
                        : "mt-5 font-story text-[1.05rem] leading-relaxed text-foreground/85"
                    }
                  >
                    {p}
                  </p>
                ))}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <span className="font-display text-3xl font-semibold text-forest">
                    {formatPrice(BOOK.price)}
                  </span>
                  <Button variant="forest" size="lg" onClick={() => cart.add(BOOK)}>
                    Add to Cart
                  </Button>
                  <Link
                    to="/shop"
                    className="story-link font-display text-sm font-semibold text-forest"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative mx-auto max-w-lg overflow-hidden rounded-3xl shadow-lift">
                <img
                  src={BOOK.images.full}
                  alt="Full wraparound cover of What's Eating Baby Bear?"
                  className="w-full transition-transform duration-700 hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Front and back cover · {BOOK.format}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- STORY / LESSONS ---------- */}
      <section className="relative">
        <TreeLine className="text-forest-deep" />
        <div className="bg-canopy">
          <div className="container-story py-20 md:py-28">
            <SectionHeading
              tone="dark"
              eyebrow="The story & its lessons"
              title="Big feelings, small creatures, and one very patient Momma Bear"
              text="Every chapter of Baby Bear's day opens a door to a conversation about empathy, respect for nature, and looking before we leap."
            />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {LESSONS.map((lesson, i) => (
                <article
                  key={lesson.title}
                  className="group relative rounded-3xl border border-cream/10 bg-cream/5 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-honey/40 hover:bg-cream/10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-honey/15 text-honey transition-transform duration-500 group-hover:rotate-6">
                    {i === 0 && <Leaf className="h-6 w-6 text-honey" />}
                    {i === 1 && <Sparkles className="h-6 w-6" />}
                    {i === 2 && <Heart className="h-6 w-6" />}
                    {i === 3 && <Acorn className="h-6 w-6" />}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-cream">{lesson.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">{lesson.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-14 grid gap-4 text-center sm:grid-cols-4">
              {["Mr. Spider", "Mrs. Snake", "Fuzzy the Caterpillar", "The Bees Brothers"].map(
                (c) => (
                  <div key={c} className="rounded-full border border-cream/15 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-sage-light/70">Meet</p>
                    <p className="font-display text-lg text-cream">{c}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        <TreeLine flip className="text-forest-deep" />
      </section>

      {/* ---------- AUTHOR INTRO ---------- */}
      <section className="bg-parchment py-20 md:py-28">
        <div className="container-story grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -left-6 -top-6 h-full w-full rounded-[2.5rem] border-2 border-dashed border-sage/60" />
            <div className="relative overflow-hidden rounded-[2.5rem] bg-sage-light shadow-lift">
              <img
                src={BOOK.images.back}
                alt="Back cover illustration with a woodland vine frame"
                className="aspect-[4/5] w-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-5 -right-3 rounded-2xl bg-card px-5 py-3 shadow-soft">
              <p className="font-display text-sm font-semibold text-bark">Nancy Jane Allen</p>
              <p className="text-xs text-muted-foreground">Author · Texas</p>
            </div>
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Meet the author"
              title="Hello, I'm Nancy"
              text="I write stories for the small hands that turn pages slowly and the big hearts that ask the very best questions."
            />
            <p className="mt-6 font-story text-lg leading-relaxed text-foreground/85">
              <em>What's Eating Baby Bear?</em> began as a bedtime story about a cub who was certain
              the whole forest wanted a bite of him. It grew into a book about noticing — noticing
              the web in the corner, the beetle under the rock, and the neighbours we share this
              world with.
            </p>
            <div className="mt-8">
              <Button asChild variant="forest" size="lg">
                <Link to="/about">
                  Read Nancy's story <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PARENTS / TEACHERS ---------- */}
      <section className="pb-8 pt-4 md:pt-10">
        <div className="container-story">
          <SectionHeading
            eyebrow="Beyond the book"
            title="Grown-ups, this part is for you"
            text="Free guides, printables and conversation starters to bring Baby Bear's lessons into the classroom and the living room."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <AudienceCard
              to="/parents"
              icon={<Heart className="h-7 w-7" />}
              eyebrow="For parents"
              title="Bedtime talks & backyard adventures"
              text="Simple ways to turn story time into gentle lessons about empathy, bravery, and caring for the small creatures around us."
              tone="honey"
            />
            <AudienceCard
              to="/teachers"
              icon={<GraduationCap className="h-7 w-7" />}
              eyebrow="For teachers"
              title="Classroom guide & activities"
              text="Discussion questions, science tie-ins and printable worksheets aligned to early-years social-emotional learning."
              tone="sage"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function AudienceCard({
  to,
  icon,
  eyebrow,
  title,
  text,
  tone,
}: {
  to: "/parents" | "/teachers";
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  text: string;
  tone: "honey" | "sage";
}) {
  return (
    <Link
      to={to}
      className={`group relative overflow-hidden rounded-[2rem] p-9 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift ${
        tone === "honey" ? "bg-honey-light" : "bg-sage-light"
      }`}
    >
      <Leaf
        className={`absolute -bottom-8 -right-8 h-40 w-40 rotate-[200deg] opacity-30 transition-transform duration-700 group-hover:rotate-[215deg] ${
          tone === "honey" ? "text-honey" : "text-sage"
        }`}
      />
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-cream shadow-soft ${
          tone === "honey" ? "bg-bark" : "bg-forest"
        }`}
      >
        {icon}
      </span>
      <p className="eyebrow mt-7">{eyebrow}</p>
      <h3 className="mt-2 text-2xl font-semibold text-bark md:text-3xl">{title}</h3>
      <p className="relative mt-3 max-w-md leading-relaxed text-foreground/75">{text}</p>
      <span className="mt-7 inline-flex items-center gap-2 font-display font-semibold text-forest">
        Explore resources
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
      </span>
    </Link>
  );
}
