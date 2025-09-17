import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {GeolocationProvider} from "./context/GeolocationContext.jsx";
import {
  PrecipitationUnitProvider,
  TemperatureUnitProvider,
  WindUnitProvider,
} from "./context/UnitsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TemperatureUnitProvider>
      <WindUnitProvider>
        <PrecipitationUnitProvider>
          <GeolocationProvider>
            <App />
          </GeolocationProvider>
        </PrecipitationUnitProvider>
      </WindUnitProvider>
    </TemperatureUnitProvider>
  </StrictMode>
);
