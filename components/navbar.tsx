import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar"
import { Button } from "@heroui/button"
import { Link } from "@heroui/link"
import NextLink from "next/link"
import { Search } from "lucide-react"

export const Navbar = () => {
  const navItems = [
    { label: "Products", href: "/products" },
    { label: "Recipes", href: "/recipes" },
    { label: "Adventure Trip", href: "/adventure" },
    { label: "Food Training", href: "/training" },
    { label: "SEA Catering", href: "/about" },
  ]

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      className="bg-teal-800/90 backdrop-blur-md border-b border-teal-700/50"
      classNames={{
        wrapper: "px-6",
        brand: "text-white",
        content: "text-white",
        item: "text-white",
        toggle: "text-white",
      }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-teal-800 font-bold text-xl">SC</span>
            </div>
            <p className="font-bold text-white text-xl hidden sm:block">SEA Catering</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-8 justify-start ml-8">
          {navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className="text-white hover:text-teal-200 transition-colors duration-200 font-medium"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem>
          <Button isIconOnly variant="light" className="text-white hover:bg-teal-700/50" aria-label="Search">
            <Search className="w-5 h-5" />
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Button isIconOnly variant="light" className="text-white hover:bg-teal-700/50" aria-label="Search">
          <Search className="w-5 h-5" />
        </Button>
        <NavbarMenuToggle className="text-white" />
      </NavbarContent>

      <NavbarMenu className="bg-teal-800/95 backdrop-blur-md">
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {navItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link
                className="text-white hover:text-teal-200 transition-colors duration-200"
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  )
}
