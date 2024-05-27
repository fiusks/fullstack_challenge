"use client";

import { addToCart } from "@/lib/features/cartSlice";
import { fetchProducts } from "@/lib/features/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Product } from "@/modules/products/domain";
import { convertCurrencyToLocaleBRL } from "@/utils/convertCurrencyToLocaleBRL";
import Image from "next/image";
import { useEffect } from "react";

export function ProductsList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center p-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col items-center justify-center p-2 rounded-md w-48 bg-white border-2 hover:border-blue-500 transition duration-200 ease-in-out"
        >
          <Image
            src={product.image}
            alt="imagem do produto"
            width={100}
            height={100}
            unoptimized
          />
          <div className="flex flex-col size-full justify-center">
            <h3 className="text-sm font-medium mt-4">{product.name}</h3>
            <p className="text-xs">{product.description}</p>
            <p className="text-sm font-semibold mt-2">
              {convertCurrencyToLocaleBRL(product.price)}
            </p>

            <button
              onClick={() => handleAddToCart(product)}
              type="submit"
              className="bg-blue-500 text-white rounded-md p-2 mt-4 hover:bg-blue-600 transition duration-200 ease-in-out text-xs"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
