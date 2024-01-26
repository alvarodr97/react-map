import { Button } from "./ui/button";

export type MapStyleString =
  | "streets-v11"
  | "light-v10"
  | "dark-v10"
  | "satellite-v9";

interface mapOptionsProps {
  mapType: MapStyleString;
  title: string;
}

export const ButtonStyleMap = () => {
  const mapOptionsObject: mapOptionsProps[] = [
    {
      mapType: "streets-v11",
      title: "Calles",
    },
    {
      mapType: "light-v10",
      title: "Light",
    },
    {
      mapType: "dark-v10",
      title: "Oscuro",
    },
    {
      mapType: "satellite-v9",
      title: "Satélite",
    },
  ];

  // TODO: Responsive y lógica.
  return (
    <div className="fixed bottom-10 left-4 flex flex-col gap-2">
      {mapOptionsObject.map(({ mapType, title }) => (
        <Button key={mapType} variant="destructive" title={title}>
          {title}
        </Button>
      ))}
    </div>
  );
};
