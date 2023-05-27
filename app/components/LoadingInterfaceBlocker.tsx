"use client"

import useOffers from "../hook/useOffers"

export default function LoadingInterfaceBlocker() {

  const { blockInterface } = useOffers({});

  return (
    <>
      {blockInterface &&
        <div className="fixed top-0 left-0 w-screen h-screen bg-white opacity-75 grid place-items-center">
          <div className="animate-spin w-10 h-10 border-2 border-primary border-t-accent rounded-full"></div>
        </div>}
    </>
  )
}