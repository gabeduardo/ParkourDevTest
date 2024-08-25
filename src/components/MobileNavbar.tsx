"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlignRight } from "lucide-react";
// import { NavBarOptions } from "./NavBar";

type MobileNavbarProps = {
  withAuth?: boolean;
  navBarOptions: any;
};

const MobileNavbar = ({ navBarOptions }: MobileNavbarProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="md:hidden border-b py-2 w-full">
      <nav className="flex justify-between w-full items-center">
        <div className="font-semibold text-lg pl-6">Logo</div>
        <Button variant="ghost" className="mr-2" onClick={() => setOpen(!open)}>
          <AlignRight />
        </Button>
      </nav>
      {open ? (
        <div className="my-4 p-4 bg-muted">
          <ul className="space-y-2">
            {/* {navBarOptions.map(({ label, url }) => (
              <li key={label} onClick={() => setOpen(false)} className="">
                <Link
                  href={url}
                  className={
                    pathname === url
                      ? "text-primary hover:text-primary font-semibold"
                      : "text-muted-foreground hover:text-primary"
                  }
                >
                  {label}
                </Link>
              </li>
            ))} */}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
export default MobileNavbar;
