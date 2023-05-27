"use client"
import { ClientJobOffer, DetailedInformation, Facets, PaginationData } from "../services/getOffers";
import { useEffect } from "react";

import { useOffersStore } from "../store";

export default function useOffers({ offers, facets, pagination }: { offers?: ClientJobOffer[]; facets?: Facets; pagination?: PaginationData; }) {

  const { initialized, listOfOffers, fetchOffers,
    updateOffer, getOfferById,
    filters, addFilter, removeFilter, blockInterface,
    listOfFacets, paginationData } = useOffersStore();


  useEffect(() => {
    if (offers) useOffersStore.setState({ listOfOffers: offers });
    if (facets) useOffersStore.setState({ listOfFacets: facets });
    if (pagination) useOffersStore.setState({ paginationData: pagination });

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
    paginationData: initialized ? paginationData : pagination || paginationData,
    setDetailedInformation,
    addFilter,
    removeFilter,
    filters,
    blockInterface
  };
}