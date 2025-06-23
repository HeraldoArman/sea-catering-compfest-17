"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar, AvatarIcon } from "@heroui/avatar";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
const navItems = [
  {
    label: "Home",
    href: "/",
    description: "Start your healthy journey with SEA Catering",
  },
  {
    label: "Products",
    href: "/products",
    description: "Browse our nutritious meal plans and offerings",
  },
  {
    label: "Subscription",
    href: "/subscription",
    description: "Flexible plans for daily healthy meals delivered",
  },
  {
    label: "Contact Us",
    href: "/contact",
    description: "Get in touch with our team for support or inquiries",
  },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
      >
        <HeroUINavbar
          maxWidth="xl"
          className="bg-transparent"
          classNames={{
            wrapper: "px-6 py-2",
          }}
        >
          {/* Brand Section */}
          <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
            <NavbarBrand as="li" className="gap-3 max-w-fit">
              <NextLink
                className="flex justify-start items-center gap-3 group"
                href="/"
                onClick={closeMobileMenu}
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <span className="text-white font-bold text-xl">SC</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl scale-110" />
                </motion.div>
                <div className="hidden sm:block">
                  <p className="font-bold text-xl text-gray-900 transition-colors duration-300">
                    SEA Catering
                  </p>
                  <p className="text-sm text-gray-600 transition-colors duration-300">
                    Healthy Living
                  </p>
                </div>
              </NextLink>
            </NavbarBrand>
          </NavbarContent>

          {/* Desktop Navigation */}
          <NavbarContent
            className="hidden lg:flex justify-center w-full"
            justify="center"
          >
            <ul className="flex gap-2">
              {navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink href={item.href} onClick={closeMobileMenu}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="relative group px-4 py-2 rounded-xl transition-all duration-300"
                    >
                      <span
                        className={`font-medium transition-colors duration-300 ${
                          isActive(item.href)
                            ? "text-blue-600"
                            : "text-gray-700 hover:text-blue-600"
                        }`}
                      >
                        {item.label}
                      </span>

                      {/* Active indicator */}
                      {isActive(item.href) && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-xl bg-blue-50 border border-blue-200"
                          style={{ zIndex: -1 }}
                        />
                      )}

                      {/* Hover effect */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-50"
                        style={{ zIndex: -1 }}
                      />
                    </motion.div>
                  </NextLink>
                </NavbarItem>
              ))}
            </ul>
          </NavbarContent>

          {/* Right Section */}
          <NavbarContent
            className="hidden sm:flex basis-1/5 sm:basis-full"
            justify="end"
          >
            <div className="flex items-center gap-2">
              {/* User Menu */}
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button variant="light" className="p-0 min-w-0 h-auto">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-700 font-medium px-1">user</p>
                      <Avatar
                        size="sm"
                        className="border-2 border-gray-200"
                        icon={<AvatarIcon />}
                      />

                      <ChevronDown className="w-4 h-4 text-gray-600 transition-colors duration-300" />
                    </div>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="User menu">
                  <DropdownItem
                    key="profile"
                    startContent={<User className="w-4 h-4" />}
                  >
                    Profile
                  </DropdownItem>
                  <DropdownItem
                    key="settings"
                    startContent={<Settings className="w-4 h-4" />}
                  >
                    Settings
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    startContent={<LogOut className="w-4 h-4" />}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              {/* CTA Button */}
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 ml-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                radius="full"
                as={Link}
                href="/sign-in"
              >
                Get Started
              </Button>
            </div>
          </NavbarContent>

          {/* Mobile Menu Toggle */}
          <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
            <div className="flex items-center gap-2">
              <Button
                isIconOnly
                variant="light"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                onPress={handleMobileMenuToggle}
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </motion.div>
              </Button>
            </div>
          </NavbarContent>
        </HeroUINavbar>

        {/* Mobile Search */}
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-50 lg:hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">SC</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">SEA Catering</p>
                      <p className="text-sm text-gray-600">Healthy Living</p>
                    </div>
                  </div>
                  <Button isIconOnly variant="light" onPress={closeMobileMenu}>
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <NextLink
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={`block p-4 rounded-xl transition-all duration-300 ${
                          isActive(item.href)
                            ? "bg-blue-50 border border-blue-200 text-blue-600"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {item.description}
                        </div>
                      </NextLink>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
                    size="lg"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
