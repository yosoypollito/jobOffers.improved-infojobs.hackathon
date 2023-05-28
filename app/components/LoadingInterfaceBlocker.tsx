"use client"

import useOffers from "../hook/useOffers"
import LoadingSpin from "./LoadingSpin";

export default function LoadingInterfaceBlocker() {

  const { blockInterface } = useOffers({});

  return (
    <>
      {blockInterface &&
        <div className="fixed top-0 left-0 w-screen h-screen bg-white opacity-75 grid place-items-center">
          <LoadingSpin />
        </div>}
    </>
  )
}