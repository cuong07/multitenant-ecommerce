"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

interface NavbarProps {
  className?: string;
  href: string;
  children?: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ children, className, href, isActive }: NavbarProps) => {
  return (
    <Button
      variant={"outline"}
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        className,
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { children: "Home", href: "/" },
  { children: "About", href: "/about" },
  { children: "Features", href: "/features" },
  { children: "Pricing", href: "/pricing" },
  { children: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const pathName = usePathname();
  const isActive = (href: string) => pathName === href;
  return (
    <div className="h-20 items-center flex border-b justify-between font-medium bg-white">
      <Link href="/" className="pl-6">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          Silk Road
        </span>
      </Link>

      <NavbarSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        items={navbarItems}
      />

      <div className="lg:flex hidden  items-center space-x-4 pr-6">
        {navbarItems.map((item) => (
          <NavbarItem
            isActive={isActive(item.href)}
            key={item.href}
            {...item}
          />
        ))}
      </div>

      <div className="lg:flex h-full hidden">
        <Button
          asChild
          variant="secondary"
          className="border-l border-y-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg"
        >
          <Link href="/sign-in">Log in</Link>
        </Button>
        <Button
          asChild
          variant="secondary"
          className="border-l border-y-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
        >
          <Link href="/sign-up">Start selling</Link>
        </Button>
      </div>
      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant={"ghost"}
          onClick={toggleSidebar}
          className="size-12 border-transparent bg-white"
        >
          <MenuIcon />
        </Button>
      </div>
    </div>
  );
};
