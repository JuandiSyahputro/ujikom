import { columnPeminjaman } from "@/app/peminjaman/data-column-peminjaman";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { fetchDetailPeminjaman, fetchPeminjaman } from "@/lib/wrapper-fetch";
import Link from "next/link";
import { notFound } from "next/navigation";

export interface PeminjamanProps {
  id: string;
  tglPinjam: Date;
  lamaPinjaman: string;
  dendaId: string;
  userId: string;
  anggotaId: string;
  bukuId: string;
  nominalDenda: number;
  userName: string;
  anggotaName: string;
  judulBuku: string;
  tglKembali: Date | null;
  detailPeminjamanId: string;
}
const PeminjamanPage = async () => {
  const data = await fetchPeminjaman();
  const dataDetailPinjaman = await fetchDetailPeminjaman();
  if (!data) return notFound();

  const formattedData = data.map((item) => {
    return {
      ...item,
      nominalDenda: item.denda.nominal,
      userName: item.user.namaUser,
      anggotaName: item.anggota.nama,
      judulBuku: item.buku.judul,
      tglKembali: dataDetailPinjaman?.find((data) => data.peminjamanId === item.id)?.tglKembali,
      detailPeminjamanId: dataDetailPinjaman?.find((data) => data.peminjamanId === item.id)?.id,
    };
  });
  // console.log(formattedData);
  const componentLink = () => {
    return (
      <Link href="/peminjaman/add-new" className="flex items-center px-3">
        <Button variant="default" className="h-8">
          Add New
        </Button>
      </Link>
    );
  };
  return (
    <div className="container mx-auto p-10">
      <h1 className="mb-5 text-3xl font-bold">Peminjaman Page</h1>
      <DataTable columns={columnPeminjaman} data={formattedData as PeminjamanProps[]} elements={componentLink()} title="user" searchBy="userName" />
    </div>
  );
};

export default PeminjamanPage;
