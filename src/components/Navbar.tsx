"use client";
import Link from "next/link";
import LanguageSelector from "./shared/LanguageSelector";
import { FormattedMessage } from "react-intl";

export type NavBarOptions = {
  label: string;
  url: string;
  style?: "text" | "button";
};

interface NavBarProps {
  withAuth?: boolean;
  navBarOptions: NavBarOptions[];
}

const NavBar = ({ withAuth, navBarOptions }: NavBarProps) => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-slate-100 border-b">
      {!withAuth && (
        <Link className="flex items-center justify-center" href="/dashboard">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
      )}
      <nav className="ml-auto flex gap-4 items-center">
        {navBarOptions.map(({ label, url, style }) => (
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
