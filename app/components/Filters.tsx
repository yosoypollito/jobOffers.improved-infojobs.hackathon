"use client"

import useOffers from "../hook/useOffers";
import type { Facets } from "../services/getOffers";
import FacetItem from "./FacetItem";

export default function Filters({ facets }: { facets: Facets }) {

  const { listOfFacets } = useOffers({ facets })
  return (
    <div className="grid grid-cols-[1fr] bg-white p-4 rounded-md min-w-[220px] w-full gap-10">
      {listOfFacets.length > 0 ? listOfFacets.map((facet) => {
        return (
          <FacetItem key={facet.key} facet={facet} />
        )
      }) : <>Filtros no disponibles</>}
    </div>
  )
}