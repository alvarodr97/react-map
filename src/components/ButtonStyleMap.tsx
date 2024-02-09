import { useState } from "react";
import { ButtonStyleOptions } from "./ButtonStyleOptions";
import { Map } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PopoverArrow } from "@radix-ui/react-popover";

export type MapStyleString = "streets-v11" | "light-v10" | "satellite-v9";

interface MapOptionsProps {
  mapType: MapStyleString;
  title: string;
}

export const ButtonStyleMap = () => {
  const [activeButton, setActiveButton] = useState<MapStyleString>("streets-v11");

  const mapOptions: MapOptionsProps[] = [
    {
      mapType: "streets-v11",
      title: "Street",
    },
    {
      mapType: "light-v10",
      title: "Light",
    },
    {
      mapType: "satellite-v9",
      title: "Satellite",
    },
  ];

  return (
    <div className="fixed bottom-8 left-4 cursor-pointer ">
      <Popover>
        <PopoverTrigger>
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-black bg-white transition hover:scale-105">
            <Map className="h-8 w-8" />
          </div>
        </PopoverTrigger>
        <PopoverContent
          side="right"
          sideOffset={4}
          className="mb-2 flex w-40 flex-col p-0 text-center"
        >
          {mapOptions.map(({ mapType, title }) => (
            <ButtonStyleOptions
              key={mapType}
              mapType={mapType}
              title={title}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          ))}
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    </div>
  );
};
