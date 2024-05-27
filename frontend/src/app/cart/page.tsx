'use client'
import { Header } from "@/components";
import { convertCurrencyToLocaleBRL } from "@/utils";
import { Product } from "./components";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { cleanCart, selectCart } from "@/lib/features/cartSlice";
import { ToastContainer, toast } from 'react-toastify';
import { fetchHttpClient } from "@/modules/common";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useMemo } from "react";
import { selectAuthToken } from "@/lib/features/authSlice";

export default function Cart() {
  const router = useRouter()
  const items = useAppSelector(selectCart);
  
  const dispatch = useAppDispatch()  

  const token = useAppSelector(selectAuthToken);

  
  const total = items.reduce((acc, item) => acc + item.price, 0)
  const delivery = 0.02*total

  const handleCheckout = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // const response = await fetchHttpClient('/orders', {
      //   method: 'POST',
      // });
      if (true) {
        
      
        toast.success('Compra realizada com sucesso!');
        setTimeout(() => {
          router.push('/');
        }, 2000)
        dispatch(cleanCart())
      } else {
        toast.error('Ops! Algo deu errado, tente novamente.');
      }
    } catch (error) {
      toast.error('Algo inesperado aconteceu');
    }
  };

  return (
    <main className="flex flex-col items-center bg-neutral-50 h-full">
      <Header />

      <div className="flex flex-row justify-center mt-4 p-4 w-full h-full">
        <div className="flex flex-1 flex-col p-4 bg-white rounded-lg">
          <h1 className="text-xl font-semibold">Shopping Cart</h1>
          <div className="my-2 w-full border-b" />
          {items.map((product) => (
            <Product key={product.id} data={product} />
          ))}
        </div>

        <div className="flex flex-col ml-4 p-4 rounded-lg bg-white w-56 h-52">
          <h1 className="text-xl font-semibold">Order Summary</h1>
          <div className="my-2 w-full border-b" />

          <div className="flex flex-row justify-between mt-2">
            <p className="text-xs font-medium text-gray-400">Delivery</p>
            <p className="text-xs font-semibold">{convertCurrencyToLocaleBRL(delivery)}</p>
          </div>

          <div className="flex flex-row justify-between mt-2">
            <p className="text-xs font-medium text-gray-400">Total</p>
            <p className="text-base font-semibold">
              {convertCurrencyToLocaleBRL(total)}
            </p>
          </div>

          <button 
            onClick={handleCheckout}
            className="mt-4 w-full p-2 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 ease-in-out text-xs"
          >
            Checkout
          </button>
        </div>
      </div>
      <ToastContainer autoClose={1600}/>
    </main>
  );
}
