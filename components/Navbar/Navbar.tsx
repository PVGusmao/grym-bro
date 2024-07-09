'use client'

import React from "react";
import logo from "@/public/logo.png";
import Image from "next/image";
import { useAuthContext } from "@/context/authContext";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const {setIsAuth} = useAuthContext();
  const router = useRouter()

  function logout() {
    localStorage.removeItem('gymbro')
    router.push('/')
  }

  return (
    <nav className="bg-gray-800 h-[100px] flex items-center justify-between px-10">
      <div className="flex-shrink-0">
        <Image
          className=""
          src={logo}
          width={80}
          height={80}
          alt="Workflow"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/home"
                  className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/home/exercicios"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Exercícios
                </Link>
                <Link
                  href="/home/perfil"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Perfil
                </Link>
              </div> 
            </div>
          </div>
        </div>
      </div>
      <Button onPress={logout} size="lg" color="danger">
        Logout
      </Button>
    </nav>
  );
}