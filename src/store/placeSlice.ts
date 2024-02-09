import { StateCreator } from "zustand";
import { useBoundStore } from "./store";
import { getPlaces } from "@/services/fetcher";
import { Feature } from "@/interfaces/places";

export interface PlaceSlice {
  userLocation: [number, number] | undefined;

  isLoadingPlaces: boolean;
  places: Feature[];
  placeError?: boolean;
  isFeatureEmpty: boolean | null;

  setUserLocation: (lnglat: [number, number]) => void;
  clearPlaces: () => void;
  searchPlacesByQuery: (query: string) => void;
}

const createPlaceSlice: StateCreator<PlaceSlice> = (set, get) => ({
  userLocation: undefined,

  isLoadingPlaces: false,
  places: [],
  placeError: false,
  isFeatureEmpty: null,

  // Sets user location.
  setUserLocation: (lnglat: [number, number]) => set({ userLocation: lnglat }),

  // Clear places from map.
  clearPlaces: () => {
    set({ places: [], placeError: false, isFeatureEmpty: null });
  },

  // Search place by query, checks the response from the API.
  searchPlacesByQuery: async (query: string) => {
    useBoundStore.getState().clearRoute();
    
    if (query.length === 0) {
      // TODO: Check routes refactor
      useBoundStore.getState().clearMarkers();
      get().clearPlaces();
      return;
    }

    if (!get().userLocation)
      throw new Error("El usuario no ha proporcionado la ubicación.");

    set({ isLoadingPlaces: true });

    try {
      const { features } = await getPlaces(query);

      // Checks if the API returns an empty "features" array or not.
      if (!features.length) {
        set({ places: [], isFeatureEmpty: true, placeError: false });
      } else {
        set({ places: features, isFeatureEmpty: false, placeError: false });
      }

      useBoundStore.getState().setMarkers();
    } catch {
      set({ places: [], isFeatureEmpty: null, placeError: true });
    } finally {
      set({ isLoadingPlaces: false });
    }
  },
});

export default createPlaceSlice;
