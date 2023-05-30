"use client"

import useOffers from "../hook/useOffers"
import Button from "./Button"

export default function InfoAndAction() {

  const { toggleShowFilters, paginationData, filters } = useOffers({})
  return (
    <div className="flex flex-row w-full row-span-1 col-span-3 justify-between gap-2 items-center py-2 max-w-[960px]">
      <span>
        {paginationData.totalResults} ofertas {filters["q"] && `de ${filters["q"]}`}
      </span>
      <Button onClick={toggleShowFilters} className="md:hidden">
        Mostrar filtros
      </Button>
    </div>
  )
}