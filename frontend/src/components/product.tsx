import { DashboardScreenProps } from "@/modules";
import { Product } from "@/modules/products/domain";
import { convertCurrencyToLocaleBRL } from "@/utils/convertCurrencyToLocaleBRL";
import Image from "next/image";

export const data = [
  {
    id: "1a2b3c4d-5e6f-7890-abcd-ef1234567890",
    name: "Sample Product",
    description: "This is a sample product description",
    price: 29.99,
    enabled: true,
    stockQuantity: 100,
    image: "https://example.com/sample-product-image.jpg",
    category: {
      name: "lorem",
      description: "lorem impsum",
      createdAt: "2024-05-25T12:00:00.000Z",
      updatedAt: "2024-05-25T12:30:00.000Z",
      enabled: true,
      id: "abcd1234-5678-90ef-ghij-klmnopqrstuvad"
    },
    createdAt: "2024-05-25T12:00:00.000Z",
    updatedAt: "2024-05-25T12:30:00.000Z"
  },
  {
    id: "1a2b3c4d-5e6f-7890-abcd-ef123456723490",
    name: "Sample Product",
    description: "This is a sample product description",
    price: 29.99,
    enabled: true,
    stockQuantity: 100,
    image: "https://example.com/sample-product-image.jpg",
    category: {
      name: "lorem",
      description: "lorem impsum",
      createdAt: "2024-05-25T12:00:00.000Z",
      updatedAt: "2024-05-25T12:30:00.000Z",
      enabled: true,
      id: "abcd1234-5678-90ef-ghij-klmnopqrstuvad"
    },
    createdAt: "2024-05-25T12:00:00.000Z",
    updatedAt: "2024-05-25T12:30:00.000Z"
  },
  {
    id: "1a2b3c4d-5e6f-7890-abcd-423ef1234567890",
    name: "Sample Product",
    description: "This is a sample product description",
    price: 29.99,
    enabled: true,
    stockQuantity: 100,
    image: "https://example.com/sample-product-image.jpg",
    category: {
      name: "lorem",
      description: "lorem impsum",
      createdAt: "2024-05-25T12:00:00.000Z",
      updatedAt: "2024-05-25T12:30:00.000Z",
      enabled: true,
      id: "abcd1234-5678-90ef-ghij-klmnopqrstuvad"
    },
    createdAt: "2024-05-25T12:00:00.000Z",
    updatedAt: "2024-05-25T12:30:00.000Z"
  },
  {
    id: "1a2b3c4d-5e6f-7890-abcd-ef1254534567892",
    name: "Sample Product",
    description: "This is a sample product description",
    price: 29.99,
    enabled: true,
    stockQuantity: 100,
    image: "https://example.com/sample-product-image.jpg",
    category: {
      name: "lorem",
      description: "lorem impsum",
      createdAt: "2024-05-25T12:00:00.000Z",
      updatedAt: "2024-05-25T12:30:00.000Z",
      enabled: true,
      id: "abcd1234-5678-90ef-ghij-klmnopqrstuvad"
    },
    createdAt: "2024-05-25T12:00:00.000Z",
    updatedAt: "2024-05-25T12:30:00.000Z"
  },
  {
    id: "1a2b3c4d-5e6f-7890-abcd-ef123456783",
    name: "Sample Product",
    description: "This is a sample product description",
    price: 29.99,
    enabled: true,
    stockQuantity: 100,
    image: "https://example.com/sample-product-image.jpg",
    category: {
      name: "lorem",
      description: "lorem impsum",
      createdAt: "2024-05-25T12:00:00.000Z",
      updatedAt: "2024-05-25T12:30:00.000Z",
      enabled: true,
      id: "abcd1234-5678-90ef-ghij-klmnopqrstuvad"
    },
    createdAt: "2024-05-25T12:00:00.000Z",
    updatedAt: "2024-05-25T12:30:00.000Z"
  },
  {
    id: "1a2b3c4d-5e6f-7890-abcd-ef12345678324233",
    name: "Sample Product",
    description: "This is a sample product description",
    price: 29.99,
    enabled: true,
    stockQuantity: 100,
    image: "https://example.com/sample-product-image.jpg",
    category: {
      name: "lorem",
      description: "lorem impsum",
      createdAt: "2024-05-25T12:00:00.000Z",
      updatedAt: "2024-05-25T12:30:00.000Z",
      enabled: true,
      id: "abcd1234-5678-90ef-ghij-klmnopqrstuvad"
    },
    createdAt: "2024-05-25T12:00:00.000Z",
    updatedAt: "2024-05-25T12:30:00.000Z"
  },
  {
    id: "1a2b3c4d-5e6f-7890-abcd-ef12345674234383",
    name: "Sample Product",
    description: "This is a sample product description",
    price: 29.99,
    enabled: true,
    stockQuantity: 100,
    image: "https://example.com/sample-product-image.jpg",
    category: {
      name: "lorem",
      description: "lorem impsum",
      createdAt: "2024-05-25T12:00:00.000Z",
      updatedAt: "2024-05-25T12:30:00.000Z",
      enabled: true,
      id: "abcd1234-5678-90ef-ghij-klmnopqrstuvad"
    },
    createdAt: "2024-05-25T12:00:00.000Z",
    updatedAt: "2024-05-25T12:30:00.000Z"
  },
  {
    id: "1a2b3c4d-5e6f-7890-a123bcd-ef123456783",
    name: "Sample Product",
    description: "This is a sample product description",
    price: 29.99,
    enabled: true,
    stockQuantity: 100,
    image: "https://example.com/sample-product-image.jpg",
    category: {
      name: "lorem",
      description: "lorem impsum",
      createdAt: "2024-05-25T12:00:00.000Z",
      updatedAt: "2024-05-25T12:30:00.000Z",
      enabled: true,
      id: "abcd1234-5678-90ef-ghij-klmnopqrstuvad"
    },
    createdAt: "2024-05-25T12:00:00.000Z",
    updatedAt: "2024-05-25T12:30:00.000Z"
  },
  {
    id: "1a2b3c4d-5e6123f-7890-abcd-ef123456783",
    name: "Sample Product",
    description: "This is a sample product description",
    price: 29.99,
    enabled: true,
    stockQuantity: 100,
    image: "https://example.com/sample-product-image.jpg",
    category: {
      name: "lorem",
      description: "lorem impsum",
      createdAt: "2024-05-25T12:00:00.000Z",
      updatedAt: "2024-05-25T12:30:00.000Z",
      enabled: true,
      id: "abcd1234-5678-90ef-ghij-klmnopqrstuvad"
    },
    createdAt: "2024-05-25T12:00:00.000Z",
    updatedAt: "2024-05-25T12:30:00.000Z"
  },
  {
    id: "1a2b3c4d-5e6123f-7890-abcd-ef123456783",
    name: "Sample Product",
    description: "This is a sample product description",
    price: 29.99,
    enabled: true,
    stockQuantity: 100,
    image: "https://example.com/sample-product-image.jpg",
    category: {
      name: "lorem",
      description: "lorem impsum",
      createdAt: "2024-05-25T12:00:00.000Z",
      updatedAt: "2024-05-25T12:30:00.000Z",
      enabled: true,
      id: "abcd1234-5678-90ef-ghij-klmnopqrstuvad"
    },
    createdAt: "2024-05-25T12:00:00.000Z",
    updatedAt: "2024-05-25T12:30:00.000Z"
  }
];

export function ProductsList() {
  const products = data;

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
