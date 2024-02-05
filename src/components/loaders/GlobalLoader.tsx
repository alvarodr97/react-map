import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface Props {
  children?: React.ReactNode;
}

export const GlobalLoader = ({ children }: Props) => {
  return (
    <div
      className={cn(
        "flex h-screen w-screen items-center justify-center bg-yellow-100/30",
        children && "flex-col gap-y-6",
      )}
    >
      <Loader2 className="h-20 w-20 animate-spin text-black" />
      {children}
    </div>
  );
};
