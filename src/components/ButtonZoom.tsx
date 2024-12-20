import { useBoundStore } from "@/store/store";
import { Minus, Plus } from "lucide-react";

export const ButtonZoom = () => {
  const map = useBoundStore((state) => state.map);

  return (
    <div className="fixed right-4 top-8 hidden cursor-pointer flex-col gap-y-1 sm:flex">
      <button
        onClick={() => map?.zoomTo(map.getZoom() + 1)}
        className="rounded-lg border border-b border-black bg-white p-2 hover:bg-slate-200"
      >
        <Plus />
      </button>
      <button
        onClick={() => map?.zoomTo(map.getZoom() - 1)}
        className="rounded-lg border border-t border-black bg-white p-2 hover:bg-slate-200"
      >
        <Minus />
      </button>
    </div>
  );
};
