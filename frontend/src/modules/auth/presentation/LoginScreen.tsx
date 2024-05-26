import Logo from "@/assets/grupo-boticario.svg";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./components/login-form";

export default function LoginScreen() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="flex flex-col justify-center items-center p-8 bg-white rounded-xl drop-shadow-xl">
        <Image src={Logo} alt="Logo Boticário" style={{ height: 50, width: "auto" }} />

        <div className="flex flex-col items-center pb-5 pt-5">
          <h1 className="font-bold text-xl text-gray-500">Login</h1>
          <p className=" text-gray-500 text-xs p-2">
            Enter your username and password to log in
          </p>
        </div>

        <LoginForm/>
      </div>
    </main>
  );
}
