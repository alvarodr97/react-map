import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface Props {
  children?: React.ReactNode;
}

export const GlobalLoader = ({ children }: Props) => {
  return (
    <div
      className={cn(
        "w-screen h-screen flex items-center justify-center bg-slate-300",
        children && "flex-col gap-y-6"
      )}
    >
      <Loader2 className="w-20 h-20 text-blue-600 animate-spin" />
      {children}
    </div>
  );
};
