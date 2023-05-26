import { create } from "zustand";
import getOffers, { ClientJobOffer } from "./services/getOffers";

interface OffersState {
  initialized: boolean;
  listOfOffers: ClientJobOffer[];
  fetchOffers: () => Promise<void>;
  setListOfOffers: (data: ClientJobOffer[]) => void;
  getOfferById: (id: string) => { data: ClientJobOffer; index: number } | undefined;
  updateOffer: (index: number, data: ClientJobOffer) => void
}

export const useOffersStore = create<OffersState>((set, get) => ({
  initialized: false,
  listOfOffers: [],
  filters: {
    keyword: "react"
  },
  fetchOffers: async () => {
    const data = await getOffers('React');
    set({ listOfOffers: data.offers });
  },
  setListOfOffers: (data) => set({ listOfOffers: data }),
  getOfferById: (id) => {
    const state = get();
    const offerIndex = state.listOfOffers.findIndex((offer) => offer.data.id === id);

    return offerIndex !== -1 ? {
      data: state.listOfOffers[offerIndex],
      index: offerIndex
    } : undefined;
  },
  updateOffer: (index, data) => {
    const state = get();
    state.listOfOffers[index] = data;
    set({ listOfOffers: state.listOfOffers });
  }
}))