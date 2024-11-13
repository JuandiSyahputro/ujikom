import { columnHome } from "@/app/data-column-home";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/bungkus-fetch";
import Link from "next/link";
import { notFound } from "next/navigation";
const Home = async () => {
  const data = await fetchData();

  if (!data) return notFound();
  const componentLink = () => {
    return (
      <Link href="/add-new" className="flex items-center px-3">
        <Button variant="default" className="h-8">
          Add New
        </Button>
      </Link>
    );
  };
  return (
    <div className="container mx-auto p-10">
      <h1 className="mb-5 text-3xl font-bold">Home Page</h1>
      <DataTable columns={columnHome} data={data} elements={componentLink()} title="nama user" />
    </div>
  );
};

export default Home;
