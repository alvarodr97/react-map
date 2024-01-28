import { create } from "zustand";
import { searchApi } from "@/api/fetcher";
import { Data, Feature } from "@/interfaces/places";
import useMapStore from "./mapStore";

interface Store {
  isLoading: boolean;
  userLocation: [number, number] | undefined;
  isLoadingPlaces: boolean;
  places: Feature[];

  setUserLocation: (lnglat: [number, number]) => void;
  clearPlaces: () => void;
  searchPlacesByQuery: (query: string) => void;
}

const usePlacesStore = create<Store>((set, get) => ({
  isLoading: false,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
  setUserLocation: (lnglat: [number, number]) => set({ userLocation: lnglat }),
  clearPlaces: () => {
    set({ places: [] });
  },
  searchPlacesByQuery: async (query: string) => {
    if (query.length === 0) {
      set({ places: [] });
      useMapStore.getState().clearMarkers();
      return;
    }

    if (!get().userLocation)
      throw new Error("El usuario no ha proporcionado la ubicación.");

    set({ isLoadingPlaces: true });

    await searchApi
      .get<Data>(`/geocoding/v5/mapbox.places/${query}.json`, {
        params: {
          limit: 5,
          proximity: get().userLocation?.join(","),
        },
      })
      .then(({ data }) => {
        set({ places: data.features, isLoadingPlaces: false });
        useMapStore.getState().setMarkers();
      });
  },
}));

export default usePlacesStore;
