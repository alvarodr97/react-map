import { useLayoutEffect, useState } from "react";
import usePlacesStore from "@/zustand/placeStore";
import { getUserLocation } from "@/helpers/getUserLocation";

export const useGeolocation = () => {
  const { setUserLocation } = usePlacesStore();
  const [geoError, setGeoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    getUserLocation()
      .then((lnglat) => {
        setGeoError(false);
        setUserLocation(lnglat);
      })
      .catch(() => {
        setGeoError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setUserLocation]);

  return { geoError, isLoading };
};
