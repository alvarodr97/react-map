import { useBoundStore } from "@/store/store";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Bike, Car, Footprints } from "lucide-react";
import { RouteNavigationType } from "@/store/routeSlice";

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

  const drawRoute = (routeType: RouteNavigationType) => {
    setRoute(routeType, userLocation, userDestination).catch(() =>
      toast.error("Option not available"),
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent side={side} sideOffset={sideOffset}>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          // onClick={() => setRoute("walking", userLocation, userDestination)}
          onClick={() => drawRoute("walking")}
        >
          Walk
          <DropdownMenuShortcut>
            <Footprints />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          // onClick={() => setRoute("driving", userLocation, userDestination)}
          onClick={() => drawRoute("driving")}
        >
          Drive
          <DropdownMenuShortcut>
            <Car />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          // onClick={() => setRoute("cycling", userLocation, userDestination)}
          onClick={() => drawRoute("cycling")}
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
