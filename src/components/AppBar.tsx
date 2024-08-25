"use client";
import MobileNavbar from "./MobileNavbar";
// import NavBar, { NavBarOptions } from "./NavBar";

// const navBarOptions: NavBarOptions[] = [
//   { label: "Dashboard", url: "/dashboard", style: "text" },
//   { label: "Records", url: "/records", style: "text" },
//   { label: "Reports", url: "/reports", style: "text" },
// ];

const AppBar = () => {
  return (
    <>
      <div className="hidden md:block w-full">
        {/* <NavBar withAuth navBarOptions={navBarOptions} /> */}
      </div>
      {/* <MobileNavbar navBarOptions={navBarOptions} /> */}
    </>
  );
};

export default AppBar;
