import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {



  const session = await auth();

  if (session?.user.role !== 'admin') {
    redirect('/auth/login') // esto retorna y no ejecuta lo de abajo, a menos que seamos administrador
  }


  return (
    <>
      {children}
    </>
  );
}