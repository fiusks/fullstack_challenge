"use client";
import { removeFromCart } from "@/lib/features/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Product as ProducModel } from "@/modules/products/domain";
import { convertCurrencyToLocaleBRL } from "@/utils";
import Image from "next/image";
import { FaRegTrashCan } from "react-icons/fa6";

interface ProductComponentProps {
  product: ProducModel;
}

export function Product({ product }: ProductComponentProps) {
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <div className="flex flex-row justify-between items-center mt-4 p-2 bg-white rounded-md border">
      <div className="flex flex-1">
        <Image
          src={product.image}
          alt="imagem do produto"
          width={30}
          height={30}
          unoptimized
        />
        <p className="text-sm font-medium ml-4">{product.name}</p>
      </div>
      <p className="mx-24 text-xs font-medium">1</p>
      <p className="text-xs font-semibold">
        {convertCurrencyToLocaleBRL(product.price)}
      </p>

      <button
        onClick={handleRemoveFromCart}
        className="ml-4 text-gray-400 hover:text-red-500 duration-100"
      >
        <FaRegTrashCan size={12} />
      </button>
    </div>
  );
}
