import { GlobalLoader } from "@/components/loaders/GlobalLoader";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface ContextProps {
  globalLoading: boolean;
  setGlobalLoading: Dispatch<SetStateAction<boolean>>;
}

interface ProviderProps {
  children: React.ReactNode;
}

export const LoadingContext = createContext<ContextProps>({
  globalLoading: false,
  setGlobalLoading: () => {},
});

export function LoadingProvider({ children }: ProviderProps) {
  const [globalLoading, setGlobalLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ globalLoading, setGlobalLoading }}>
      {globalLoading && (
        <GlobalLoader>
          <p className="font-semibold">Finding route</p>
        </GlobalLoader>
      )}
      {children}
    </LoadingContext.Provider>
  );
}
