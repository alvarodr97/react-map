import { Toaster } from "sonner";
import { useGeolocation } from "./hooks/useGeolocation";
import { ErrorGeolocation } from "./pages/ErrorGeolocation";
import { GlobalLoader } from "./components/loaders/GlobalLoader";
import { MapView } from "./pages/MapView";
import { ButtonUserLocation } from "./components/ButtonUserLocation";
import { ButtonStyleMap } from "./components/ButtonStyleMap";
import { SearchContainer } from "./components/search/SearchContainer";
import { ButtonZoom } from "./components/ButtonZoom";

function App() {
  // Ask for coordinates.
  const { geoError, isLoading } = useGeolocation();

  if (isLoading)
    return (
      <GlobalLoader>
        <p className="font-semibold">Finding your location...</p>
      </GlobalLoader>
    );

  // If denied, show error message.
  if (geoError) return <ErrorGeolocation />;

  // Show map and interface.
  return (
    <>
      <Toaster position="top-center" richColors closeButton />
      <MapView />
      <>
        <ButtonUserLocation />
        <ButtonStyleMap />
        <SearchContainer />
        <ButtonZoom />
      </>
    </>
  );
}

export default App;
