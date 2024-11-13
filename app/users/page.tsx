import { columnUsers } from "@/app/users/data-column-users";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { fetchUsers } from "@/lib/wrapper-fetch";
import Link from "next/link";
import { notFound } from "next/navigation";
const UsersPage = async () => {
  const data = await fetchUsers();

  if (!data) return notFound();
  const componentLink = () => {
    return (
      <Link href="/users/add-new" className="flex items-center px-3">
        <Button variant="default" className="h-8">
          Add New
        </Button>
      </Link>
    );
  };
  return (
    <div className="container mx-auto p-10">
      <h1 className="mb-5 text-3xl font-bold">Users Page</h1>
      <DataTable columns={columnUsers} data={data} elements={componentLink()} title="nama user" searchBy="namaUser" />
    </div>
  );
};

export default UsersPage;
