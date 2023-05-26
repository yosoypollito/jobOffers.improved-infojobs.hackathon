"use client"
import { HTMLProps } from "react"
import { Facet, FacetValues } from "../services/getOffers"
import useToggle from "../hook/useToggle"
import FacetGroup from "./FacetGroup"
import useOffers from "../hook/useOffers"

const FilterInput = (props: HTMLProps<HTMLInputElement>) => {
  return (
    <label className="flex items-center gap-1 pointer text-sm">
      <input {...props} />
      <span>
        {props.label}
      </span>
    </label>
  )
}

const ListOfFacetValues = ({ values }: { values: FacetValues }) => {

  const { addFilter, removeFilter } = useOffers({});

  return (
    <>
      {values.slice(0, 5).map(({ key: ValuesKey, value, count }) => (
        <FilterInput key={ValuesKey} name={ValuesKey}
          label={`${value} ${count && `(${count})`}`} value={ValuesKey} type="checkbox" />
      ))}
    </>
  )
}

export default function FacetItem({ facet }: { facet: Facet }) {

  const { values, key, name } = facet
  console.log({ facet })

  const { isToggled, toggle } = useToggle()


  return (
    <FacetGroup key={key} title={name}>
      <ListOfFacetValues values={values.slice(0, 4)} />

      {(values.length > 4) && isToggled && (
        <ListOfFacetValues values={values.slice(4)} />
      )}

      {values.length > 4 && (
        <button className="text-primary tracking-[0.0125em]" onClick={toggle}>Mostrar mas</button>
      )}
    </FacetGroup>
  )

}