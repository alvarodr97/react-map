import { Map, Marker, Popup } from "mapbox-gl";
import { create } from "zustand";

interface Store {
  isMapReady: boolean;
  map?: Map;
  setMap: (map: Map) => void;
  //   markers: Marker[];
}

const useMapStore = create<Store>((set) => ({
  isMapReady: false,
  map: undefined,
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
}));

export default useMapStore;
