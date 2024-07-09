'use client'

import React, { useEffect } from "react";

import { Button } from "@nextui-org/button";
import api from "@/services/api";
import { CircularProgress, Input, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

export default function exercicios() {
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState([] as any)
  const [addExercise, setAddExercise] = React.useState(false)

  const [update, setUpdate] = React.useState(false)

  const [identifyer, setIdentifyer] = React.useState('1')

  const [newExercise, setNewExercise] = React.useState({
    day_serie: "A",
    identify: 0,
    muscle_group: "",
    name: "",
    series: "",
    series_repeats: ''
  })
  
  function getExercises() {
    api.get('/exercise')
    .then((response) => {
      setData(response.data.data)
      console.log(response.data.data)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  function saveExercise() {
    if (!newExercise.name || !newExercise.day_serie || !newExercise.identify || !newExercise.muscle_group || !newExercise.series || !newExercise.series_repeats) {
      alert('Preencha todos os campos')
      return
    }

    const exercise = {
      day_serie: newExercise.day_serie,
      identify: +newExercise.identify,
      exercise: [{
        muscle_group: newExercise.muscle_group,
        name: newExercise.name,
        series: newExercise.series,
        series_repeats: newExercise.series_repeats
      }]
    }

    api
      .post('/exercise', exercise)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
        setUpdate(!update)
      })
  }

  function deleteExercise(id: number) {
    setLoading(true)
    api
      .delete(`/exercise/remove/${id}`)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
        setUpdate(!update)
      })
  }

  useEffect(() => {
    getExercises()
  }, [update])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="success" size="lg" />
      </div>
    )
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-[950px] min-w-[650px] justify-between mb-10">
        <Select
          items={[{identify: 1}, {identify: 2}, {identify: 3}]}
          label="Selecione o treino"
          size="lg"
          placeholder="Selecione o identificador do treino"
          className="max-w-xs"
          onChange={(e) => setIdentifyer(e.target.value)}
        >
          {(number) => <SelectItem key={number.identify}>{number.identify}</SelectItem>}
        </Select>
        
        <div>
          <Button className={`${addExercise? '' : ''}`} onClick={() => {
            if (addExercise) {
              saveExercise()
              return
            };

            setAddExercise(!addExercise)
          }} size="lg" color="primary">
            {
              loading ? <CircularProgress color="success" size="sm" /> :
              <p className="text-white font-bold text-xl">Adicionar Exercício</p>
            }
          </Button>

          {
            addExercise &&
            <button onClick={() => setAddExercise(!addExercise)} className="w-[50px] h-[50px] bg-red-500 rounded-[100%] ml-[10px]">
              <p>X</p>
            </button>
          }
        </div>
      </div>

      {
        addExercise &&
        <div className="w-full max-w-[950px] min-w-[650px]">
          <Input onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })} className="mb-4" size="lg" type="text" placeholder="Nome" />
          <Input onChange={(e) => setNewExercise({ ...newExercise, day_serie: e.target.value })} className="mb-4" size="lg" type="text" placeholder="Dia da série: A, B, C ..." />
          <Input onChange={(e) => setNewExercise({ ...newExercise, identify: e.target.value })} className="mb-4" size="lg" type="number" placeholder="Identificação: Um número para a identificação do treino, todas as séries desse treino tem q ter o mesmo número" />
          <Input onChange={(e) => setNewExercise({ ...newExercise, muscle_group: e.target.value })} className="mb-4" size="lg" type="text" placeholder="Grupo Muscular" />
          <Input onChange={(e) => setNewExercise({ ...newExercise, series: e.target.value })} className="mb-4" size="lg" type="number" placeholder="Quantas Séries" />
          <Input onChange={(e) => setNewExercise({ ...newExercise, series_repeats: e.target.value })} className="mb-4" size="lg" type="number" placeholder="Quantas repetições por série?" />
        </div>
      }

      {
        data.filter((item: any) => item.identify === +identifyer).length !== 0 &&
        <section className="mt-10">
          <Table className="w-full" aria-label="Example static collection table">
            <TableHeader>
              <TableColumn className="text-[20px] font-bold">Nome</TableColumn>
              <TableColumn className="text-[20px] font-bold">Dia da Série</TableColumn>
              <TableColumn className="text-[20px] font-bold">identificador</TableColumn>
              <TableColumn className="text-[20px] font-bold">Grupo Muscular</TableColumn>
              <TableColumn className="text-[20px] font-bold">Número de Séries</TableColumn>
              <TableColumn className="text-[20px] font-bold">Número de Repetições</TableColumn>
              <TableColumn className="text-[20px] font-bold">Delete Exercise</TableColumn>
            </TableHeader>
            <TableBody>
              {
                data.filter((item: any) => item.identify === +identifyer).map((exercise: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="text-[16px] font-bold">{exercise.name}</TableCell>
                    <TableCell className="text-[16px] font-bold">{exercise.day_serie}</TableCell>
                    <TableCell className="text-[16px] font-bold">{exercise.identify}</TableCell>
                    <TableCell className="text-[16px] font-bold">{exercise.muscle_group}</TableCell>
                    <TableCell className="text-[16px] font-bold">{exercise.series}</TableCell>
                    <TableCell className="text-[16px] font-bold">{exercise.series_repeats}</TableCell>
                    <TableCell className="text-[16px] font-bold"><button onClick={() => deleteExercise(exercise.id)} className="flex items-center justify-center w-[50px] h-[50px] bg-red-500 rounded-[100%]">X</button></TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </section>
      }
    </main>
  )
}