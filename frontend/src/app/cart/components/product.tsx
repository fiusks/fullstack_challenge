'use client'
import { removeFromCart } from "@/lib/features/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Product as ProducModel } from "@/modules/products/domain";
import { convertCurrencyToLocaleBRL } from "@/utils";
import Image from "next/image";
import { FaRegTrashCan } from "react-icons/fa6";

interface ProductComponentProps {
  data: ProducModel;
}

export function Product({ data }: ProductComponentProps) {

  const dispatch = useAppDispatch();
  

  const handleRemoveFromCart = (product: ProducModel) => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <div className="flex flex-row justify-between items-center mt-4 p-2 bg-white rounded-md border">
      <div className="flex flex-1">
        <Image
          src="https://static.printler.com/cache/1/d/1/6/3/2/1d16328afbff8b7fb8d52d5bfb84d9540cd24204.jpg"
          alt="imagem do produto"
          width={30}
          height={30}
          unoptimized
        />
        <p className="text-sm font-medium ml-4">{data.name}</p>
      </div>
      <p className="mx-24 text-xs font-medium">1</p>
      <p className="text-xs font-semibold">{convertCurrencyToLocaleBRL(data.price)}</p>

      <button 
        onClick={()=>handleRemoveFromCart(data)}
        className="ml-4 text-gray-400 hover:text-red-500 duration-100">
        <FaRegTrashCan size={12} />
      </button>
    </div>
  );
}
