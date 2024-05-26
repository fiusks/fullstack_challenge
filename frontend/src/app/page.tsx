import { Header, ProductsList, Search } from "@/components";
// import { Product } from "../domain";

export interface DashboardScreenProps {
  // products: Product[];
}

export default function Home({}: DashboardScreenProps) {
  return (
    <main className="flex-1 flex-col items-center justify-between bg-neutral-50 rounded-lg">
      <Header />
      <Search />
      <ProductsList />
    </main>
  );
}
