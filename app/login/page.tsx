'use client';

import { useAuthContext } from "@/context/authContext";
import api from "@/services/api";
import { setToken } from "@/services/auth";
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import Image from "next/image";
import Link from "next/link"
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react"

export default function Login() {
  const router = useRouter();
  const {setSavedUser} = useAuthContext();

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    api.post('/login', user)
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user))
        setSavedUser(res.data.user)
        router.push('/home')
      })
      .catch((err) => {
        console.log(err)
      })

  }
 

  return (
    <main className="flex w-full h-screen items-center justify-center bg-slate-900">
      <section className="shadow_login bg-slate-500 w-[500px] rounded-lg p-[10px]">
        <div className="flex justify-center items-center">
          <Image src="/logo.png" alt="logo" width={200} height={200} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <Input
              onChange={(e) => setUser({...user, email: e.target.value})}
              type="email"
              name="email"
              size="lg"
              label="Email"
              color="default"
              required
            />
            
            <Input
              onChange={(e) => setUser({...user, password: e.target.value})}
              type="password"
              size="lg"
              name="password"
              label="Password"
              color="default"
              required
            />
          </div>

          <Link href="/register">
            <p className="text-end pb-4">Don't have an account?</p>
          </Link>

          <Button
            // onPress={login}
            type="submit"
            className="w-full my-4 text-white text-lg font-bold"
            color="success"
            size="lg"
          >
            Login
          </Button>
        </form>
      </section>
    </main>
  )
}