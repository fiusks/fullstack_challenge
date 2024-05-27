"use client";

import { Header } from "@/components";
import { convertCurrencyToLocaleBRL } from "@/utils";
import { Product } from "./components";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { cleanCart, selectCart } from "@/lib/features/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import { fetchHttpClientWithToken } from "@/modules/common";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  const products = useAppSelector(selectCart);

  const dispatch = useAppDispatch();

  const total = products.reduce((acc, item) => acc + item.price, 0);
  const deliveryTax = 0.02;
  const delivery = deliveryTax * total;

  const handleCheckout = async () => {
    try {
      const items = products.reduce((items, products) => {
        if (items.has(products.id)) {
          items.set(products.id, items.get(products.id)! + 1);
        }

        items.set(products.id, 1);
        return items;
      }, new Map<string, number>());
      await fetchHttpClientWithToken("/orders", {
        method: "POST",
        body: JSON.stringify({
          items: Array.from(items, ([productId, amount]) => ({
            productId,
            amount,
          })),
        }),
      });

      toast.success("Order processed successfully!");
      dispatch(cleanCart());
      router.push("/");
    } catch (error) {
      toast.error(
        (error as any).message ||
          "An error occurred while processing your order"
      );
    }
  };

  return (
    <main className="flex flex-col items-center bg-neutral-50 h-full">
      <Header />

      <div className="flex flex-row justify-center mt-4 p-4 w-full h-full">
        <div className="flex flex-1 flex-col p-4 bg-white rounded-lg">
          <h1 className="text-xl font-semibold">Shopping Cart</h1>
          <div className="my-2 w-full border-b" />
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>

        <div className="flex flex-col ml-4 p-4 rounded-lg bg-white w-56 h-52">
          <h1 className="text-xl font-semibold">Order Summary</h1>
          <div className="my-2 w-full border-b" />

          <div className="flex flex-row justify-between mt-2">
            <p className="text-xs font-medium text-gray-400">Delivery</p>
            <p className="text-xs font-semibold">
              {convertCurrencyToLocaleBRL(delivery)}
            </p>
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
      <ToastContainer autoClose={1600} />
    </main>
  );
}
