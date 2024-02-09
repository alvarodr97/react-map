import { StateCreator } from "zustand";
import { useBoundStore } from "./store";
import { Waypoint } from "@/interfaces/directions";
import { getRoute } from "@/services/fetcher";
import { clearRouteF, drawRoute } from "@/helpers/drawRoute";

export type RouteNavigationType = "driving" | "walking" | "cycling";

export interface RouteSlice {
  isLoadingRoute: boolean;
  isRouteFound: boolean | null;
  currentRoute?: Waypoint | Waypoint[];

  setRoute: (
    navigation: RouteNavigationType,
    startRoute: [number, number],
    endRoute: [number, number],
  ) => Promise<void>;
  clearRoute: () => void;
}

const createRouteSlice: StateCreator<RouteSlice> = (set) => ({
  isLoadingRoute: false,
  isRouteFound: null,
  currentRoute: undefined,

  // If available, sets the route between two points.
  setRoute: async (navigation, startRoute, endRoute) => {
    set({ isLoadingRoute: true });

    try {
      const data = await getRoute(navigation, startRoute, endRoute);

      // Sometimes there is no error, but the route still does not exists.
      if (data.code !== "Ok") {
        // alert("Route not found");
        throw Error;
      }

      const { geometry } = data.routes[0];
      const { coordinates } = geometry;

      // Draw route
      drawRoute(startRoute, endRoute, coordinates);

      set({ isRouteFound: true, currentRoute: data.waypoints });
    } catch {
      set({ isRouteFound: false, currentRoute: [] });
      throw Error;
    } finally {
      set({ isLoadingRoute: false });
    }
  },

  // Clear the route from the map.
  clearRoute: () => {
    if (useBoundStore.getState().map!.getLayer("RouteString")) {
      set({ isRouteFound: null, currentRoute: [] });
      clearRouteF(useBoundStore.getState().map!);
    }
  },
});

export default createRouteSlice;
