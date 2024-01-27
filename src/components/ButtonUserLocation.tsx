import useMapStore from "@/zustand/mapStore";
import usePlacesStore from "@/zustand/placeStore";
import { MapPin } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={onClick}
            className="fixed bottom-8 right-4 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-black bg-white transition hover:scale-105"
          >
            <MapPin className="h-8 w-8" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" sideOffset={4}>
          <p>Find my location</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
