import { useBoundStore } from "@/store/store";
import { AnySourceData, LngLatBounds, Map } from "mapbox-gl";

export function drawRoute(
  startRoute: [number, number],
  endRoute: [number, number],
  coordinates: number[][],
) {
  const map: Map = useBoundStore.getState().map!;
  const bounds = new LngLatBounds(startRoute, endRoute);

  for (const coord of coordinates) {
    const newCoord: [number, number] = [coord[0], coord[1]];
    bounds.extend(newCoord);
  }

  map.fitBounds(bounds, {
    padding: 200,
  });

  // Polyline
  const sourceData: AnySourceData = {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates,
          },
        },
      ],
    },
  };

  if (map.getLayer("RouteString")) {
    clearRouteF(map);
  }

  map.addSource("RouteString", sourceData);

  map.addLayer({
    id: "RouteString",
    type: "line",
    source: "RouteString",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#0d6efd",
      "line-width": 3,
    },
  });
}

export function clearRouteF(map: Map) {
  map.removeLayer("RouteString");
  map.removeSource("RouteString");
}
