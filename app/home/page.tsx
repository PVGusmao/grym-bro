'use client'

import { useAuthContext } from "@/context/authContext";
import React from "react";

export default function Home() {
  const {saveUser} = useAuthContext();

  console.log(saveUser)
  
  return (
    <p>Home</p>
  )
}