"use client"
import useOffers from "../hook/useOffers";
import { type ClientJobOffer } from "../services/getOffers";
import JobCard from "./JobCard";
import NoOffersFound from "./NoOffersFound";

export default function ListOfOffers({ offers }: { offers: ClientJobOffer[] }) {

  const { listOfOffers } = useOffers({ offers });
  return (
    <div className='flex flex-col w-full gap-4 flex-1 max-w-[728px]'>
      {listOfOffers.length > 0 ?
        listOfOffers.map(offer => <JobCard key={offer.data.id} {...offer} />)
        : <NoOffersFound />}
    </div>
  )
}