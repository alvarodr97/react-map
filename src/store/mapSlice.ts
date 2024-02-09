import { StateCreator } from "zustand";
import { Map, Marker, Popup } from "mapbox-gl";
import { useBoundStore } from "./store";
import { MapStyleString } from "@/components/ButtonStyleMap";

export interface MapSlice {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];

  setMap: (map: Map) => void;
  setStyle: (mapStyle: MapStyleString) => void;
  setMarkers: () => void;
  clearMarkers: () => void;
}

const createMapSlice: StateCreator<MapSlice> = (set, get) => ({
  isMapReady: false,
  map: undefined,
  markers: [],

  // Map is created.
  setMap: (map: Map) => {
    const myLocationPopUp = new Popup().setHTML(`
      <h4>Tu ubicación aproximada</h4>
    `);

    new Marker({
      color: "#ff3333",
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopUp)
      .addTo(map);

    set({
      map: map,
      isMapReady: true,
    });
  },

  // Change the style from the map. map.setStyle removes the current route.
  setStyle: (mapStyle: MapStyleString) => {
    useBoundStore.setState({ isRouteFound: null, currentRoute: [] });
    get().map?.setStyle(`mapbox://styles/mapbox/${mapStyle}`);
  },

  // Place the markers in the map.
  setMarkers: () => {
    get().clearMarkers();
    const newMarkers: Marker[] = [];
    const places = useBoundStore.getState().places;

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup({}).setHTML(`
        <strong>${place.text_es}</strong>
        <hr />
        <p>${place.place_name_es}</p>
      `);

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(get().map!);

      newMarkers.push(newMarker);
    }

    set({ isMapReady: true, markers: newMarkers });
  },

  // Clear markers from map.
  clearMarkers: () => {
    get().markers.forEach((marker) => marker.remove());
  },
});

export default createMapSlice;
