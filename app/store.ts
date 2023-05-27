import { create } from "zustand";
import type { ClientJobOffer, Facets, Filters } from "./services/getOffers";

interface OffersState {
  initialized: boolean;
  blockInterface: boolean;
  listOfOffers: ClientJobOffer[];
  filters: Filters;
  listOfFacets: Facets;
  fetchOffers: (filters: Filters) => Promise<void>;
  setListOfOffers: (data: ClientJobOffer[]) => void;
  setListOfFacets: (data: Facets) => void;
  getOfferById: (id: string) => { data: ClientJobOffer; index: number } | undefined;
  updateOffer: (index: number, data: ClientJobOffer) => void
  addFilter: (key: string, value: string) => void
  removeFilter: (key: string, value: string) => void
}

export const useOffersStore = create<OffersState>((set, get) => ({
  initialized: false,
  blockInterface: false,
  listOfOffers: [],
  filters: {
    "q": "react",
    "facets": "true",
    "category": ["informatica-telecomunicaciones"]
  },
  listOfFacets: [],
  fetchOffers: async (filters) => {
    set({ blockInterface: true })
    try {
      const searchParams = new URLSearchParams(filters).toString();
      console.log({ searchParams })

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/offers?${searchParams}`);
      const data = await res.json();
      set({ listOfOffers: data.offers, listOfFacets: data.facets });
    } catch (e) {
      console.log({ e })
    }
    set({ blockInterface: false })
  },
  setListOfOffers: (data) => set({ listOfOffers: data }),
  setListOfFacets: (data) => set({ listOfFacets: data }),
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
  },
  addFilter: (key, value) => {
    const state = get();
    state.filters[key] ??= [];

    state.filters[key].push(value);
    set({ filters: state.filters });
    state.fetchOffers(state.filters)
  },
  removeFilter: (key, value) => {
    const state = get();
    if (!state.filters[key]) return;


    const valueIndex = state.filters[key].indexOf(value)
    if (valueIndex === -1) {
      return;
    }

    state.filters[key].splice(valueIndex, 1);
    set({ filters: state.filters });
    state.fetchOffers(state.filters);
  }
}))