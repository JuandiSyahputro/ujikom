import FormAddBuku from "@/components/buku/form-input-buku";
import { fetchKategoriBuku } from "@/lib/wrapper-fetch";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const AddBukuPage = async () => {
  const data = await fetchKategoriBuku();

  if (!data) return notFound();
  return (
    <div className="flex w-full justify-between p-10">
      <Link href="/buku" className="mb-5 mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-black text-3xl font-bold">
        <ChevronLeft className="text-2xl text-white" />
      </Link>
      <FormAddBuku type="add" title="Add New" kategoriBuku={data} />
      <p className="hidden opacity-0 lg:block">menuss</p>
    </div>
  );
};

export default AddBukuPage;
