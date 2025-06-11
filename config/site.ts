export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "SEA Catering",
  description: "Delicious recipes and healthy diet solutions for everyone.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "Recipes",
      href: "/recipes",
    },
    {
      label: "Adventure Trip",
      href: "/adventure",
    },
    {
      label: "Food Training",
      href: "/training",
    },
  ],
  navMenuItems: [
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "Recipes",
      href: "/recipes",
    },
    {
      label: "Adventure Trip",
      href: "/adventure",
    },
    {
      label: "Food Training",
      href: "/training",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  links: {
    github: "https://github.com/seacatering",
    twitter: "https://twitter.com/seacatering",
    docs: "https://seacatering.com/docs",
    discord: "https://discord.gg/seacatering",
    sponsor: "https://patreon.com/seacatering",
  },
}
