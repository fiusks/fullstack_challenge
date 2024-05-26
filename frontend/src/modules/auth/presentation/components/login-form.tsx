'use client'

import { getToken, setToken } from "@/utils";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, FormEvent } from "react";

export function LoginForm() {
    const router = useRouter()
    
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const formData = new FormData(event.currentTarget)

      const values = Object.fromEntries(formData.entries());
      
      try {
        const response = await fetch("http://localhost:3333/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          
          const data = await response.json();
          
          setToken(data.token)
          
          router.push('/')
        } 
      } catch (error) {
        console.error("Error occurred during login:", error);
      }
    };

    return(
         <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <label htmlFor="email:" className="text-xs text-gray-600 font-medium">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-100 rounded-md p-3 bg-gray-200 text-xs w-72"
              placeholder="johndue@mail.com"
            />

            <label htmlFor="password" className="text-xs text-gray-600 font-medium ">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
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
    )
}