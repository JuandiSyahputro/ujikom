import FormAddPeminjaman from "@/components/peminjaman/form-input-peminjaman";
import { fetchAnggota, fetchBuku, fetchDenda, fetchUsers } from "@/lib/wrapper-fetch";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const AddPeminjamanPage = async () => {
  const dataAnggota = await fetchAnggota();
  const dataUsers = await fetchUsers();
  const dataDenda = await fetchDenda();
  const dataBuku = await fetchBuku();
  return (
    <div className="flex w-full justify-between p-10">
      <Link href="/peminjaman" className="mb-5 mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-black text-3xl font-bold">
        <ChevronLeft className="text-2xl text-white" />
      </Link>
      <FormAddPeminjaman type="add" title="Add New" anggota={dataAnggota} users={dataUsers} denda={dataDenda} buku={dataBuku} />
      <p className="hidden opacity-0 lg:block">menuss</p>
    </div>
  );
};

export default AddPeminjamanPage;
