'use client'

import React from "react";

export default function Perfil() {
  const [selected, setSelected] = React.useState(0);
  const [saveUser, setUser] = React.useState(JSON.parse(localStorage.getItem('user') as string));

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <section className="w-full bg-slate-900 max-w-2xl p-10 rounded-2xl">
        <section className="w-full flex justify-center mb-10">
          <button onClick={() => setSelected(0)} className={`${selected === 0 ? 'flex items-center justify-center border-1 border-white w-full max-w-[43%] h-[60px] bg-slate-600 rounded-l-2xl' :'flex items-center justify-center w-full max-w-[43%] h-[60px] bg-slate-800 rounded-l-2xl'}`}>
            <p className="text-[20px] font-bold">Dados Pessoais</p>
          </button>

          <button onClick={() => setSelected(1)} className={`${selected === 1 ? 'flex items-center justify-center border-1 border-white w-full max-w-[43%] h-[60px] bg-slate-600 rounded-r-2xl' :'flex items-center justify-center w-full max-w-[43%] h-[60px] bg-slate-800 rounded-r-2xl'}`}>
            <p className="text-[20px] font-bold">Dados Residenciais</p>
          </button>
        </section>

        <section className="flex flex-col gap-4 justify-center items-center">
          {
            selected === 0 ?
              <>
                <p className="text-[32px] font-bold mb-4">Dados Pessoais</p>
                <input
                  className="w-full max-w-[500px] p-4 text-xl rounded-2xl"
                  disabled
                  placeholder="Nome"
                  value={saveUser?.first_name}
                />
                <input
                  className="w-full max-w-[500px] p-4 text-xl rounded-2xl"
                  disabled
                  placeholder="Sobrenome"
                  value={saveUser?.last_name}
                />
                <input
                  className="w-full max-w-[500px] p-4 text-xl rounded-2xl"
                  disabled
                  placeholder="Data de Nascimento"
                  value={saveUser?.birth_date}
                />
                <input
                  className="w-full max-w-[500px] p-4 text-xl rounded-2xl"
                  disabled
                  placeholder="CPF"
                  value={saveUser?.cpf}
                />
                <input
                  className="w-full max-w-[500px] p-4 text-xl rounded-2xl"
                  disabled
                  placeholder="Email"
                  value={saveUser?.email}
                />
              </> :
              <>
                <p className="text-[32px] font-bold mb-4">Dados Residenciais</p>
                <input
                  className="w-full max-w-[500px] p-4 text-xl rounded-2xl"
                  disabled
                  placeholder="CEP"
                  value={saveUser?.cep}
                />
                <input
                  className="w-full max-w-[500px] p-4 text-xl rounded-2xl"
                  disabled
                  placeholder="Endereço"
                  value={saveUser?.address}
                />
                <input
                  className="w-full max-w-[500px] p-4 text-xl rounded-2xl"
                  disabled
                  placeholder="Estado"
                  value={saveUser?.state}
                />
                <input
                  className="w-full max-w-[500px] p-4 text-xl rounded-2xl"
                  disabled
                  placeholder="Cidade"
                  value={saveUser?.city}
                />
                <input
                  className="w-full max-w-[500px] p-4 text-xl rounded-2xl"
                  disabled
                  placeholder="Bairro"
                  value={saveUser?.neighborhood}
                />
                <input
                  className="w-full max-w-[500px] p-4 text-xl rounded-2xl"
                  disabled
                  placeholder="Número"
                  value={saveUser?.number}
                />
                <input
                  className="w-full max-w-[500px] p-4 text-xl rounded-2xl"
                  disabled
                  placeholder="Complemento"
                  value={saveUser?.complement}
                />
              </>
              }
        </section>
      </section>
    </main>
  )
}