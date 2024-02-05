import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import mapboxgl from "mapbox-gl";
import { LoadingProvider } from "./context/LoadingContext.tsx";

mapboxgl.accessToken = import.meta.env.VITE_API_KEY;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </React.StrictMode>,
);
