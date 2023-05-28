"use client"
import { ClientJobOffer, DetailedInformation, Facets, PaginationData } from "../services/getOffers";
import { useEffect } from "react";

import { useOffersStore } from "../store";
import getOfferDetailedInformation from "../services/getOfferDetailedInformation";

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

  const getDetailedInformation = async (id: string) => {
    const offer = getOfferById(id);

    if (!offer) return;

    offer.data.loading = true;
    updateOffer(offer.index, offer.data);
    try {

      const detailedInformation = await getOfferDetailedInformation(id)
      console.log({ detailed: detailedInformation })

      if (!detailedInformation) return console.log({ message: "No se encontró la información" })

      offer.data.detailedInformation = detailedInformation;
    } catch (e) {
      //TODO handle posible errors
      console.log(e)
    }
    offer.data.loading = false;
    updateOffer(offer.index, offer.data);
  }

  return {
    listOfOffers: initialized ? listOfOffers : offers || [],
    listOfFacets: initialized ? listOfFacets : facets || [],
    paginationData: initialized ? paginationData : pagination || paginationData,
    getDetailedInformation,
    addFilter,
    removeFilter,
    filters,
    blockInterface,
    getOfferById
  };
}