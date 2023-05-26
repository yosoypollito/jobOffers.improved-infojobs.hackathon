import { HTMLAttributes, HTMLProps } from "react";
import FiltersGroup from "./FiltersGroup";

const FilterInput = (props: HTMLProps<HTMLInputElement>) => {
  return (
    <label className="flex items-center gap-1 pointer">
      <input {...props} />
      {props.value}
    </label>
  )
}

export default function Filters() {

  return (
    <div className="grid grid-cols-[1fr] w-full h-screen bg-white p-4 rounded-md min-w-[220px]">
      <FiltersGroup title="Ordenar ofertas">
        <FilterInput name="" value="Fecha de publicacion" type="radio" />

      </FiltersGroup>
    </div>
  )
}