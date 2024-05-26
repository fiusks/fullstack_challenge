import Logo from "@/assets/grupo-boticario.svg";
import { getToken, isAuthenticated, removeToken } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BsHandbag } from "react-icons/bs";

export function Header() {


  return (
    <header className="flex flex-row items-center justify-between w-full px-8 py-2 bg-white">
      <Image src={Logo} alt="Logo Boticário" style={{ height: 30, width: "auto" }} />

      <div className="flex flex-row items-center">
        <div className="flex flex-col items-center pb-5 pt-5">
          <h3 className="text-xs">Olá Rafael! Entrar na</h3>
          <Link
            href="/account"
            style={{ color: "#3b82f6", fontSize: 12 }}
            className="font-bold"
          >
            Minha Conta
          </Link>
        </div>

        <div>
          <Link
            href="/cart"
            className="text-black hover:text-blue-500 duration-100"
            style={{
              fontSize: 12,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 22
            }}
          >
            <BsHandbag size={20} />
            <p className="text-xs pl-1">Sacola</p>
          </Link>
        </div>

        {isAuthenticated()?<Link
            href="/login"
            className="text-black hover:text-blue-500 duration-100"
            style={{
              fontSize: 12,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 22
            }}
          >
            <button onSubmit={()=>removeToken}>Sair</button>
        </Link>:null}
        
        
      </div>
    </header>
  );
}
