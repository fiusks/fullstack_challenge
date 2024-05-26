import { Header, ProductsList, Search } from "@/components";

export default function DashboardScreen() {
  return (
    <main className="flex-1 flex-col items-center justify-between bg-neutral-50 rounded-lg">
      <Header />
      <Search />
      <ProductsList />
    </main>
  );
}
