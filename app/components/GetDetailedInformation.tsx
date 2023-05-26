"use client"

import useOffers from "../hook/useOffers"
import getOfferDetailedInformation from "../services/getOfferDetailedInformation"

export default function GetDetailedInformation({ id }: { id: string }) {

  const { setDetailedInformation } = useOffers({});

  const getDetailedInformation = async () => {
    const detailedInformation = await getOfferDetailedInformation(id)
    console.log({ detailed: detailedInformation })

    if (!detailedInformation) return console.log({ message: "No se encontró la información" })

    setDetailedInformation(id, detailedInformation)
  }

  return (
    <button onClick={getDetailedInformation} className="text-sm">Detalles</button>
  )
}