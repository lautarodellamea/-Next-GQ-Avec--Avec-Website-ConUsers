import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function ProfilePage() {


  const session = await auth();
  if (!session?.user) {
    // redirect('/auth/login?returnTo=/profile')
    redirect('/auth/login')
  }

  return (
    <div className="top-separator">
      <h1>Profile Page</h1>
      <pre>
        {
          JSON.stringify(session.user, null, 2)
        }
      </pre>

      {/* para que ts me reconozca la extension de mi usuario que hice en los callbacks en el auth.config.ts y pueda ver el rol, debi crear el archivo nextauth.d.ts en el root de la app  */}
      <h3>{session.user.role}</h3>

      <a href="/admin/cars">Lista de Autos</a>
    </div>
  );
}