"use client"
import { ClientJobOffer, DetailedInformation, Facets } from "../services/getOffers";
import { useEffect } from "react";

import { useOffersStore } from "../store";

export default function useOffers({ offers, facets }: { offers?: ClientJobOffer[]; facets?: Facets; }) {

  const { initialized, listOfOffers, fetchOffers,
    updateOffer, getOfferById, setListOfOffers,
    filters, addFilter, removeFilter, blockInterface,
    listOfFacets, setListOfFacets } = useOffersStore();


  useEffect(() => {
    if (offers) setListOfOffers(offers);
    if (facets) setListOfFacets(facets);

    if (!initialized) {
      useOffersStore.setState({ initialized: true });
    }
  }, [])

  const setDetailedInformation = (id: string, detailedInformation: DetailedInformation) => {
    const offer = getOfferById(id);
    //TODO do something if offers is not found
    if (!offer) return;

    offer.data.detailedInformation = detailedInformation;

    updateOffer(offer.index, offer.data);
  }

  return {
    listOfOffers: initialized ? listOfOffers : offers || [],
    listOfFacets: initialized ? listOfFacets : facets || [],
    setDetailedInformation,
    addFilter,
    removeFilter,
    filters,
    blockInterface
  };
}