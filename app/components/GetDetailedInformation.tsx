"use client"

import useOffers from "../hook/useOffers"

export default function GetDetailedInformation({ id }: { id: string }) {

  const { getDetailedInformation } = useOffers({});

  return (
    <button onClick={() => getDetailedInformation(id)} className="text-sm">Detalles</button>
  )
}