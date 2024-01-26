import usePlacesStore from "@/zustand/placeStore";

export const SearchResults = () => {
  const { isLoadingPlaces, places } = usePlacesStore();

  if (isLoadingPlaces)
    return <div className="my-1 p-2">Cargando localizaciones...</div>;

  if (!places.length) return <></>;

  return (
    // <div className="h-[300px] overflow-auto">
    <div>
      <ol>
        {places.map((sitio) => (
          <li
            key={sitio.id}
            className="border border-black rounded-lg my-1 p-2 cursor-pointer hover:bg-slate-200"
          >
            {sitio.place_name_es}
          </li>
        ))}
      </ol>
    </div>
  );
};
