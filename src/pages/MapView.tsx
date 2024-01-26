import { useLayoutEffect, useRef } from "react";
import usePlacesStore from "../zustand/placeStore";
import useMapStore from "@/zustand/mapStore";
import mapboxgl, { Map } from "mapbox-gl";

import { GlobalLoader } from "../components/loaders/GlobalLoader";

export const MapView = () => {
  const { userLocation } = usePlacesStore();
  const { setMap, isMapReady } = useMapStore();
  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!mapboxgl.supported()) {
      alert("Tu navegador no soporta Mapbox GL");
      throw new Error("Tu navegador no soporta Mapbox GL");
    }

    const map = new Map({
      container: mapDiv.current!, // container ID
      style: `mapbox://styles/mapbox/streets-v11`, // style URL
      center: userLocation,
      zoom: 9, // starting zoom
    });
    map.on("style.load", () => {
      map.setFog({}); // Set the default atmosphere style
    });
    setMap(map);
  }, [userLocation, setMap]);

  if (!userLocation && !isMapReady) {
    return (
      <GlobalLoader>
        <p className="font-semibold">Cargando mapa...</p>
      </GlobalLoader>
    );
  }

  return (
    <>
      <div
        ref={mapDiv}
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      />
    </>
  );
};
