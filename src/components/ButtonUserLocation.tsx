import { useBoundStore } from "@/store/store";
import { Locate } from "lucide-react";
import { TooltipWrap } from "./TooltipWrap";

export const ButtonUserLocation = () => {
  const isMapReady = useBoundStore((state) => state.isMapReady);
  const userLocation = useBoundStore((state) => state.userLocation);
  const map = useBoundStore((state) => state.map);

  const onClick = () => {
    if (!isMapReady) throw new Error("El mapa no está listo.");
    if (!userLocation) throw new Error("No existe ubicación de usuario.");

    map?.flyTo({
      zoom: 14,
      center: userLocation,
    });
  };

  return (
    <TooltipWrap side="left" tooltipText="Find my location">
      <div
        onClick={onClick}
        className="fixed bottom-8 right-4 flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg border border-black bg-white transition hover:scale-105"
      >
        <Locate className="h-8 w-8" />
      </div>
    </TooltipWrap>
  );
};
