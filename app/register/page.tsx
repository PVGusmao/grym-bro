'use client';

import api from "@/services/api";
import { maskDate, maskLetters, maskOnlyNumbers } from "@/utils/masks";
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react"

export default function Register() {
  const router = useRouter();

  const [changeForm, setChangeForm] = useState(false)

  const [location, setLocation] = useState({
    address: "",
    state: "",
    city: "",
    neighborhood: "",
    number: "",
    complement: "",
    cep: ""
  })

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    cpf: "",
    birth_date: "",
    email: "",
    password: ""
  })

  function registerUser() {
    if (!userData.first_name || !userData.last_name || !userData.cpf || !userData.birth_date || !userData.email || !userData.password) {
      alert("Preencha todos os campos!")
      return
    }

    if (!changeForm) {
      setChangeForm(true);
    }

    if (!location.cep || !location.address || !location.state || !location.city || !location.neighborhood || !location.number) {
      alert("Preencha todos os campos de endereço!")
      return
    }

    const user = {
      ...userData,
      ...location
    }

    api
      .post("/register", user)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error.response.data)
      })
      .finally(() => {
        setChangeForm(false)
        setUserData({
          first_name: "",
          last_name: "",
          cpf: "",
          birth_date: "",
          email: "",
          password: ""
        })
        setLocation({
          address: "",
          state: "",
          city: "",
          neighborhood: "",
          number: "",
          complement: "",
          cep: ""
        })

        alert("Conta criada com sucesso!")

        router.push("/")
      })
  }

  function getAddressByCep() {
    axios.get(`https://viacep.com.br/ws/${location.cep}/json/`)
      .then((res) => {
        setLocation({
          ...location,
          address: res.data.logradouro,
          state: res.data.uf,
          city: res.data.localidade,
          neighborhood: res.data.bairro
        })
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <section className="shadow_login bg-slate-500 w-[500px] rounded-lg p-[10px]">
        <p className="text-white text-3xl font-bold text-center p-[10px]">Registrar Conta</p>

        {
          !changeForm ? (
            <div className="space-y-4 py-4">
              <Input
                onChange={(e) => setUserData({...userData, first_name: maskLetters(e.target.value)})}
                type="text"
                label="Primeiro Nome"
                color="default"
                value={userData.first_name}
                maxLength={20}
              />

              <Input
                onChange={(e) => setUserData({...userData, last_name: maskLetters(e.target.value)})}
                type="text"
                label="Último Nome"
                color="default"
                value={userData.last_name}
                maxLength={20}
              />

              <Input
                onChange={(e) => setUserData({...userData, cpf: (e.target.value)})}
                type="text"
                label="CPF"
                color="default"
                value={userData.cpf}
                maxLength={20}
              />

              <Input
                onChange={(e) => setUserData({...userData, email: e.target.value})}
                type="email"
                label="Email"
                color="default"
                value={userData.email}
                maxLength={35}
              />
              
              <Input
                onChange={(e) => setUserData({...userData, birth_date: maskDate(e.target.value)})}
                type="text"
                label="Data de Nascimento"
                color="default"
                value={userData.birth_date}
                maxLength={10}
              />

              <Input
                onChange={(e) => setUserData({...userData, password: e.target.value})}
                type="password"
                label="Password"
                color="default"
                value={userData.password}
              />
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <Input
                onChange={(e) => setLocation({...location, cep: maskOnlyNumbers(e.target.value)})}
                type="text"
                onBlur={getAddressByCep}
                label="CEP"
                color="default"
                value={location.cep}
                maxLength={40}
              />

              <Input
                onChange={(e) => setLocation({...location, address: maskLetters(e.target.value)})}
                type="text"
                label="Endereço"
                color="default"
                value={location.address}
                maxLength={40}
              />

              <Input
                onChange={(e) => setLocation({...location, state: maskLetters(e.target.value)})}
                type="text"
                label="Estado"
                color="default"
                value={location.state}
                maxLength={20}
              />

              <Input
                onChange={(e) => setLocation({...location, city: maskLetters(e.target.value)})}
                type="text"
                label="Cidade"
                color="default"
                value={location.city}
                maxLength={40}
              />

              <Input
                onChange={(e) => setLocation({...location, neighborhood: maskLetters(e.target.value)})}
                type="text"
                label="Bairro"
                color="default"
                value={location.neighborhood}
                maxLength={40}
              />
              
              <Input
                onChange={(e) => setLocation({...location, number: maskOnlyNumbers(e.target.value)})}
                type="text"
                label="Número"
                color="default"
                value={location.number}
                maxLength={40}
              />

              <Input  
                onChange={(e) => setLocation({...location, complement: (e.target.value)})}
                type="text"
                label="Complement"
                color="default"
                value={location.complement}
                maxLength={40}
              />
            </div>
          )
        }
        

        <Button
          onPress={registerUser}
          className="w-full my-4 text-white text-lg font-bold"
          color="success"
          size="lg"
        >
          Registrar
        </Button>
      </section>
    </main>
  )
}