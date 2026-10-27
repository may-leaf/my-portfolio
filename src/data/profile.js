export const profile = {
  eyebrow: "ILLUSTRATOR",
  nameJa: "まぐろ寿司",
  nameEn: "MaguroSushi",
  avatar: {
    src: "/profile.jpg",
    alt: "Portrait illustration of MaguroSushi",
  },
  bio: [
    { text: "Hi! I'm " },
    { text: "MaguroSushi", strong: true },
    { text: ", but you can call me Maguro or " },
    { text: "Tuna", strong: true },
    {
      text: ". I'm an illustrator from Indonesia specializing in anime and manga art styles. I love creating expressive and vibrant characters, whether they're original or fan art.",
    },
  ],
  links: [
    {
      label: "Portfolio",
      href: "/portfolio",
      description: "Browse recent illustrations",
    },
    {
      label: "Commission info",
      href: "/commission",
      description: "Prices, add-ons and terms",
      variant: "primary",
    },
    {
      label: "Terms of Service",
      href: "/commission#terms",
      description: "What I draw and how I work",
    },
  ],
};
