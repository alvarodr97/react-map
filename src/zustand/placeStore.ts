import searchApi from "@/api/fetchPlaces";
import { Feature, Root } from "@/interfaces/places";
import { create } from "zustand";

interface Store {
  isLoading: boolean;
  userLocation: [number, number] | undefined;
  isLoadingPlaces: boolean;
  places: Feature[];

  setUserLocation: (lnglat: [number, number]) => void;
  clearPlaces: () => void;
  searchPlacesByQuery: (query: string) => Promise<Feature[]>;
}

const usePlacesStore = create<Store>((set) => ({
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
      return [];
    }

    if (!usePlacesStore.getState().userLocation)
      throw new Error("El usuario no ha proporcionado la ubicación.");

    set({ isLoadingPlaces: true });

    const resp: Root = await searchApi.get(`${query}.json`, {
      params: {
        proximity: usePlacesStore.getState().userLocation?.join(","),
      },
    });

    console.log(resp.data.features);
    // console.log(resp.data.features)

    set({ places: resp.data.features, isLoadingPlaces: false });

    return resp.data.features;
  },
}));

export default usePlacesStore;
