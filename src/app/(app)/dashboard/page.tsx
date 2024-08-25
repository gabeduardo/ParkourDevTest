import SignIn from "@/components/auth/SignIn";
import { getUserAuth } from "@/lib/auth/utils";
import MainContainerApp from "../MainContainerApp";

export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <MainContainerApp title="Dashboard">
      <div className="flex flex-col gap-4">
        {session ? (
          <pre className="bg-secondary p-4 rounded-sm shadow-sm text-secondary-foreground break-all whitespace-break-spaces">
            {JSON.stringify(session, null, 2)}
          </pre>
        ) : null}
        <SignIn />
      </div>
    </MainContainerApp>
  );
}
