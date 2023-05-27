import type { Facets } from "../services/getOffers";
import FacetItem from "./FacetItem";

export default function Filters({ facets }: { facets: Facets }) {
  return (
    <div className="grid grid-cols-[1fr] w-full bg-white p-4 rounded-md min-w-[220px] w-full gap-10">
      {facets.length > 0 ? facets.map((facet) => {
        return (
          <FacetItem key={facet.key} facet={facet} />
        )
      }) : <>Filtros no disponibles</>}
    </div>
  )
}