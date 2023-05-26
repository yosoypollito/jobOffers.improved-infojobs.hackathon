import { create } from "zustand";
import getOffers, { ClientJobOffer, Facets, Filters } from "./services/getOffers";

interface OffersState {
  initialized: boolean;
  listOfOffers: ClientJobOffer[];
  filters: Filters;
  facets: Facets;
  fetchOffers: (filters: Filters) => Promise<void>;
  setListOfOffers: (data: ClientJobOffer[]) => void;
  getOfferById: (id: string) => { data: ClientJobOffer; index: number } | undefined;
  updateOffer: (index: number, data: ClientJobOffer) => void
}

export const useOffersStore = create<OffersState>((set, get) => ({
  initialized: false,
  listOfOffers: [],
  filters: {
    "q": "react"
  },
  facets: [],
  fetchOffers: async (filters) => {
    const data = await getOffers(filters);
    set({ listOfOffers: data.offers, facets: data.facets });
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