import { ChangeEvent, useState } from "react";
import { Input } from "./input";

export default function AddressForm(){
    const [phone, setPhone] = useState("");

    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;
      value = value.replace(/\D/g, "");
      value = value.replace(/^(\d{2})(\d)/g, "($1)$2");
      value = value.replace(/(\d)(\d{4})$/, "$1-$2");
      setPhone(value);
    };
    return(
        <div className="flex flex-col items-center justify-center mt-8 p-6 bg-white rounded-lg">
        <div className="flex flex-col justify-center w-600">
          <h1 className="text-lg font-semibold">Endereço</h1>
          <div className="mt-4 w-full border-b" />
        </div>

        <div>
          <form className="flex flex-col items-center mt-6 w-600">
            <div className="flex justify-between w-full mt-4">
              <div className="flex flex-col w-5/6 mr-2">
                <Input
                  id="rua"
                  label="Rua"
                  labelHtmlFor="rua"
                  placeholder="Rua Porto Seguro"
                  type="text"
                />
              </div>

              <div className="flex flex-col w-1/6 ml-2">
                <Input
                  id="numero"
                  label="Número"
                  labelHtmlFor="numero"
                  placeholder="554"
                  type="text"
                  className="text-center"
                />
              </div>
            </div>

            <div className="flex justify-between w-full mt-4">
              <div className="flex flex-col w-1/2 mr-2">
                <Input
                  id="cidade"
                  label="Cidade"
                  labelHtmlFor="cidade"
                  placeholder="Salvador"
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={14}
                />
              </div>

              <div className="flex flex-col w-1/2 ml-2">
                <Input
                  id="bairro"
                  label="Bairro"
                  labelHtmlFor="bairro"
                  placeholder="Pituba"
                  type="text"
                />
              </div>
            </div>


            <div className="flex justify-between w-full mt-4">
              <div className="flex flex-col w-5/6 mr-2">
                <Input
                  id="complemento"
                  label="Complemento"
                  labelHtmlFor="'complemento"
                  placeholder="Próximo a Rua Chile"
                  type="text"
                />
              </div>

              <div className="flex flex-col w-1/6 ml-2">
                <Input
                  id="uf"
                  label="UF"
                  labelHtmlFor="uf"
                  placeholder="BA"
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
    )
}