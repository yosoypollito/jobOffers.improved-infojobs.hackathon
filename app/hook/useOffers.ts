"use client"
import { ClientJobOffer, DetailedInformation } from "../services/getOffers";
import { useEffect, useMemo, useRef } from "react";

import { useOffersStore } from "../store";
import { list } from "postcss";

export default function useOffers({ offers }: { offers?: ClientJobOffer[] }) {

  const { initialized, listOfOffers, fetchOffers, updateOffer, getOfferById, setListOfOffers } = useOffersStore();

  useEffect(() => {
    if (offers) setListOfOffers(offers);

    useOffersStore.setState({ initialized: true });
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
    setDetailedInformation
  };
}