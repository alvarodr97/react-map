import { useBoundStore } from "@/store/store";
import { searchApi } from "./api";
import { PlacesData } from "@/interfaces/places";
import { RouteNavigationType } from "@/store/routeSlice";
import { DataRoute } from "@/interfaces/directions";

export async function getPlaces(query: string): Promise<PlacesData> {
  try {
    const { data } = await searchApi.get<PlacesData>(
      `/geocoding/v5/mapbox.places/${query}.json`,
      {
        params: {
          limit: 5,
          proximity: useBoundStore.getState().userLocation?.join(","),
        },
      },
    );
    return data;
  } catch {
    throw new Error("Place not found");
  }
}

export async function getRoute(
  navigation: RouteNavigationType,
  startRoute: [number, number],
  endRoute: [number, number],
): Promise<DataRoute> {
  try {
    const { data } = await searchApi.get<DataRoute>(
      `/directions/v5/mapbox/${navigation}/${startRoute.join(",")};${endRoute.join(",")}`,
      {
        params: {
          alternatives: false,
          geometries: "geojson",
          overview: "simplified",
          steps: false,
        },
      },
    );
    return data;
  } catch (error) {
    throw new Error("Route not found");
  }
}
