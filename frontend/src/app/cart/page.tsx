'use client'

import { Header } from "@/components";
import { convertCurrencyToLocaleBRL } from "@/utils";
import { Product } from "./components";
import { useAppSelector } from "@/lib/hooks";
import { selectCartItems } from "@/lib/features/cartSlice";

export default function Cart() {
  const items = useAppSelector(selectCartItems);
  const total = items.reduce((acc, item) => acc + item.price, 0)
  const delivery = 0.02*total

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

          <button className="mt-4 w-full p-2 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 ease-in-out text-xs">
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
}
