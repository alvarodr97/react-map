import useMapStore from "@/zustand/mapStore";
import usePlacesStore from "@/zustand/placeStore";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";

export const ButtonUserLocation = () => {
  const { map, isMapReady } = useMapStore();
  const { userLocation } = usePlacesStore();

  const onClick = () => {
    if (!isMapReady) throw new Error("El mapa no está listo.");
    if (!userLocation) throw new Error("No existe ubicación de usuario.");

    map?.flyTo({
      zoom: 14,
      center: userLocation,
    });
  };

  // TODO: Cambiar estilos
  return (
    <Button
      onClick={onClick}
      variant="destructive"
      className="fixed flex flex-row gap-x-2 top-5 right-5 rounded-full"
    >
      <MapPin />
      <span className="hidden md:inline">Mi ubicación</span>
    </Button>
  );
};
