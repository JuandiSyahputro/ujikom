import { columnDenda } from "@/app/denda/data-column-denda";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { fetchDenda } from "@/lib/wrapper-fetch";
import Link from "next/link";
import { notFound } from "next/navigation";
const DendaPage = async () => {
  const data = await fetchDenda();

  if (!data) return notFound();
  const componentLink = () => {
    return (
      <Link href="/denda/add-new" className="flex items-center px-3">
        <Button variant="default" className="h-8">
          Add New
        </Button>
      </Link>
    );
  };
  return (
    <div className="container mx-auto p-10">
      <h1 className="mb-5 text-3xl font-bold">Denda Page</h1>
      <DataTable columns={columnDenda} data={data} elements={componentLink()} title="nominal" searchBy="nominal" />
    </div>
  );
};

export default DendaPage;
