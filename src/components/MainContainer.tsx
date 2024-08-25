import NavBar, { NavBarOptions } from "@/components/NavBar";
import Footer from "./shared/Footer";

const navBarOptions: NavBarOptions[] = [
  { label: "register_action", url: "/", style: "text" },
  { label: "login_action", url: "/sign-in", style: "button" },
];

const MainContainer = ({ children }: any) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar navBarOptions={navBarOptions} />
      <main className="flex-1 w-full grid place-items-center">{children}</main>
      <Footer />
    </div>
  );
};

export default MainContainer;
