import FormAddHome from "@/components/home/form-input-home";
import { fetchDataById } from "@/lib/wrapper-fetch";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
type PageProps = {
  params: {
    id: string;
  };
};
const EditCategoriesPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const data = await fetchDataById(id);

  if (!data) return notFound();

  return (
    <div className="flex w-full justify-between p-10">
      <Link href="/" className="mb-5 mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-black text-3xl font-bold">
        <ChevronLeft className="text-2xl text-white" />
      </Link>
      <FormAddHome type="edit" title="Edit Data" data={data} />
      <p className="hidden opacity-0 lg:block">menuss</p>
    </div>
  );
};

export default EditCategoriesPage;
