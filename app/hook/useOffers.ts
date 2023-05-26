"use client"
import { ClientJobOffer, DetailedInformation } from "../services/getOffers";
import { useEffect } from "react";

import { useOffersStore } from "../store";

export default function useOffers({ offers }: { offers?: ClientJobOffer[] }) {

  const { initialized, listOfOffers, fetchOffers, updateOffer, getOfferById, setListOfOffers, filters } = useOffersStore();


  useEffect(() => {
    if (offers) setListOfOffers(offers);

    if (!initialized) {
      useOffersStore.setState({ initialized: true });
    }
  }, [])

  useEffect(() => {
    if (initialized) {
      fetchOffers(filters);
    }
  }, [filters])

  const setDetailedInformation = (id: string, detailedInformation: DetailedInformation) => {
    const offer = getOfferById(id);
    //TODO do something if offers is not found
    if (!offer) return;

    offer.data.detailedInformation = detailedInformation;

    updateOffer(offer.index, offer.data);
  }

  return {
    listOfOffers: initialized ? listOfOffers : offers || [],
    setDetailedInformation
  };
}