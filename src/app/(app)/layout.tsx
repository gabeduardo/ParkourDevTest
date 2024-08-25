import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/Sidebar";
import NextAuthProvider from "@/lib/auth/Provider";
import AppBar from "../../components/AppBar";
import { NavBarOptions } from "@/components/Navbar";

const navBarOptions: NavBarOptions[] = [
  { label: "Dashboard", url: "/dashboard", style: "text" },
  { label: "Records", url: "/records", style: "text" },
  { label: "Reports", url: "/reports", style: "text" },
];

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserAuth();
  if (session.session === null) return null;
  const { user }: any = session.session;

  if (!user?.name || user.name.length == 0) return null;

  console.log("holi", navBarOptions);
  return (
    <main>
      <NextAuthProvider>
        <div className="flex h-screen w-full">
          <Sidebar navBarOptions={navBarOptions} />
          <div className="w-full">
            <AppBar navBarOptions={navBarOptions} user={user} />
            <main className="flex-1 md:p-8 pt-2 p-8 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </NextAuthProvider>

      <Toaster richColors />
    </main>
  );
}
