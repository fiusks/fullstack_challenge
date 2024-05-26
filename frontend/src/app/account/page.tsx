"use client";

import { Header } from "@/components";
import React, { ChangeEvent, useState } from "react";
import { Input } from "./components/input";
import AddressForm from "./components/address-form";
import { AddButton } from "./components/button";
import Link from "next/link";

export interface AccountProps {
  id: string;
  cpf: string;
  email: string;
  username: string;
  password: string;
  name: string;
  phone?: string;
  birthday?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountAddressProps {
  id: string;
  customerId: string;
  zipCode: string;
  street: string;
  neighborhood: string;
  city: string;
  number: string;
  complement: string | null;
  state: string;
  createdAt: string;
  updatedAt: string;
}

export default function Account() {
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1)$2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    setPhone(value);
  };

  return (
    <main className="flex flex-col items-center bg-neutral-50 h-screen">
      <Header />

      <div className="flex flex-col items-center justify-center mt-8 p-6 bg-white rounded-lg">
        <div className="flex flex-col justify-center w-600">
          <h1 className="text-lg font-semibold">Profile</h1>
          <p className="text-xs">
            Manage your account settings and set e-email preferences.
          </p>

          <div className="mt-4 w-full border-b" />
        </div>

        <div>
          <form className="flex flex-col items-center mt-6 w-600">
            <div className="flex justify-between w-full mt-4">
              <div className="flex flex-col w-1/2 mr-2">
                <Input
                  id="name"
                  label="Name"
                  labelHtmlFor="name"
                  placeholder="John Due"
                  type="text"
                />
              </div>

              <div className="flex flex-col w-1/2 ml-2">
                <Input
                  id="email"
                  label="email"
                  labelHtmlFor="email"
                  placeholder="johndue@mail.com"
                  type="email"
                />
              </div>
            </div>

            <div className="flex justify-between w-full mt-4">
              <div className="flex flex-col w-1/2 mr-2">
                <Input
                  id="phone"
                  label="Phone"
                  labelHtmlFor="phone"
                  placeholder="(99)99999-9999"
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={14}
                />
              </div>

              <div className="flex flex-col w-1/2 ml-2">
                <Input
                  id="birthday"
                  label="Birthday"
                  labelHtmlFor="birthday"
                  placeholder="01/01/1990"
                  type="date"
                />
              </div>
            </div>

            <div className="flex justify-between w-full mt-4">
              <div className="flex flex-col w-1/2 mr-2">
                <Input
                  id="password"
                  label="Senha"
                  labelHtmlFor="Senha"
                  placeholder="********"
                  type="password"
                />
              </div>

              <div className="flex flex-col w-1/2 ml-2">
                <Input
                  id="password2"
                  label="Digite sua senha novamente"
                  labelHtmlFor="password2"
                  placeholder="********"
                  type="password"
                />
              </div>
            </div>

            <div className="flex flex-row justify-end w-full">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md p-2 px-6 mt-4 hover:bg-blue-600 transition duration-200 ease-in-out text-xs"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {true ? (
        <AddressForm />
      ) : (
        <>
         <p>Sem endreço cadastrado</p>
        </>
      )}
      
      
    </main>
  );
}
