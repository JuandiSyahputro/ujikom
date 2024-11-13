import { columnBuku } from "@/app/buku/data-column-buku";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { fetchBuku } from "@/lib/wrapper-fetch";
import Link from "next/link";
import { notFound } from "next/navigation";

export interface BukuProps {
  id: string;
  judul: string;
  pengarang: string;
  penerbit: string;
  tahun: string;
  isbn: string;
  tglInput: Date;
  jmlHalaman: number;
  kategoriId: string;
  kategori: string;
}
const BukuPage = async () => {
  const data = await fetchBuku();

  if (!data) return notFound();
  const formattedBuku = data.map((buku) => {
    return {
      id: buku.id,
      judul: buku.judul,
      pengarang: buku.pengarang,
      penerbit: buku.penerbit,
      tahun: buku.tahun,
      isbn: buku.isbn,
      tglInput: buku.tglInput,
      jmlHalaman: buku.jmlHalaman,
      kategoriId: buku.kategoriId,
      kategori: buku.kategori.kategori,
    };
  });
  const componentLink = () => {
    return (
      <Link href="/buku/add-new" className="flex items-center px-3">
        <Button variant="default" className="h-8">
          Add New
        </Button>
      </Link>
    );
  };
  return (
    <div className="container mx-auto p-10">
      <h1 className="mb-5 text-3xl font-bold">Buku Page</h1>
      <DataTable columns={columnBuku} data={formattedBuku as BukuProps[]} elements={componentLink()} title="judul buku" searchBy="judul" />
    </div>
  );
};

export default BukuPage;
