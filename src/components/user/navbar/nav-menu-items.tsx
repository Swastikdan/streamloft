"use client";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { HOME_PAGE, MOVIES_PAGE, TV_SHOWS_PAGE, CATEGORIES } from "@/constants";
export function NavMenuItems() {
  const pathname = usePathname();
  return (
    <ul className="hidden items-center gap-2 md:flex">
      <li>
        <NavMenuItem
          href={HOME_PAGE}
          isActive={pathname === HOME_PAGE}
          innerText="Home"
        />
      </li>
      <li>
        <NavMenuItem
          href={MOVIES_PAGE}
          isActive={pathname === MOVIES_PAGE}
          innerText="Movies"
        />
      </li>
      <li>
        <NavMenuItem
          href={TV_SHOWS_PAGE}
          isActive={pathname === TV_SHOWS_PAGE}
          innerText="TV Shows"
        />
      </li>
      <li>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="shadow-xs">
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-card grid w-full min-w-[32rem] grid-cols-3 gap-4 py-3">
                {CATEGORIES.map((category) => (
                  <Link href={category.path} key={category.title}>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full justify-start font-light"
                    >
                      <NavigationMenuLink>{category.title}</NavigationMenuLink>
                    </Button>
                  </Link>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </li>
    </ul>
  );
}

const NavMenuItem = ({
  href,
  isActive,
  className,
  innerText,
  ...props
}: LinkProps & {
  isActive?: boolean;
  className?: string;
  innerText: string;
}) => {
  return (
    <Link href={href} {...props}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={`${cn(className)} px-5`}
      >
        {innerText}
      </Button>
    </Link>
  );
};
