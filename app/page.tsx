import Image from "next/image";
import TestDB from "@/utils/db"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
         <TestDB />
         "Main"
    </main>
  );
}
