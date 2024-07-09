"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center flex-col w-full h-screen bg-slate-900">
      <Button onPress={() => router.push("/login")} color="primary" size="lg" className="w-[300px] h-[60px]">
        <p className="text-3xl font-bold">Logar</p>
      </Button>
    </div>
  );
}
