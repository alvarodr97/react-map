import { useBoundStore } from "@/store/store";
import { TooltipWrap } from "../TooltipWrap";
import { DropdownSearch } from "./DropdownSearch";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  isInputFocused: boolean;
}

export const SearchResults = ({ isInputFocused }: Props) => {
  const isMapReady = useBoundStore((state) => state.isMapReady);
  const userLocation = useBoundStore((state) => state.userLocation);
  const map = useBoundStore((state) => state.map);
  const isFeatureEmpty = useBoundStore((state) => state.isFeatureEmpty);
  const places = useBoundStore((state) => state.places);

  const onClick = (desiredLocation: number[]) => {
    if (!isMapReady) throw new Error("El mapa no está listo.");
    if (!userLocation) throw new Error("No existe ubicación de usuario.");

    const [lng, lat] = desiredLocation;

    map?.flyTo({
      zoom: 14,
      center: [lng, lat],
    });
  };

  if (isFeatureEmpty) return <div className="px-2 py-1">Place not found</div>;

  if (!places.length) return <></>;

  return (
    <div className={cn("w-full space-y-1", !isInputFocused && "hidden")}>
      {places?.map((place) => (
        <div
          key={place.id}
          className="flex flex-row rounded-lg border border-black "
        >
          <TooltipWrap side="bottom" tooltipText={place.place_name_es}>
            <p
              onClick={() => onClick(place.center)}
              className="w-full cursor-pointer truncate  rounded-l-lg p-2 hover:bg-slate-200"
            >
              {place.place_name_es}
            </p>
          </TooltipWrap>
          <DropdownSearch
            side="right"
            sideOffset={12}
            userLocation={userLocation!}
            userDestination={place.center as [number, number]}
          >
            <div className="cursor-pointer rounded-lg rounded-l-none p-2 hover:bg-slate-200">
              <ChevronRight />
            </div>
          </DropdownSearch>
        </div>
      ))}
    </div>
  );
};
