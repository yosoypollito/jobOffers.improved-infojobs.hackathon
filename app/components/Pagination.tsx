"use client"

import { HTMLAttributes, HTMLProps } from "react"
import { PaginationData } from "../services/getOffers"
import useOffers from "../hook/useOffers"

const PaginationButton = (props: HTMLAttributes<HTMLButtonElement>) => {

  return (
    <button className="flex flex-row items-center text-primary font-semibold gap-2 py-2 px-4 hover:bg-primary-l4" {...props}>
      {props.children}
    </button>
  )
}

export default function Pagination({ pagination }: { pagination: PaginationData }) {
  const { paginationData } = useOffers({ pagination })

  return (
    <div className="flex flex-row w-full items-center justify-center p-2">
      <PaginationButton>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={20} height={20} viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M15 6l-6 6l6 6"></path>
        </svg>
        ANTERIOR
      </PaginationButton>
      {Array(5).fill(0).map((_, index) => (
        <PaginationButton key={index}>
          {index + 1}
        </PaginationButton>
      ))}

      <PaginationButton>
        SIGUIENTE
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width={20} height={20} viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 6l6 6l-6 6"></path>
        </svg>
      </PaginationButton>
    </div>
  )
}