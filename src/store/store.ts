import { create } from "zustand";
// import { devtools } from "zustand/middleware";
import createMapSlice, { MapSlice } from "./mapSlice";
import createPlaceSlice, { PlaceSlice } from "./placeSlice";
import createRouteSlice, { RouteSlice } from "./routeSlice";

type SharedState = MapSlice & PlaceSlice & RouteSlice;

export const useBoundStore = create<SharedState>()(
  // devtools(
  (...a) => ({
    ...createMapSlice(...a),
    ...createPlaceSlice(...a),
    ...createRouteSlice(...a),
  }),
  // )
);
