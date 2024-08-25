"use client";
import { emailSchema } from "@/lib/email/utils";
import { useRef, useState } from "react";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

type FormInput = z.infer<typeof emailSchema>;
type Errors = { [K in keyof FormInput]: string[] };

const ResendForm = () => {
  const { data } = useSession();
  console.log("datica", data);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const sendEmail = async () => {
    setSending(true);
    setErrors(null);
    try {
      const payload = emailSchema.parse({
        name: nameInputRef.current?.value,
        email: emailInputRef.current?.value,
        userId: data?.user.id,
      });
      const req = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await req.json();
      if (response?.data?.id) toast.success("Successfully sent!");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.flatten().fieldErrors as Errors);
      }
    } finally {
      setSending(false);
    }
  };
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {errors && (
          <p className="bg-neutral-50 p-3">{JSON.stringify(errors, null, 2)}</p>
        )}
        <div>
          <label className="text-neutral-700 text-sm">Name</label>
          <input
            type="text"
            placeholder="Tim"
            name="name"
            ref={nameInputRef}
            className={`
              w-full px-3 py-2 text-sm rounded-md border focus:outline-neutral-700 ${
                !!errors?.name ? "border-red-700" : "border-neutral-200"
              }`}
          />
        </div>
        <div>
          <label className="text-muted-foreground">Email</label>
          <input
            type="email"
            placeholder="tim@apple.com"
            name="email"
            ref={emailInputRef}
            className={`
              w-full px-3 py-2 text-sm rounded-md border focus:outline-neutral-700 ${
                !!errors?.email ? "border-red-700" : "border-neutral-200"
              }`}
          />
        </div>
      </div>
      <button
        onClick={() => sendEmail()}
        className="text-sm w-fit bg-black text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-70"
        disabled={sending}
      >
        {sending ? "sending..." : "Send Email"}
      </button>
    </form>
  );
};

export default ResendForm;
