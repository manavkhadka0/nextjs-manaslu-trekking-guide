import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";

type NavMenuProps = NavigationMenuProps & {
  scrolled?: boolean;
};

export const NavMenu = ({ scrolled, ...props }: NavMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList
      className={cn(
        "gap-8 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:gap-4",
        scrolled ? "text-foreground" : "text-white",
        props.className
      )}
      data-scrolled={scrolled ? "true" : "false"}
    >
      <NavigationMenuItem className="relative group">
        <NavigationMenuLink asChild>
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary"
            )}
          >
            Home
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="relative group">
        <NavigationMenuLink asChild>
          <Link
            href="/services"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary"
            )}
          >
            Services
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="relative group">
        <NavigationMenuLink asChild>
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary"
            )}
          >
            About
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="relative group">
        <NavigationMenuLink asChild>
          <Link
            href="/media"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary"
            )}
          >
            Media
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="relative group">
        <NavigationMenuLink asChild>
          <Link
            href="/blog"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary"
            )}
          >
            Blog
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="relative group">
        <NavigationMenuLink asChild>
          <Link
            href="#contact"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary"
            )}
          >
            Contact
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);
