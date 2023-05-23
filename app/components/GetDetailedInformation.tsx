"use client"

import getOfferDetailedInformation from "../services/getOfferDetailedInformation"

export default function GetDetailedInformation({ id }: { id: string }) {
  return (
    <button onClick={() => getOfferDetailedInformation(id)} className="text-sm">Detalles</button>
  )
}