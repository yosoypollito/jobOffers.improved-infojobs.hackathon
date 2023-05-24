import { create } from "zustand";
import { type MapClientJobOffer } from "../services/getOffers";
import getOffers from "../services/getOffers";
import { useEffect, useMemo, useRef } from "react";


interface OffersState {
  initialized: boolean;
  listOfOffers: MapClientJobOffer;
  fetchOffers: () => Promise<void>;
  setListOfOffers: (data: MapClientJobOffer) => void;
}

const store = create<OffersState>((set) => ({
  initialized: false,
  listOfOffers: new Map(),
  fetchOffers: async () => {
    const data = await getOffers('React');
    set({ listOfOffers: data.offers });
  },
  setListOfOffers: (data) => set({ listOfOffers: data }),
}))

export default function useOffers({ offers }: { offers?: MapClientJobOffer }) {

  const { initialized, listOfOffers, fetchOffers, setListOfOffers } = store();

  useEffect(() => {
    if (offers) setListOfOffers(offers);

    store.setState({ initialized: true });
  }, [])

  const toRenderOffers = useMemo(() => {
    const map = initialized ? listOfOffers : offers || new Map();
    return Object.entries(map).map(([key, value]) => value[1])
  }, [initialized, listOfOffers]);

  return {
    listOfOffers: toRenderOffers
  };
}