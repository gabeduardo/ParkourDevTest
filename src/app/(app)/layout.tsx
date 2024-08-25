import { checkAuth } from "@/lib/auth/utils";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/Sidebar";
import NextAuthProvider from "@/lib/auth/Provider";
import AppBar from "../../components/AppBar";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return (
    <main>
      <NextAuthProvider>
        <div className="flex h-screen w-full">
          <Sidebar />
          <div className="w-full">
            <AppBar />
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
