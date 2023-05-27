"use client"
import { HTMLProps } from "react"
import { Facet, FacetKey, FacetValues } from "../services/getOffers"
import useToggle from "../hook/useToggle"
import FacetGroup from "./FacetGroup"
import useOffers from "../hook/useOffers"

const FilterInput = (props: HTMLProps<HTMLInputElement>) => {
  return (
    <label className="flex items-center gap-1 pointer text-sm">
      {['checkbox', 'radios'].includes(props.type || "") &&
        <div className="min-w-3 w-3 h-3 bg-lime-600 rounded-sm flex">

        </div>}
      <input className="hidden" {...props} />
      <span>
        {props.label}
      </span>
    </label>
  )
}

const ListOfFacetValues = ({ values, facetKey }: { values: FacetValues, facetKey: FacetKey }) => {
  console.log(values[0])

  const { addFilter, removeFilter, filters } = useOffers({});

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      addFilter(facetKey, e.target.value)
    } else {
      removeFilter(facetKey, e.target.value)
    }
  }

  return (
    <>
      {values.map(({ key: ValuesKey, value, count }) => (
        <FilterInput key={ValuesKey} name={ValuesKey}
          label={`${value} ${count && `(${count})`}`}
          value={ValuesKey}
          type="checkbox"
          onChange={handleFilterChange} checked={filters[facetKey] && filters[facetKey].includes(ValuesKey)} />
      ))}
    </>
  )
}

export default function FacetItem({ facet }: { facet: Facet }) {

  const { values, key, name } = facet
  console.log({ key })

  const { isToggled, toggle } = useToggle()


  return (
    <FacetGroup key={key} title={name} id={key + "_filter"}>
      <ListOfFacetValues values={values.slice(0, 4)} facetKey={key} />

      {(values.length > 4) && isToggled && (
        <ListOfFacetValues values={values.slice(4)} facetKey={key} />
      )}

      {values.length > 4 && (
        <button className="text-primary tracking-[0.0125em]" onClick={toggle}>Mostrar mas</button>
      )}
    </FacetGroup>
  )

}