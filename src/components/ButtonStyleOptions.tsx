import { useState } from "react";
import { useBoundStore } from "@/store/store";
import { MapStyleString } from "./ButtonStyleMap";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface Props {
  mapType: MapStyleString;
  title: string;
  activeButton: MapStyleString;
  setActiveButton: React.Dispatch<React.SetStateAction<MapStyleString>>;
}

export const ButtonStyleOptions = ({
  mapType,
  title,
  activeButton,
  setActiveButton,
}: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const setStyle = useBoundStore((state) => state.setStyle);
  const isRouteFound = useBoundStore((state) => state.isRouteFound);

  const onClick = () => {
    if (activeButton === mapType) return;

    // If there is a route, ask if they want to remove it.
    if (isRouteFound) {
      setOpenDialog(true);
    } else {
      setActiveButton(mapType);
      setStyle(mapType);
    }
  };

  return (
    <AlertDialog open={openDialog}>
      <AlertDialogTrigger asChild>
        <div
          title={title}
          onClick={onClick}
          className={`cursor-pointer p-2 font-semibold ${activeButton === mapType ? "bg-blue-500 text-white" : "bg-white text-black"}`}
        >
          {title}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will remove the current route
            from the map.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpenDialog(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setActiveButton(mapType);
              setStyle(mapType);
              setOpenDialog(false);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
