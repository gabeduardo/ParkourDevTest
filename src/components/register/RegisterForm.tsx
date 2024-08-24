"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormattedMessage } from "react-intl";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("El campo contraseña y confirmar contraseña no coinciden");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/sign-in");
    }
  });

  return (
    <form onSubmit={onSubmit} className="w-full">
      <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
        Nombre:
      </label>
      <input
        type="text"
        {...register("username", {
          required: {
            value: true,
            message: "Username is required",
          },
        })}
        className="p-3 rounded block mb-2 bg-slate-100 border border-solid border-slate-300 text-slate-300 w-full"
        placeholder="yourUser123"
      />

      {errors.username && (
        <span className="text-red-500 text-xs">{errors.username.message}</span>
      )}

      <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
        Correo:
      </label>
      <input
        type="email"
        {...register("email", {
          required: {
            value: true,
            message: "Email is required",
          },
        })}
        className="p-3 rounded block mb-2 bg-slate-100 border border-solid border-slate-300 text-slate-300 w-full"
        placeholder="user@email.com"
      />
      {errors.email && (
        <span className="text-red-500 text-xs">{errors.email.message}</span>
      )}

      <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
        Contraseña:
      </label>
      <input
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Password is required",
          },
        })}
        className="p-3 rounded block mb-2 bg-slate-100 border border-solid border-slate-300 text-slate-300 w-full"
        placeholder="********"
      />
      {errors.password && (
        <span className="text-red-500 text-sm">{errors.password.message}</span>
      )}

      <label
        htmlFor="confirmPassword"
        className="text-slate-500 mb-2 block text-sm"
      >
        Confirmar Contraseña:
      </label>
      <input
        type="password"
        {...register("confirmPassword", {
          required: {
            value: true,
            message: "Confirm Password is required",
          },
        })}
        className="p-3 rounded block mb-2 bg-slate-100 border border-solid border-slate-300 text-slate-300 w-full"
        placeholder="********"
      />
      {errors.confirmPassword && (
        <span className="text-red-500 text-sm">
          {errors.confirmPassword.message}
        </span>
      )}
      <div className="w-full flex items-center justify-center">
        <button className="w-full md:w-auto px-6 bg-blue-500 text-white p-3 rounded-lg mt-2">
          Registrarse
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
