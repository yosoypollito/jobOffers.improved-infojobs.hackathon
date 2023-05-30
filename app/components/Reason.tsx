"use client"
import { useEffect } from "react";
import Button from "./Button";
import { useReasonModal } from "../store";

export default function Reason() {

  const { open, toggle } = useReasonModal();

  const handleClick = (e: any) => {
    e.preventDefault();
    toggle();
  }

  return (
    <div className={`z-20 flex justify-center items-center fixed h-screen w-full top-0 left-0 lg:relative lg:justify-start lg:items-start lg:h-auto
     ${open ? "flex p-4 lg:p-0" : "hidden lg:flex"}`}>
      <div className="absolute h-screen w-screen z-10 bg-black bg-opacity-60 top-0 left-0
      lg:hidden md:w-full" onClick={toggle}>

      </div>
      <div className="z-20 flex flex-col bg-white p-4 lg:w-[220px] text-sm gap-4 rounded">
        <div className="flex justify-between flex-1 w-full">
          <h2 className="text-primary text-base self-center font-semibold">Explicación 🤓☝️</h2>
          <Button onClick={handleClick} className="lg:hidden">
            Cerrar
          </Button>
        </div>
        <h4 className="text-primary font-semibold">Razón</h4>
        <p>Como estoy en búsqueda laboral activa, estoy cansado de leer distintas descripciones enormes sobre ofertas laborales, a veces con falta de información o difíciles de entender.</p>
        <h4 className="text-primary font-semibold">Objetivo</h4>
        <p>Hacer que el usuario obtenga la mayor cantidad de información sobre cada oferta que le interesa.</p>
        <h4 className="text-primary font-semibold">Apariencia</h4>
        <p>Recreación de interfaz añadiendo más información y funcionalidad, Basándome en el Figma (Gracias por el Figma).</p>
        <h4 className="text-primary font-semibold">Funcionalidad añadida, Solución a problema</h4>
        <p>Utilizando IA se extrae más información sobre la oferta utilizando la descripción y requisitos mínimos. Esta información es tratada y cacheada utilizando upstash (redis) para mejorar las futuras respuestas en un +94% y optimizar el uso de tokens </p>
      </div>
    </div>
  )
}