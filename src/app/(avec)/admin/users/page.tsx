export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { Pagination, TitleHome } from "@/components";

import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";
import { getPaginatedUsers } from "@/actions/user/get-paginater-users.action";

export default async function UsersPage() {

  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <div className="top-separator">
        <TitleHome title="Mantenimiento de usuarios" />
        <div className="mb-10">
          <UsersTable users={users} />
          <Pagination totalPages={1} />
        </div>
      </div>
    </>
  );
}