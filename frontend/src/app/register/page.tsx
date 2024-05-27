"use client";

import { useRouter } from "next/navigation";
import Logo from "@/assets/grupo-boticario.svg";
import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks";
import { setAuthToken } from "@/lib/features/authSlice";
import { fetchHttpClient } from "@/modules/common";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

type RegisterForm = {
  email: string;
  name: string;
  username: string;
  cpf: string;
  phone: string;
  password: string;
};

export default function CreateAccountPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<RegisterForm>();

  const registerAccount: SubmitHandler<RegisterForm> = async (formData) => {
    try {
      const response = await fetchHttpClient("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          cpf: formData.cpf.replace(/\D/g, ""),
        }),
      });

      if (response.ok) {
        const data = await response.json();

        dispatch(setAuthToken(data));

        router.push("/");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="flex flex-col justify-center items-center p-8 bg-white rounded-xl drop-shadow-xl">
        <Image
          src={Logo}
          alt="Logo Boticário"
          style={{ height: 50, width: "auto" }}
        />

        <div className="flex flex-col items-center pb-5 pt-5">
          <h1 className="font-bold text-xl text-gray-500">Crie sua conta</h1>
          <p className=" text-gray-500 text-xs p-2">
            Insira seus dados para criar sua conta
          </p>
        </div>

        <form onSubmit={handleSubmit(registerAccount)}>
          <div className="flex flex-col space-y-4">
            <label
              htmlFor="email:"
              className="text-xs text-gray-600 font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-100 rounded-md p-3 bg-gray-100 text-xs w-72"
              placeholder="johndue@mail.com"
              {...register("email")}
            />

            <label
              htmlFor="email:"
              className="text-xs text-gray-600 font-medium"
            >
              Nome completo
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-100 rounded-md p-3 bg-gray-100 text-xs w-72"
              placeholder="John Doe"
              {...register("name")}
            />

            <label
              htmlFor="email:"
              className="text-xs text-gray-600 font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="border border-gray-100 rounded-md p-3 bg-gray-100 text-xs w-72"
              placeholder="johndoe"
              {...register("username")}
            />

            <label
              htmlFor="email:"
              className="text-xs text-gray-600 font-medium"
            >
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              className="border border-gray-100 rounded-md p-3 bg-gray-100 text-xs w-72"
              placeholder="000.000.000-00"
              {...register("cpf")}
            />

            <label
              htmlFor="email:"
              className="text-xs text-gray-600 font-medium"
            >
              Telefone
            </label>
            <input
              type="text"
              id="phone"
              className="border border-gray-100 rounded-md p-3 bg-gray-100 text-xs w-72"
              placeholder="(11) 99999-9999"
              {...register("phone")}
            />

            <label
              htmlFor="password"
              className="text-xs text-gray-600 font-medium "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-100 rounded-md p-3 bg-gray-100 text-xs w-72"
              placeholder="********"
              {...register("password")}
            />

            <div className="flex flex-col items-end">
              <Link href="/login" style={{ color: "#3b82f6", fontSize: 12 }}>
                Já tem conta? Faça login
              </Link>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200 ease-in-out text-sm"
            >
              Criar conta
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
