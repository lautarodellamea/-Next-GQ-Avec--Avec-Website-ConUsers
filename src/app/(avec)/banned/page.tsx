import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function BannedPage() {

  const session = await auth();

  // Si el usuario está baneado, redirigir a banned page
  if (session?.user.role !== 'banned') {
    redirect('/');
  }

  return (
    <div className='top-separator'>
      <p>Estas Baneado contactate con soporte</p>
    </div>
  );
}