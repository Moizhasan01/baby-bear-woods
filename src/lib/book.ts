import frontCover from "@/assets/front-cover.jpg.asset.json";
import backCover from "@/assets/back-cover.jpg.asset.json";
import fullCover from "@/assets/full-cover.jpg.asset.json";

export const AUTHOR = {
  name: "Nancy Jane Allen",
  short: "Nancy Allen",
  email: "nancyjaneallen@gmail.com",
  phone: "512-536-0026",
  publisher: "Collingwood Press",
  site: "nancyjaneallen.com",
};

export type Product = {
  id: string;
  title: string;
  subtitle: string;
  series: string;
  price: number;
  compareAt?: number;
  format: string;
  pages: number;
  ages: string;
  isbn: string;
  images: { front: string; back: string; full: string };
  blurb: string[];
};

export const BOOK: Product = {
  id: "whats-eating-baby-bear",
  title: "What's Eating Baby Bear?",
  subtitle: "Baby Bear's Adventures",
  series: "Baby Bear's Adventures · Book One",
  price: 18.99,
  compareAt: 22.99,
  format: "Hardcover picture book",
  pages: 32,
  ages: "3 – 7",
  isbn: "978-0-00000-000-0",
  images: { front: frontCover.url, back: backCover.url, full: fullCover.url },
  blurb: [
    "Baby Bear is sure the forest is out to get him.",
    "First Mr. Spider, then Mrs. Snake, then Fuzzy the caterpillar, and finally the Bees Brothers all seem to want to eat him! But each time, Momma Bear sets down her berry pies and takes him to see for himself, and Baby Bear learns the truth: he has been breaking webs, lifting rocks, and taking honey without a thought for whose home he was disturbing.",
    "With patience and care, Momma Bear teaches him the rules of the forest, where almost everywhere is someone's home, and every creature deserves to be treated with gentleness and respect.",
  ],
};

export const LESSONS = [
  {
    title: "Every place is someone's home",
    text: "From a spider's web to a rock in the sun, Baby Bear discovers the forest is full of neighbours.",
  },
  {
    title: "Curiosity with kindness",
    text: "Exploring is wonderful — and it's even better when we tread gently and look before we touch.",
  },
  {
    title: "Fear fades with understanding",
    text: "Momma Bear shows that the scariest creatures are usually just frightened of us.",
  },
  {
    title: "Patience is a superpower",
    text: "Instead of scolding, Momma Bear walks beside Baby Bear until he sees things for himself.",
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
