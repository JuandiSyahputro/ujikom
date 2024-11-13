import { columnAnggota } from "@/app/anggota/data-column-anggota";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { fetchAnggota } from "@/lib/wrapper-fetch";
import Link from "next/link";
import { notFound } from "next/navigation";
const AnggotaPage = async () => {
  const data = await fetchAnggota();

  if (!data) return notFound();
  const componentLink = () => {
    return (
      <Link href="/anggota/add-new" className="flex items-center px-3">
        <Button variant="default" className="h-8">
          Add New
        </Button>
      </Link>
    );
  };
  return (
    <div className="container mx-auto p-10">
      <h1 className="mb-5 text-3xl font-bold">Anggota Page</h1>
      <DataTable columns={columnAnggota} data={data} elements={componentLink()} title="nama" searchBy="nama" />
    </div>
  );
};

export default AnggotaPage;
