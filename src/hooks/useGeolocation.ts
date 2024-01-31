import { useLayoutEffect, useState } from "react";
import { useBoundStore } from "@/store/store";
import { getUserLocation } from "@/helpers/getUserLocation";

export const useGeolocation = () => {
  const setUserLocation = useBoundStore((state) => state.setUserLocation);
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
