"use client";

import { useRouter } from "next/navigation";
import { FormattedMessage } from "react-intl";

export default function SignOutBtn() {
  const router = useRouter();
  const handleSignOut = async () => {
    const response = await fetch("/api/sign-out", {
      method: "POST",
      redirect: "manual",
    });

    if (response.status === 0) {
      // redirected
      // when using `redirect: "manual"`, response status 0 is returned
      return router.refresh();
    }
  };
  return (
    <button onClick={handleSignOut} className="w-full text-left">
      <FormattedMessage id={"register_signout"} />
    </button>
  );
}
