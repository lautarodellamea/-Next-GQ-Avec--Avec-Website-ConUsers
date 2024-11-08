
import { NewAccountForm } from '@/components';

export default function NewAccountPage() {
  return (
    <main className="flex flex-col  items-center min-h-screen pt-32 sm:pt-52">

      <h1 className={` text-4xl mb-5`}>Ingresar</h1>

      <NewAccountForm />
    </main>
  );
}