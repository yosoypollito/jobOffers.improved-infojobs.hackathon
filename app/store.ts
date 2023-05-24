import { create } from "zustand";
import getOffers, { MapClientJobOffer } from "./services/getOffers";

interface OffersState {
  listOfOffers: MapClientJobOffer;
  fetchOffers: () => Promise<void>;
  setListOfOffers: (data: MapClientJobOffer) => void;
}

export const useOffers = create<OffersState>((set) => ({
  listOfOffers: new Map(),
  fetchOffers: async () => {
    const data = await getOffers('React');
    set({ listOfOffers: data.offers });
  },
  setListOfOffers: (data) => set({ listOfOffers: data }),
}))