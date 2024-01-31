import { Bike, Car, Footprints } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useBoundStore } from "@/store/store";

interface Props {
  children: React.ReactNode;
  side: "left" | "top" | "right" | "bottom";
  sideOffset?: number;
  userLocation: [number, number];
  userDestination: [number, number];
}

export const DropdownSearch = ({
  children,
  side,
  sideOffset = 4,
  userLocation,
  userDestination,
}: Props) => {
  const setRoute = useBoundStore((state) => state.setRoute);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent side={side} sideOffset={sideOffset}>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setRoute("walking", userLocation, userDestination)}
        >
          Walk
          <DropdownMenuShortcut>
            <Footprints />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setRoute("driving", userLocation, userDestination)}
        >
          Drive
          <DropdownMenuShortcut>
            <Car />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setRoute("cycling", userLocation, userDestination)}
        >
          Cycling
          <DropdownMenuShortcut>
            <Bike />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
