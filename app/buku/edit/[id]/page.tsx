import FormAddBuku from "@/components/buku/form-input-buku";
import { fetchgetBukuById, fetchKategoriBuku } from "@/lib/wrapper-fetch";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
type PageProps = {
  params: {
    id: string;
  };
};
const EditAnggotaPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const data = await fetchgetBukuById(id);
  const dataKategori = await fetchKategoriBuku();

  if (!data) return notFound();

  return (
    <div className="flex w-full justify-between p-10">
      <Link href="/anggota" className="mb-5 mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-black text-3xl font-bold">
        <ChevronLeft className="text-2xl text-white" />
      </Link>
      <FormAddBuku type="edit" title="Edit Data" data={data} kategoriBuku={dataKategori} />
      <p className="hidden opacity-0 lg:block">menuss</p>
    </div>
  );
};

export default EditAnggotaPage;
