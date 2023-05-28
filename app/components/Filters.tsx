"use client"

import useOffers from "../hook/useOffers";
import type { Facets } from "../services/getOffers";
import Button from "./Button";
import FacetItem from "./FacetItem";

export default function Filters({ facets }: { facets: Facets }) {

  const { listOfFacets, toggleShowFilters, showFilters } = useOffers({ facets })
  return (
    <div className={`fixed md:flex flex-col bg-white z-10 w-full min-w-[220px] row-span-1 rounded-md overflow-auto max-h-screen md:relative md:overflow-hidden top-0 left-0 md:max-h-full transition-all duration-300 md:translate-y-0 ${showFilters ? 'flex translate-y-0' : 'translate-y-full'}`}>
      <div className="p-4 border-b-2 border-b-ij-container-border w-full md:hidden">
        <Button onClick={toggleShowFilters}>Mostrar ofertas</Button>
      </div>
      <div className="grid grid-cols-[1fr] p-4 w-full gap-10">
        {listOfFacets.length > 0 ? listOfFacets.map((facet) => {
          return (
            <FacetItem key={facet.key} facet={facet} />
          )
        }) : <>Filtros no disponibles</>}
      </div>
    </div>
  )
}