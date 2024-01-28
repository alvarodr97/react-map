import { create } from "zustand";
import { Map, Marker, Popup } from "mapbox-gl";
import usePlacesStore from "./placeStore";

interface Store {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];

  setMap: (map: Map) => void;
  clearMarkers: () => void;
  setMarkers: () => void;
}

const useMapStore = create<Store>((set, get) => ({
  isMapReady: false,
  map: undefined,
  markers: [],
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
  clearMarkers: () => {
    get().markers.forEach((marker) => marker.remove());
  },
  setMarkers: () => {
    get().clearMarkers();
    const newMarkers: Marker[] = [];
    const places = usePlacesStore.getState().places;

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
}));

export default useMapStore;
