import { useGeolocation } from "./hooks/useGeolocation";
import { ErrorGeolocation } from "./pages/ErrorGeolocation";
import { GlobalLoader } from "./components/loaders/GlobalLoader";
import { MapView } from "./pages/MapView";
import { ButtonUserLocation } from "./components/ButtonUserLocation";
// import { ButtonStyleMap } from "./components/ButtonStyleMap";
import { SearchContainer } from "./components/search/SearchContainer";

function App() {
  // Se pide al usuario las coordenadas.
  const { geoError, isLoading } = useGeolocation();

  if (isLoading)
    return (
      <GlobalLoader>
        <p className="font-semibold">Localizando coordenadas...</p>
      </GlobalLoader>
    );

  // Si las rechaza se muestra mensaje de error.
  if (geoError) return <ErrorGeolocation />;

  // Se muestra el mapa y la interfaz.
  return (
    <>
      <MapView />
      <>
        <ButtonUserLocation />
        {/* <ButtonStyleMap /> */}
        <SearchContainer />
      </>
    </>
  );
}

export default App;
