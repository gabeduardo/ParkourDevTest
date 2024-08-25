"use client";
import MobileNavbar from "./MobileNavbar";
import NavBar, { NavBarOptions } from "./Navbar";

export type UserAccount = {
  id: string;
  name?: string;
  email?: string;
};

interface AppBarProps {
  navBarOptions: NavBarOptions[];
  user: UserAccount;
}

const AppBar = ({ user, navBarOptions }: AppBarProps) => {
  return (
    <>
      <div className="hidden md:block w-full">
        <NavBar withAuth navBarOptions={navBarOptions} user={user} />
      </div>
      <MobileNavbar navBarOptions={navBarOptions} />
    </>
  );
};

export default AppBar;
