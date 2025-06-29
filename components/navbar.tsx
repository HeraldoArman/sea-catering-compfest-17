"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
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
import { Menu, X, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/utils/auth-client";

const navItems = [
  {
    label: "Home",
    href: "/",
    description: "Start your healthy journey with SEA Catering",
  },
  {
    label: "Subscription",
    href: "/subscription",
    description: "Flexible plans for daily healthy meals delivered",
  },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const onLogout = () => {
    authClient.signOut();
    router.push("/sign-in");
    closeMobileMenu();
  };

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
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/98 backdrop-blur-xl border-b border-gray-200/80 shadow-xl"
            : "bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
        }`}
        initial={{ y: -100 }}
        style={{
          zIndex: 9999,
          position: "fixed",
          isolation: "isolate",
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <HeroUINavbar
          className="bg-transparent relative w-full"
          classNames={{
            wrapper: "px-4 sm:px-6 py-2 relative w-full max-w-none",
            base: "bg-transparent w-full",
          }}
          maxWidth="xl"
          style={{ zIndex: "inherit" }}
        >
          <NavbarContent className="basis-auto sm:basis-1/4" justify="start">
            <NavbarBrand as="li" className="gap-2 sm:gap-3 max-w-fit">
              <NextLink
                className="flex justify-start items-center gap-2 sm:gap-3 group relative z-10"
                href="/"
                onClick={closeMobileMenu}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <span className="text-white font-bold text-lg sm:text-xl">
                      SC
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl scale-110" />
                </motion.div>
                <div className="hidden sm:block">
                  <p className="font-bold text-lg sm:text-xl text-gray-900 transition-colors duration-300">
                    SEA Catering
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 transition-colors duration-300">
                    Healthy Living
                  </p>
                </div>
              </NextLink>
            </NavbarBrand>
          </NavbarContent>

          {/* Desktop Navigation - Center with flex-1 */}
          <NavbarContent
            className="hidden md:flex flex-1 justify-center"
            justify="center"
          >
            <div className="flex gap-1 xl:gap-2" style={{ zIndex: 10 }}>
              {navItems.map((item) => (
                <div key={item.href} className="relative">
                  <NextLink href={item.href} onClick={closeMobileMenu}>
                    <motion.div
                      className="relative group px-3 xl:px-4 py-2 rounded-xl transition-all duration-300"
                      whileHover={{ y: -2 }}
                    >
                      <span
                        className={`font-medium transition-colors duration-300 text-sm xl:text-base whitespace-nowrap ${
                          isActive(item.href)
                            ? "text-blue-600"
                            : "text-gray-700 hover:text-blue-600"
                        }`}
                      >
                        {item.label}
                      </span>

                      {isActive(item.href) && (
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-blue-50 border border-blue-200"
                          layoutId="activeTab"
                          style={{ zIndex: -1 }}
                        />
                      )}

                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-50"
                        style={{ zIndex: -1 }}
                      />
                    </motion.div>
                  </NextLink>
                </div>
              ))}
            </div>
          </NavbarContent>

          <NavbarContent
            className="hidden sm:flex basis-auto sm:basis-1/4"
            justify="end"
            style={{ zIndex: 10 }}
          >
            {!!data?.user ? (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button
                    className="p-0 min-w-0 h-auto relative z-10"
                    variant="light"
                  >
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-700 font-medium px-1 hidden md:block">
                        {data?.user.name}
                      </p>
                      <Avatar
                        className="border-2 border-gray-200"
                        icon={!data?.user.image ? <AvatarIcon /> : undefined}
                        size="sm"
                        src={data?.user.image ?? undefined}
                      />
                      <ChevronDown className="w-4 h-4 text-gray-600 transition-colors duration-300" />
                    </div>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="User menu"
                  className="relative"
                  style={{ zIndex: 10000 }}
                >
                  <DropdownItem
                    key="dashboard"
                    startContent={<LayoutDashboard className="w-4 h-4" />}
                    onClick={() => router.push("/dashboard")}
                  >
                    Dashboard
                  </DropdownItem>

                  <DropdownItem
                    key="logout"
                    color="danger"
                    startContent={<LogOut className="w-4 h-4" />}
                    onPress={onLogout}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  as={Link}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-4 sm:px-6 text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  href="/sign-up"
                  radius="full"
                >
                  Get Started
                </Button>
              </div>
            )}
          </NavbarContent>

          <NavbarContent className="sm:hidden basis-1 pl-2" justify="end">
            <div className="flex items-center gap-2">
              <Button
                isIconOnly
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 relative z-10"
                style={{ zIndex: 10 }}
                variant="light"
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
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              animate={{ opacity: 1 }}
              className="fixed inset-0  backdrop-blur-sm lg:hidden"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              style={{
                zIndex: 9998,
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              transition={{ duration: 0.3 }}
              onClick={closeMobileMenu}
            />

            <motion.div
              animate={{ x: 0 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white/98 backdrop-blur-xl shadow-2xl lg:hidden overflow-y-auto"
              exit={{ x: "100%" }}
              initial={{ x: "100%" }}
              style={{
                zIndex: 10000,
                position: "fixed",
                isolation: "isolate",
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="p-4 sm:p-6 h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">SC</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">SEA Catering</p>
                      <p className="text-sm text-gray-600">Healthy Living</p>
                    </div>
                  </div>
                  <Button
                    isIconOnly
                    className="relative z-10"
                    variant="light"
                    onPress={closeMobileMenu}
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-2 mb-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      animate={{ opacity: 1, x: 0 }}
                      initial={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <NextLink
                        className={`block p-4 rounded-xl transition-all duration-300 ${
                          isActive(item.href)
                            ? "bg-blue-50 border border-blue-200 text-blue-600"
                            : "hover:bg-gray-50 text-gray-700 active:bg-gray-100"
                        }`}
                        href={item.href}
                        onClick={closeMobileMenu}
                      >
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {item.description}
                        </div>
                      </NextLink>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile User Section */}
                {!!data?.user ? (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-auto pt-6 border-t border-gray-200 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    {/* User Info Card */}
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <Avatar
                        className="border-2 border-gray-200"
                        icon={<AvatarIcon />}
                        size="md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {data?.user.name}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {data?.user.email}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        className="w-full justify-start"
                        size="lg"
                        startContent={<LayoutDashboard className="w-4 h-4" />}
                        variant="light"
                        onClick={() => router.push("/dashboard")}
                      >
                        dashboard
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Button
                        className="w-full justify-start"
                        color="danger"
                        size="lg"
                        startContent={<LogOut className="w-4 h-4" />}
                        variant="light"
                        onPress={onLogout}
                      >
                        Log Out
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="mt-auto pt-6 border-t border-gray-200 space-y-4">
                    <Button
                      as={Link}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
                      href="/sign-up"
                      size="lg"
                      onPress={closeMobileMenu}
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-16 sm:h-20" />
    </>
  );
};
