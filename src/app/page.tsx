import Rhf from '@/components/Rhf';
import SimpleForm from '@/components/SimpleForm';
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className='text-center text-2xl font-bold my-2'>Zod CRUD Demo</h1>
      {/* <SimpleForm /> */}
      <Rhf />
    </main>
  );
}
