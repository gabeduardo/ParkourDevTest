"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavBarOptions } from "./Navbar";

export interface SidebarItemsOptions {
  navBarOptions: NavBarOptions[];
  title?: string;
  border?: boolean;
}

export interface SidebarLinkProps {
  navBarOption: NavBarOptions;
  active: boolean;
}

const SidebarItems = ({
  navBarOptions,
  title,
  border,
}: SidebarItemsOptions) => {
  const fullPathname = usePathname();
  const pathname = "/" + fullPathname.split("/")[1];

  return (
    <div className={border ? "border-border border-t my-8 pt-4" : ""}>
      {title ? (
        <h4 className="px-2 mb-2 text-xs uppercase text-muted-foreground tracking-wider">
          {title}
        </h4>
      ) : null}
      <ul>
        {navBarOptions?.map((navBarOption) => (
          <li key={navBarOption.label}>
            <SidebarLink
              navBarOption={navBarOption}
              active={pathname === navBarOption.url}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
const SidebarLink = ({ navBarOption, active }: SidebarLinkProps) => {
  const { url, label } = navBarOption;
  return (
    <Link
      href={url}
      className={`group transition-colors p-2 inline-block hover:bg-popover hover:text-primary text-muted-foreground text-xs hover:shadow rounded-md w-full${
        active ? " text-primary font-semibold" : ""
      }`}
    >
      <div className="flex items-center">
        <div
          className={cn(
            "opacity-0 left-0 h-6 w-[4px] absolute rounded-r-lg bg-primary",
            active ? "opacity-100" : ""
          )}
        />
        <span>{label}</span>
      </div>
    </Link>
  );
};

export default SidebarItems;
