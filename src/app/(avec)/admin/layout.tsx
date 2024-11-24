import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Si el usuario está baneado, redirigir a banned page
  if (session?.user.role === 'banned') {
    redirect('/banned');
  }

  // Si no es administrador, redirigir al login
  if (session?.user.role !== 'admin') {
    redirect('/auth/login');
  }

  // Si es administrador, renderizar los hijos
  return (
    <>
      {children}
    </>
  );
}