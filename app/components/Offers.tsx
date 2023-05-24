"use client"
import useOffers from "../hook/useOffers";
import { ClientJobOffer, MapClientJobOffer } from "../services/getOffers";
import JobCard from "./JobCard";

export default function ListOfOffers({ offers }: { offers: MapClientJobOffer }) {

  const { listOfOffers } = useOffers({ offers });
  return (
    <div className='flex flex-col w-full gap-4 flex-1 max-w-[728px]'>

      {listOfOffers.map(offer => <JobCard key={offer.id} {...offer.data} />)}
    </div>
  )
}