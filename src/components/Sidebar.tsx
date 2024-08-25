import { UserAccount } from "./AppBar";
import { NavBarOptions } from "./Navbar";
import SidebarItems from "./SidebarItems";

interface SidebarProps {
  navBarOptions: NavBarOptions[];
}

const Sidebar = ({ navBarOptions }: SidebarProps) => {
  return (
    <aside className="h-screen min-w-52 bg-muted hidden md:block p-4 pt-8 border-r border-border shadow-inner">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold ml-4">Logo</h3>
          <SidebarItems navBarOptions={navBarOptions} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
