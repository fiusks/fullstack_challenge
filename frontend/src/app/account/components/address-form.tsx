"use client";

import { fetchHttpClientWithToken } from "@/modules/common";
import { Input } from "./input";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

export interface Address {
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

interface AddressFormProps {
  address: Address | null;
}

export default function AddressForm({ address }: AddressFormProps) {
  const { register, handleSubmit } = useForm<Address>({
    defaultValues: address || undefined,
  });

  const saveAddress: SubmitHandler<Address> = async (form) => {
    try {
      await fetchHttpClientWithToken("customer-address", {
        method: address ? "PUT" : "POST",
        body: JSON.stringify(form),
      });
    } catch (error) {
      toast.error("Error saving address");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 p-6 bg-white rounded-lg">
      <div className="flex flex-col justify-center w-600">
        <h1 className="text-lg font-semibold">Endereço</h1>
        <div className="mt-4 w-full border-b" />
      </div>

      <div>
        <form
          className="flex flex-col items-center mt-6 w-600"
          onSubmit={handleSubmit(saveAddress)}
        >
          <div className="flex justify-between w-full mt-4">
            <div className="flex flex-col w-5/6 mr-2">
              <Input
                id="street"
                name="street"
                label="Rua"
                labelHtmlFor="street"
                placeholder="Rua Porto Seguro"
                type="text"
                register={register}
              />
            </div>

            <div className="flex flex-col w-1/6 ml-2">
              <Input
                id="number"
                name="number"
                label="Número"
                labelHtmlFor="numero"
                placeholder="554"
                type="text"
                className="text-center"
                register={register}
              />
            </div>
          </div>

          <div className="flex justify-between w-full mt-4">
            <div className="flex flex-col w-1/2 mr-2">
              <Input
                id="city"
                name="city"
                label="Cidade"
                labelHtmlFor="cidade"
                placeholder="Salvador"
                type="text"
                maxLength={14}
                register={register}
              />
            </div>

            <div className="flex flex-col w-1/2 ml-2">
              <Input
                id="neighborhood"
                name="neighborhood"
                label="Bairro"
                labelHtmlFor="bairro"
                placeholder="Pituba"
                type="text"
                register={register}
              />
            </div>
          </div>

          <div className="flex justify-between w-full mt-4">
            <div className="flex flex-col w-5/6 mr-2">
              <Input
                id="complement"
                name="complement"
                label="Complemento"
                labelHtmlFor="complement"
                placeholder="Próximo a Rua Chile"
                type="text"
                register={register}
              />
            </div>

            <div className="flex flex-col w-1/6 ml-2">
              <Input
                id="state"
                name="state"
                label="UF"
                labelHtmlFor="uf"
                placeholder="BA"
                type="text"
                register={register}
              />
            </div>
          </div>

          <div className="flex justify-between w-full mt-4">
            <div className="flex flex-col w-1/2 mr-2">
              <Input
                id="zipCode"
                label="CEP"
                labelHtmlFor="zipCode"
                placeholder="40.000-000"
                type="text"
                maxLength={10}
                register={register}
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
  );
}
