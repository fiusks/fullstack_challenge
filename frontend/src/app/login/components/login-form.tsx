'use client'


import { getToken, setToken } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router= useRouter()
    

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
  
    const loginSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:3333/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          console.log("🚀 ~ handleSubmit ~ response:", response)
          const data = await response.json();
          
          setToken(data.token)
          
          router.push('/dashboard')
        } 
      } catch (error) {
        console.error("Error occurred during login:", error);
      }
    };

    return(
        <>
         <form onSubmit={loginSubmit} className="">
          <div className="flex flex-col space-y-4">
            <label htmlFor="email:" className="text-xs text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="border border-gray-100 rounded-md p-3 bg-gray-100 text-xs w-72"
              placeholder="johndue@mail.com"
            />

            <label htmlFor="password" className="text-xs text-gray-600 font-medium ">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="border border-gray-100 rounded-md p-3 bg-gray-100 text-xs w-72"
              placeholder="********"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200 ease-in-out text-sm"
            >
              Login
            </button>
          </div>
        </form>
        </>
    )
}