"use client"

import { HTMLAttributes } from "react"
import { PaginationData } from "../services/getOffers"
import useOffers from "../hook/useOffers"

interface PaginationButtonProps extends HTMLAttributes<HTMLButtonElement> {
  current?: boolean
}

const PaginationButton = (props: PaginationButtonProps) => {

  return (
    <button
      className={`text-sm md:text-base flex flex-row items-center font-semibold gap-2 py-2 px-4 rounded
      ${props.current ? "bg-primary text-white" : "text-primary hover:bg-primary-l4 "}`}
      {...props}>
      {props.children}
    </button>
  )
}

export default function Pagination({ pagination }: { pagination: PaginationData }) {
  const { paginationData, addFilter } = useOffers({ pagination })

  const { currentPage, totalPages } = paginationData

  const paginationButtonsArr = Array.from({ length: totalPages }, (_, i) => i + 1)

  const handleClick = (page: number) => {
    addFilter('page', page.toString(), "radio")
  }

  const limit = Math.ceil(currentPage / 5) * 5

  return (
    <>
      {paginationButtonsArr.length > 1 && (

        <div className="flex flex-row w-full items-center justify-center p-2 gap-1">
          {currentPage >= 2 && (
            <PaginationButton onClick={() => handleClick(currentPage - 1)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={20} height={20} viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M15 6l-6 6l6 6"></path>
              </svg>
              ANTERIOR
            </PaginationButton>
          )}
          {paginationButtonsArr.slice(limit - 5, limit).map((value, index) => (
            <PaginationButton key={index} current={currentPage === (value)} onClick={() => handleClick(value)}>
              {value}
            </PaginationButton>
          ))}

          {currentPage < totalPages && (
            <PaginationButton onClick={() => handleClick(currentPage + 1)}>
              SIGUIENTE
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width={20} height={20} viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 6l6 6l-6 6"></path>
              </svg>
            </PaginationButton>
          )}
        </div>
      )}
    </>
  )
}