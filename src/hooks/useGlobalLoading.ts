import { LoadingContext } from "@/context/LoadingContext";
import { useContext } from "react";

export function useGlobalLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}
