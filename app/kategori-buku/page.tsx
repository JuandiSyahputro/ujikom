import { columnKategoriBuku } from "@/app/kategori-buku/data-column-anggota";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { fetchKategoriBuku } from "@/lib/wrapper-fetch";
import Link from "next/link";
import { notFound } from "next/navigation";
const Anggota = async () => {
  const data = await fetchKategoriBuku();

  if (!data) return notFound();
  const componentLink = () => {
    return (
      <Link href="/kategori-buku/add-new" className="flex items-center px-3">
        <Button variant="default" className="h-8">
          Add New
        </Button>
      </Link>
    );
  };
  return (
    <div className="container mx-auto p-10">
      <h1 className="mb-5 text-3xl font-bold">Kategori Buku Page</h1>
      <DataTable columns={columnKategoriBuku} data={data} elements={componentLink()} title="kategori buku" searchBy="kategori" />
    </div>
  );
};

export default Anggota;
