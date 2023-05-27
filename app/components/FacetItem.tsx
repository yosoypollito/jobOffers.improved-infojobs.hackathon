"use client"
import { HTMLProps } from "react"
import { Facet, FacetInputType, FacetKey, FacetValues } from "../services/getOffers"
import useToggle from "../hook/useToggle"
import FacetGroup from "./FacetGroup"
import useOffers from "../hook/useOffers"
import CheckBox from "./CheckBox"
import Radio from "./Radio"
import TextField from "./TextField"

import debounce from "just-debounce-it"

const FilterInput = (props: HTMLProps<HTMLInputElement>) => {
  return (
    <>
      {props.type === "checkbox" && <CheckBox {...props} />}
      {props.type === "radio" && <Radio {...props} />}
      {props.type === "text" && <TextField {...props} />}
    </>
  )
}

export const ListOfFacetValues = ({ values, facetKey, inputType }: { values: FacetValues, facetKey: FacetKey; inputType?: FacetInputType }) => {

  const { addFilter, removeFilter, filters } = useOffers({});

  const addFilterDebounced = debounce(addFilter, 500)

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'text') {
      addFilterDebounced(facetKey, e.target.value, inputType)
      return;
    }

    if (e.target.checked) {
      addFilter(facetKey, e.target.value, inputType)
    } else {
      removeFilter(facetKey, e.target.value, inputType)
    }
  }

  return (
    <>
      {values.map(({ key: ValuesKey, value, count }) => (
        <FilterInput key={ValuesKey} name={ValuesKey}
          label={`${value} ${(count > 0) ? `(${count})` : ""}`}
          defaultValue={inputType === "text" ? filters[facetKey] : ValuesKey}
          type={inputType || "checkbox"}
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
    <>
      {values.length > 0 && (

        <FacetGroup key={key} title={name} id={key + "_filter"}>
          <ListOfFacetValues values={values.slice(0, 4)} facetKey={key} inputType={facet.inputType} />

          {(values.length > 4) && isToggled && (
            <ListOfFacetValues values={values.slice(4)} facetKey={key} inputType={facet.inputType} />
          )}

          {values.length > 4 && (
            <button className="text-primary tracking-[0.0125em]" onClick={toggle}>Mostrar mas</button>
          )}
        </FacetGroup>
      )}
    </>
  )

}