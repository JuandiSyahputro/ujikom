import FormAddHome from "@/components/home/form-input-home";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const AddHomePage = () => {
  return (
    <div className="flex w-full justify-between p-10">
      <Link href="/" className="mb-5 mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-black text-3xl font-bold">
        <ChevronLeft className="text-2xl text-white" />
      </Link>
      <FormAddHome type="add" title="Add New" />
      <p className="hidden opacity-0 lg:block">menuss</p>
    </div>
  );
};

export default AddHomePage;
