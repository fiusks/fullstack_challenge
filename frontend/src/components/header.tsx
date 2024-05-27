import Logo from "@/assets/grupo-boticario.svg";
import { logout, selectAuthToken } from "@/lib/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsHandbag } from "react-icons/bs";

export function Header() {

  const token = useAppSelector(selectAuthToken);
  const dispatch = useAppDispatch();
  const router =useRouter()
  
  const handleLogout = () => {
    dispatch(logout());
    router.push('/login')
  };
  



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

        {token?<Link
            onClick={handleLogout}
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
            Sair
        </Link>:null}
        
        
      </div>
    </header>
  );
}
