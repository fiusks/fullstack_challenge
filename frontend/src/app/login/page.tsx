'use client'

import { ChangeEvent, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/assets/grupo-boticario.svg';
import Image from 'next/image';
import Link from 'next/link';

import { getToken, setToken } from '@/utils';

export default function Login() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const values = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();

        setToken(data.token);

        router.push('/');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="flex flex-col justify-center items-center p-8 bg-white rounded-xl drop-shadow-xl">
        <Image
          src={Logo}
          alt="Logo Boticário"
          style={{ height: 50, width: 'auto' }}
        />

        <div className="flex flex-col items-center pb-5 pt-5">
          <h1 className="font-bold text-xl text-gray-500">Login</h1>
          <p className=" text-gray-500 text-xs p-2">
            Enter your username and password to log in
          </p>
        </div>

        <form onSubmit={handleSubmit}>
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
              name="email"
              className="border border-gray-100 rounded-md p-3 bg-gray-200 text-xs w-72"
              placeholder="johndue@mail.com"
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
      </div>
    </main>
  );
}
