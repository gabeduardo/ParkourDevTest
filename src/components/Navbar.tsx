"use client";
import Link from "next/link";
import LanguageSelector from "./shared/LanguageSelector";
import { FormattedMessage } from "react-intl";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { UserAccount } from "./AppBar";
import { LucideIcon } from "lucide-react";

export type NavBarOptions = {
  label: string;
  url: string;
  style?: "text" | "button";
  icon?: LucideIcon;
};

interface NavBarProps {
  withAuth?: boolean;
  navBarOptions: NavBarOptions[];
  user: UserAccount;
}

const NavBar = ({ withAuth, navBarOptions, user }: NavBarProps) => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-slate-100 border-b">
      {!withAuth && (
        <Link className="flex items-center justify-center" href="/dashboard">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
      )}
      <nav className="ml-auto flex gap-4 items-center">
        {navBarOptions?.map(({ label, url, style }) => (
          <Link
            key={label}
            className={`${
              style == "button"
                ? "text-sm font-medium hover:bg-blue-400 transition bg-blue-300 py-1 px-4 rounded-2xl text-white underline-offset-4"
                : "text-sm font-medium transition-all opacity-70 hover:opacity-100 underline-offset-4"
            }`}
            href={url}
          >
            <FormattedMessage id={label} />
          </Link>
        ))}
        <LanguageSelector />
        {withAuth && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-transparent w-fit p-0 hover:bg-transparent focus:bg-none focus:shadow-none border-none focus-visible:shadow-none focus-visible:border-none">
                <Avatar className="h-10 w-10 opacity-70 hover:opacity-100 transition-all">
                  <AvatarFallback className="border-border border-2 text-muted-foreground">
                    {user.name
                      ? user.name
                          ?.split(" ")
                          .map((word) => word[0].toUpperCase())
                          .join("")
                      : "~"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                <div className="text-muted-foreground">
                  <p className="text-xs">{user.name ?? "John Doe"}</p>
                  <p className="text-xs font-light pr-4">
                    {user.email ?? "john@doe.com"}
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/" })}
                className="capitalize"
              >
                <FormattedMessage id={"register_signout"} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </header>
  );
};

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export default NavBar;
