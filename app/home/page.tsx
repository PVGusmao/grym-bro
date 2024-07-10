'use client'

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="mt-40">
        <h1 className="text-4xl font-bold mb-8">Olá, bem vindo ao Gymbro versão Beta</h1>

        <Button onPress={() => router.push("/home/exercicios")} size="lg" color="primary">
          <p className="text-xl font-bold">Clique aqui</p>
        </Button>
      </div>
    </main>
  )
}