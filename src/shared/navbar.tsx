import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@_components/ui/navigation-menu";
import { Button } from "@_components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";

interface navItem {
  path: string;
  label: string;
  icon?: string;
}

const defaultNavItems: navItem[] = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/about",
    label: "About",
  },
];

const Navbar: React.FC<{ navItems?: navItem[] }> = ({
  navItems = defaultNavItems,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState?.location?.pathname || "/";

  return (
    <div className="flex items-center p-4 bg-black text-white md:justify-center lg:justify-center  sm:justify-between">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <div className="flex items-center sm:hidden">
            <Button
              className="relative inline-flex items-center justify-center rounded-md p-2 focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>

            {navItems.map((item) => (
                <div className="hidden sm:block" key={item.path}>
              <NavigationMenuLink
                key={item.path}
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  to={item.path}
                 className={`space-x-2 hover:bg-white hover:text-black hidden sm:block ${currentPath === item.path ? "bg-white text-black" : ""}`}
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
              </div>
            ))}
        </NavigationMenuList>
      </NavigationMenu>
      {mobileOpen && (
        <div
          className="absolute top-16 left-0 w-full bg-black z-50 sm:hidden"
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block rounded-md px-3 py-2 text-base font-medium hover:bg-white hover:text-black ${currentPath === item.path ? "bg-white text-black" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
