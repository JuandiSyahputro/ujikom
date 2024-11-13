import FormAddPeminjaman from "@/components/peminjaman/form-input-peminjaman";
import { fetchAnggota, fetchBuku, fetchDenda, fetchgetPeminjamanById, fetchUsers } from "@/lib/wrapper-fetch";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export interface PeminjamanById {
  id: string;
  tglPinjam: Date;
  lamaPinjaman: string;
  userId: string;
  anggotaId: string;
  dendaId: string;
  bukuId: string;
  tglKembali: Date;
  detailPinjamanId: string;
}
const EditPeminjamanPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const data = await fetchgetPeminjamanById(id);
  const dataAnggota = await fetchAnggota();
  const dataUsers = await fetchUsers();
  const dataDenda = await fetchDenda();
  const dataBuku = await fetchBuku();
  if (!data) return notFound();

  const formattedDataById = {
    id: data.id,
    tglPinjam: data.tglPinjam,
    lamaPinjaman: data.lamaPinjaman,
    userId: data.userId,
    anggotaId: data.anggotaId,
    dendaId: data.dendaId,
    bukuId: data.bukuId,
    tglKembali: data.DetailPinjam.find((item) => item.peminjamanId === data.id)?.tglKembali,
    detailPinjamanId: data.DetailPinjam.find((item) => item.peminjamanId === data.id)?.id,
  };

  return (
    <div className="flex w-full justify-between p-10">
      <Link href="/peminjaman" className="mb-5 mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-black text-3xl font-bold">
        <ChevronLeft className="text-2xl text-white" />
      </Link>
      <FormAddPeminjaman type="edit" title="Add New" data={formattedDataById as PeminjamanById} anggota={dataAnggota} users={dataUsers} denda={dataDenda} buku={dataBuku} />
      <p className="hidden opacity-0 lg:block">menuss</p>
    </div>
  );
};

export default EditPeminjamanPage;
